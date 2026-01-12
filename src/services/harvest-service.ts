import HarvestLog, { IHarvestLog } from '@/models/HarvestLog';
import Place from '@/models/Place';
import { MALAYSIA_POI_GROUPS } from '@/lib/poi-constants';
import { LOCATION_DATA, COUNTRY_KEYS, getStates } from '@/lib/location-data';
import connectDB from '@/lib/db';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!GOOGLE_MAPS_API_KEY) {
  throw new Error("GOOGLE_MAPS_API_KEY is missing!");
}

interface HarvestResult {
  message: string;
  dataCount: number;
  nextCursor: Partial<IHarvestLog>;
}

export async function executeHarvestStep(): Promise<HarvestResult> {
  await connectDB();

  // 1. Get or Init Cursor
  let log = await HarvestLog.findById('main_harvester');
  if (!log) {
    log = await HarvestLog.create({
      countryKey: COUNTRY_KEYS[0],
      stateKey: getStates(COUNTRY_KEYS[0])[0]?.state,
      districtIndex: 0,
      categoryKey: Object.keys(MALAYSIA_POI_GROUPS)[0],
      subType: 'keywords', // Start with keywords as they are more specific
      itemIndex: 0,
    });
  }

  // Handle case where countryKey might be missing in existing logs (migration)
  if (!log.countryKey) {
      log.countryKey = COUNTRY_KEYS[0];
      // Try to re-sync state if possible, or just reset if needed. 
      // For now, assuming standard flow, we might need to ensure stateKey is valid for this country.
      // If stateKey exists but country doesn't, assuming it was "Malaysia" (legacy).
      if (!log.stateKey) {
          log.stateKey = getStates(log.countryKey)[0]?.state;
      }
  }

  // 2. Resolve Current Context
  const country = log.countryKey;
  const states = getStates(country);
  
  // Find current state index
  let stateIndex = states.findIndex(s => s.state === log.stateKey);
  if (stateIndex === -1) {
      stateIndex = 0;
      log.stateKey = states[0]?.state;
      log.districtIndex = 0;
  }

  const currentStateObj = states[stateIndex];
  const stateName = currentStateObj.state;
  const districts = currentStateObj.districts;
  
  // Validate district index
  if (log.districtIndex >= districts.length) {
      log.districtIndex = 0;
  }
  const district = districts[log.districtIndex];
  
  const categoryGroup = MALAYSIA_POI_GROUPS[log.categoryKey];
  const items = log.subType === 'keywords' 
    ? getKeywords(categoryGroup.keywords)
    : categoryGroup.types || [];
  
  const currentItem = items[log.itemIndex]; // The specific keyword or type

  // 3. Prepare Query
  // Keyword Search: "{Item} in {District}, {State}, {Country}"
  const query = `${currentItem} in ${district}, ${stateName}, ${country}`;
  
  console.log(`[Harvest] Querying: ${query} (Page Token: ${log.nextPageToken ? 'YES' : 'NO'})`);

  // 4. Call Google API
  const url = new URL('https://places.googleapis.com/v1/places:searchText');
  
  const requestBody: any = {
    textQuery: query,
    pageSize: 20, // Max for new Places API
  };

  if (log.nextPageToken) {
    requestBody.pageToken = log.nextPageToken;
  }
  
  // Field Mask (cost control)
  // nextPageToken is a top-level response field, not a Place field, so it shouldn't be in the mask.
  const fieldMask = 'places.id,places.displayName,places.formattedAddress,places.location,places.types,places.rating,places.userRatingCount,places.priceLevel';

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY!,
      'X-Goog-FieldMask': fieldMask,
    },
    body: JSON.stringify(requestBody),
  });

  const data = await response.json();
  
  if (!response.ok) {
     throw new Error(`Google API Error: ${JSON.stringify(data)}`);
  }

  // 5. Save Results
  const places = data.places || [];
  let addedCount = 0;

  for (const p of places) {
    const doc = {
      place_id: p.id,
      name: p.displayName?.text,
      formatted_address: p.formattedAddress,
      geometry: {
        location: {
            lat: p.location?.latitude,
            lng: p.location?.longitude,
        }
      },
      types: p.types,
      rating: p.rating,
      user_ratings_total: p.userRatingCount,
      price_level: p.priceLevel,
      harvested_from: {
        country,
        state: stateName,
        district,
        keyword: currentItem,
        category: log.categoryKey
      }
    };

    try {
        await Place.updateOne(
            { place_id: p.id },
            { $set: doc },
            { upsert: true }
        );
        addedCount++;
    } catch (e) {
        console.error("Failed to save place:", p.id, e);
    }
  }

  // 6. Advance Cursor logic
  const responseNextPageToken = data.nextPageToken;

  if (responseNextPageToken) {
    // STAY on this item, just save token
    log.nextPageToken = responseNextPageToken;
    log.lastRun = new Date();
    await log.save();
    return {
      message: `Fetched Page for '${query}'. Got ${addedCount} places. Continuing to next page.`,
      dataCount: addedCount,
      nextCursor: log.toObject()
    };
  } else {
    // NO next page. Move to next ITEM.
    log.nextPageToken = null;
    
    // Logic to advance indices:
    // Item -> SubType -> Category -> District -> State -> Country
    
    let newItemIndex = log.itemIndex + 1;
    let newSubType = log.subType;
    let newCategoryIndex = Object.keys(MALAYSIA_POI_GROUPS).indexOf(log.categoryKey);
    let newDistrictIndex = log.districtIndex;
    let newStateIndex = stateIndex;
    let newCountryIndex = COUNTRY_KEYS.indexOf(country);

    // 1. Check Items
    if (newItemIndex >= items.length) {
       newItemIndex = 0;
       
       // 2. Check SubType (keywords -> types)
       if (newSubType === 'keywords' && categoryGroup.types && categoryGroup.types.length > 0) {
           newSubType = 'types'; // Switch to types for this category
       } else {
           // We finished keywords (and types if enabled, or if we were already on types)
           // Move to Default SubType for next category
           newSubType = 'keywords'; // Reset to keywords for new category
           newCategoryIndex++;
       }
    }
    
    // 3. Check Category
    const categoryKeys = Object.keys(MALAYSIA_POI_GROUPS);
    if (newCategoryIndex >= categoryKeys.length) {
        newCategoryIndex = 0;
        newDistrictIndex++;
    }

    // 4. Check District
    if (newDistrictIndex >= districts.length) {
        newDistrictIndex = 0;
        newStateIndex++;
    }

    // 5. Check State
    if (newStateIndex >= states.length) {
        newStateIndex = 0;
        newCountryIndex++;
    }

    // 6. Check Country
    if (newCountryIndex >= COUNTRY_KEYS.length) {
        newCountryIndex = 0; // Loop back to first country
    }

    // Apply updates
    // Map indices back to keys
    const nextCountry = COUNTRY_KEYS[newCountryIndex];
    const nextStates = getStates(nextCountry);
    // If we switched country, we must reset state/district indices logic if we didn't handle it above.
    // Actually, above logic just increments indices. We need to fetch the *correct* state for the new index.
    // If we wrapped state index, we might be in a new country.
    // If we wrapped country index, we are back at start.
    
    // Simplest way: if we changed country, reset state index to 0.
    // But newStateIndex was incremented based on current country's states. 
    // If newStateIndex caused a wrap (it became >= current states.length), we incremented country.
    // So if we incremented country, we should set newStateIndex to 0.
    
    if (newCountryIndex !== COUNTRY_KEYS.indexOf(country)) {
         newStateIndex = 0;
    }
    
    // Now get the state object
    const nextStateObj = nextStates[newStateIndex];
    
    // Same for district. If we changed state, reset district to 0.
    if (newStateIndex !== stateIndex || newCountryIndex !== COUNTRY_KEYS.indexOf(country)) {
        newDistrictIndex = 0;
    }
    
    // Update Log
    log.itemIndex = newItemIndex;
    log.subType = newSubType;
    log.categoryKey = categoryKeys[newCategoryIndex];
    log.districtIndex = newDistrictIndex;
    log.stateKey = nextStateObj.state;
    log.countryKey = nextCountry;
    log.lastRun = new Date();

    await log.save();

    return {
      message: `Finished '${query}'. Got ${addedCount} places. Moving to [${log.countryKey}][${log.stateKey}][${nextStateObj.districts[newDistrictIndex]}][${log.categoryKey}][${log.subType}][Index ${log.itemIndex}]`,
      dataCount: addedCount,
      nextCursor: log.toObject()
    };
  }
}

// Helper to flatten keywords if they are nested (like nature_outdoor)
function getKeywords(k: string[] | Record<string, string[]> | undefined): string[] {
    if (!k) return [];
    if (Array.isArray(k)) return k;
    return Object.values(k).flat();
}
