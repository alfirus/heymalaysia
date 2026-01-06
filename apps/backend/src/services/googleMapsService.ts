import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const searchPlacesGoogle = async (query: string) => {
  if (!GOOGLE_MAPS_API_KEY) {
      console.warn('GOOGLE_MAPS_API_KEY is not set.');
      return [];
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query
    )}&key=${GOOGLE_MAPS_API_KEY}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK') {
        return response.data.results;
    } else {
        console.error('Google Maps API Error:', response.data.status);
        return [];
    }
  } catch (error) {
    console.error('Failed to search places:', error);
    return [];
  }
};

export const getPlaceDetailsGoogle = async (placeId: string) => {
    if (!GOOGLE_MAPS_API_KEY) return null;

    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,photo,type,rating,user_ratings_total,opening_hours&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await axios.get(url);

        if (response.data.status === 'OK') {
            return response.data.result;
        }
        return null;
    } catch (error) {
        console.error('Failed to get place details:', error);
        return null;
    }
};
