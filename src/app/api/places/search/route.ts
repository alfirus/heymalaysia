import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Place from '@/models/Place';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');

    if (!q) {
      return NextResponse.json({ places: [] });
    }

    await connectDB();

    const places = await Place.find({
      name: { $regex: q, $options: 'i' }
    })
    .select('place_id name formatted_address types')
    .limit(5);

    return NextResponse.json({ places });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
