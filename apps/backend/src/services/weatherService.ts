import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock data for fallback (Development without API Key)
const MOCK_WEATHER = {
  weather: [{ main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
  main: { temp: 300.15, feels_like: 304.15, humidity: 80 },
  name: 'Kuala Lumpur',
};

const MOCK_FORECAST = {
  list: [
    { dt: 1700000000, main: { temp: 300.15 }, weather: [{ main: 'Rain', icon: '10d' }] },
    { dt: 1700086400, main: { temp: 301.15 }, weather: [{ main: 'Clear', icon: '01d' }] },
    { dt: 1700172800, main: { temp: 299.15 }, weather: [{ main: 'Clouds', icon: '03d' }] },
  ],
  city: { name: 'Kuala Lumpur' },
};

export const getCurrentWeather = async (lat: string, lon: string) => {
  if (!API_KEY) {
    console.warn('OPENWEATHER_API_KEY not found. Returning mock data.');
    return MOCK_WEATHER;
  }

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather:', error);
    return MOCK_WEATHER; // Fallback on error too
  }
};

export const getForecast = async (lat: string, lon: string) => {
  if (!API_KEY) {
    console.warn('OPENWEATHER_API_KEY not found. Returning mock data.');
    return MOCK_FORECAST;
  }

  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return MOCK_FORECAST;
  }
};

export const getForecastForDate = async (lat: string, lon: string, date: string) => {
  const forecast = await getForecast(lat, lon);
  
  if (!forecast || !forecast.list) {
    return null;
  }

  const targetTime = new Date(date).getTime();
  
  // Setup closest search
  let closest = null;
  let minDiff = Infinity;

  forecast.list.forEach((item: any) => {
    const itemTime = item.dt * 1000; // API usually returns unix timestamp
    const diff = Math.abs(targetTime - itemTime);
    
    // Only consider if within 12 hours? Or just closest? 
    // Let's take closest for now, but maybe limit to "same day" if strict.
    // For now, simple closest match.
    if (diff < minDiff) {
      minDiff = diff;
      closest = item;
    }
  });

  // If closest is more than 24 hours away, maybe return null or a warning?
  // 24 hours * 60 * 60 * 1000 = 86400000
  if (minDiff > 86400000) {
    // Too far apart, maybe the date is outside the 5 day forecast range
    return null;
  }

  return closest;
};
