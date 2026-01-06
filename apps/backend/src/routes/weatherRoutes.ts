import express from 'express';
import { getWeather, getWeatherForecast, getWeatherForDate } from '../controllers/weatherController';

const router = express.Router();

router.get('/current', getWeather);
router.get('/forecast', getWeatherForecast);
router.get('/date', getWeatherForDate);

export default router;
