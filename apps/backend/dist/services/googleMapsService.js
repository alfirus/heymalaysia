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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaceDetailsGoogle = exports.searchPlacesGoogle = void 0;
const axios_1 = __importDefault(require("axios"));
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const searchPlacesGoogle = (query) => __awaiter(void 0, void 0, void 0, function* () {
    if (!GOOGLE_MAPS_API_KEY) {
        console.warn('GOOGLE_MAPS_API_KEY is not set.');
        return [];
    }
    try {
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = yield axios_1.default.get(url);
        if (response.data.status === 'OK') {
            return response.data.results;
        }
        else {
            console.error('Google Maps API Error:', response.data.status);
            return [];
        }
    }
    catch (error) {
        console.error('Failed to search places:', error);
        return [];
    }
});
exports.searchPlacesGoogle = searchPlacesGoogle;
const getPlaceDetailsGoogle = (placeId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!GOOGLE_MAPS_API_KEY)
        return null;
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_address,geometry,photo,type,rating,user_ratings_total,opening_hours&key=${GOOGLE_MAPS_API_KEY}`;
        const response = yield axios_1.default.get(url);
        if (response.data.status === 'OK') {
            return response.data.result;
        }
        return null;
    }
    catch (error) {
        console.error('Failed to get place details:', error);
        return null;
    }
});
exports.getPlaceDetailsGoogle = getPlaceDetailsGoogle;
