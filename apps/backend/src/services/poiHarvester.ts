import Place from '../models/Place';
import { searchPlacesGoogle, getPlaceDetailsGoogle } from './googleMapsService';

const SEARCH_QUERIES = [
    'Tourist attractions in Selangor',
    'Historical places in Penang',
    'Beaches in Sabah',
    'Hiking trails in Kuala Lumpur',
    'Museums in Malacca',
    'Parks in Johor',
    'Caves in Sarawak',
    'Temples in Perak'
];

export const runPoiHarvest = async () => {
    console.log('--- Starting POI Harvest ---');
    
    try {
        // 1. Pick a random query
        const randomQuery = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
        console.log(`Querying: "${randomQuery}"`);

        // 2. Search Google Maps
        const results = await searchPlacesGoogle(randomQuery);
        if (!results || results.length === 0) {
            console.log('No results found.');
            return;
        }

        // 3. Process results
        let addedCount = 0;
        
        for (const result of results) {
            if (addedCount >= 2) break; // Limit to 2 per run

            // Check duplicate by Google Place ID
            const exists = await Place.findOne({ googlePlaceId: result.place_id });
            if (exists) {
                console.log(`Skipping duplicate: ${result.name}`);
                continue;
            }

            // Fetch details for better data (photos, hours)
            const details = await getPlaceDetailsGoogle(result.place_id);
            if (!details) continue;

            // Map to our Schema
            const newPlace = new Place({
                name: details.name,
                googlePlaceId: result.place_id,
                description: `Discovered via Google Maps: ${details.formatted_address}`, // Fallback description
                formattedAddress: details.formatted_address,
                location: {
                    type: 'Point',
                    coordinates: [details.geometry.location.lng, details.geometry.location.lat]
                },
                types: details.types,
                category: mapTypesToCategory(details.types),
                state: extractStateFromAddress(details.formatted_address) || 'Malaysia',
                rating: details.rating,
                userRatingsTotal: details.user_ratings_total,
                openingHours: details.opening_hours,
                photos: details.photos, // Stores Google Photo metadata
                images: [], // We don't have direct image URLs yet without further API calls
                content: `
# ${details.name}

Located at ${details.formatted_address}.

Rating: ${details.rating} (${details.user_ratings_total} reviews).
                `,
                status: 'approved', // Auto-approve for MVP
                featured: false
            });

            await newPlace.save();
            console.log(`Added new place: ${newPlace.name}`);
            addedCount++;
        }

        console.log(`Harvest complete. Added ${addedCount} places.`);

    } catch (error) {
        console.error('Harvest failed:', error);
    }
};

// Helper to map Google types to our generic categories
const mapTypesToCategory = (types: string[] = []): string => {
    if (types.includes('park') || types.includes('natural_feature')) return 'Nature';
    if (types.includes('museum') || types.includes('church') || types.includes('hindu_temple') || types.includes('mosque')) return 'Heritage';
    return 'Urban';
};

// Simple heuristic to guess state from address
const extractStateFromAddress = (address: string): string | null => {
    const states = ['Selangor', 'Penang', 'Johor', 'Sabah', 'Sarawak', 'Perak', 'Kedah', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis', 'Melaka', 'Negeri Sembilan', 'Kuala Lumpur', 'Putrajaya', 'Labuan'];
    for (const state of states) {
        if (address.includes(state)) return state;
    }
    return null;
};
