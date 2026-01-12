'use server';

import connectDB from '@/lib/db';
import Place, { IPlace } from '@/models/Place';

export async function searchPlaces(
  query: string
): Promise<{ success: boolean; data?: any[]; error?: string }> {
  try {
    if (!query || query.trim().length === 0) {
      return { success: true, data: [] };
    }

    await connectDB();

    const searchRegex = new RegExp(query, 'i');

    const places = await Place.find({
      $or: [
        { name: searchRegex },
        { formatted_address: searchRegex },
        { 'harvested_from.keyword': searchRegex },
        { types: searchRegex },
      ],
    })
      .limit(50)
      .lean();

    const serializedPlaces = places.map((place: any) => ({
      ...place,
      _id: place._id.toString(),
      created_at: place.created_at?.toISOString(),
      updated_at: place.updated_at?.toISOString(),
    }));

    return { success: true, data: serializedPlaces };
  } catch (error) {
    console.error('Error searching places:', error);
    return { success: false, error: 'Failed to search places' };
  }
}
