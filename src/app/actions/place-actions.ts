'use server';

import connectToDatabase from '@/lib/db';
import Place, { IPlace } from '@/models/Place';

export async function getNearbyPlaces(lat: number, lng: number, radiusKm: number = 50) {
  try {
    await connectToDatabase();

    // Find places near the provided coordinates
    // MongoDB expects [lng, lat] for coordinates
    const places = await Place.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
          $maxDistance: radiusKm * 1000, // Convert km to meters
        },
      },
    }).limit(20).lean();

    // Fallback: If no places found with 2dsphere index (e.g. data not migrated yet),
    // try finding by basic lat/lng range (less accurate but works for legacy data)
    if (places.length === 0) {
        console.log("No places found with 2dsphere index, trying legacy lookup...");
        // Rough approximation: 1 degree latitude ~ 111km
        const degreeDiff = radiusKm / 111;
        
        const legacyPlaces = await Place.find({
            'geometry.location.lat': { $gte: lat - degreeDiff, $lte: lat + degreeDiff },
            'geometry.location.lng': { $gte: lng - degreeDiff, $lte: lng + degreeDiff }
        }).limit(20).lean();
        
        return JSON.parse(JSON.stringify(legacyPlaces));
    }

    return JSON.parse(JSON.stringify(places));
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
}
