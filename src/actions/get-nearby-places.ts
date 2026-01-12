'use server';

import connectDB from '@/lib/db';
import Place from '@/models/Place';

interface Coordinates {
  lat: number;
  lng: number;
}

export async function getNearbyPlaces(lat: number, lng: number, radiusKm: number = 50) {
  try {
    if (!lat || !lng) {
        return { success: false, error: "Invalid coordinates" };
    }

    await connectDB();

    // 1 degree of latitude is approx 111km. 
    // 1 degree of longitude varies, at equator is 111km.
    // We use a rough bounding box of ~0.5 degree for ~50km to filter efficiently in DB first.
    // 50km / 111km/deg ≈ 0.45 deg. We'll use 0.6 deg to be safe.
    const degBuffer = 0.6;
    
    const minLat = lat - degBuffer;
    const maxLat = lat + degBuffer;
    const minLng = lng - degBuffer;
    const maxLng = lng + degBuffer;

    const potentialPlaces = await Place.find({
      'geometry.location.lat': { $gte: minLat, $lte: maxLat },
      'geometry.location.lng': { $gte: minLng, $lte: maxLng },
    }).lean();

    // Filter strictly by radius using Haversine formula
    const nearbyPlaces = potentialPlaces.filter((place: any) => {
      const dist = getDistanceFromLatLonInKm(
        lat,
        lng,
        place.geometry.location.lat,
        place.geometry.location.lng
      );
      // Append distance for UI (optional, but good for "1.2km away")
      place.distance = dist; 
      return dist <= radiusKm;
    });

    // Sort by distance
    nearbyPlaces.sort((a: any, b: any) => a.distance - b.distance);

    // Limit to top 20
    const limitedPlaces = nearbyPlaces.slice(0, 20);

    // Serialize
    const serializedPlaces = limitedPlaces.map((place: any) => ({
      ...place,
      _id: place._id.toString(),
      created_at: place.created_at?.toISOString(),
      updated_at: place.updated_at?.toISOString(),
    }));

    return { success: true, data: serializedPlaces };

  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return { success: false, error: 'Failed to fetch nearby places' };
  }
}

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
