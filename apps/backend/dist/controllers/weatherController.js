"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherForDate = exports.getWeatherForecast = exports.getWeather = void 0;
const weatherService_1 = require("../services/weatherService");
// @desc    Get current weather
// @route   GET /api/weather/current
// @access  Public
const getWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            res.status(400).json({ message: 'Latitude (lat) and Longitude (lon) are required' });
            return;
        }
        const data = yield (0, weatherService_1.getCurrentWeather)(lat, lon);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getWeather = getWeather;
// @desc    Get 3-day forecast (simplified)
// @route   GET /api/weather/forecast
// @access  Public
const getWeatherForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            res.status(400).json({ message: 'Latitude (lat) and Longitude (lon) are required' });
            return;
        }
        const data = yield (0, weatherService_1.getForecast)(lat, lon);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getWeatherForecast = getWeatherForecast;
// @desc    Get forecast for specific date
// @route   GET /api/weather/date
// @access  Public
const getWeatherForDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lat, lon, date } = req.query;
        if (!lat || !lon || !date) {
            res.status(400).json({ message: 'Latitude (lat), Longitude (lon) and Date (date) are required' });
            return;
        }
        const data = yield (0, weatherService_1.getForecastForDate)(lat, lon, date);
        if (!data) {
            res.status(404).json({ message: 'No forecast available for this date' });
            return;
        }
        res.json(data);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message || 'Server Error' });
    }
});
exports.getWeatherForDate = getWeatherForDate;
