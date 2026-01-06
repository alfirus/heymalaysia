import { Request, Response } from 'express';

import { getCurrentWeather, getForecast, getForecastForDate } from '../services/weatherService';

// @desc    Get current weather
// @route   GET /api/weather/current
// @access  Public
export const getWeather = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      res.status(400).json({ message: 'Latitude (lat) and Longitude (lon) are required' });
      return;
    }

    const data = await getCurrentWeather(lat as string, lon as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get 3-day forecast (simplified)
// @route   GET /api/weather/forecast
// @access  Public
export const getWeatherForecast = async (req: Request, res: Response) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      res.status(400).json({ message: 'Latitude (lat) and Longitude (lon) are required' });
      return;
    }

    const data = await getForecast(lat as string, lon as string);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Get forecast for specific date
// @route   GET /api/weather/date
// @access  Public
export const getWeatherForDate = async (req: Request, res: Response) => {
  try {
    const { lat, lon, date } = req.query;

    if (!lat || !lon || !date) {
      res.status(400).json({ message: 'Latitude (lat), Longitude (lon) and Date (date) are required' });
      return;
    }

    const data = await getForecastForDate(lat as string, lon as string, date as string);
    
    if (!data) {
       res.status(404).json({ message: 'No forecast available for this date' });
       return;
    }
    
    res.json(data);
  } catch (error) {
     const err = error as Error;
     res.status(500).json({ message: err.message || 'Server Error' });
  }
};
