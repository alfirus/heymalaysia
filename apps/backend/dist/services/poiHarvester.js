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
exports.runPoiHarvest = void 0;
const Place_1 = __importDefault(require("../models/Place"));
const googleMapsService_1 = require("./googleMapsService");
const SEARCH_QUERIES = [
    'Tourist attractions in Selangor',
    'Historical places in Penang',
    'Beaches in Sabah',
    'Hiking trails in Kuala Lumpur',
    'Museums in Malacca',
    'Parks in Johor',
    'Caves in Sarawak',
    'Temples in Perak'
];
const runPoiHarvest = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('--- Starting POI Harvest ---');
    try {
        // 1. Pick a random query
        const randomQuery = SEARCH_QUERIES[Math.floor(Math.random() * SEARCH_QUERIES.length)];
        console.log(`Querying: "${randomQuery}"`);
        // 2. Search Google Maps
        const results = yield (0, googleMapsService_1.searchPlacesGoogle)(randomQuery);
        if (!results || results.length === 0) {
            console.log('No results found.');
            return;
        }
        // 3. Process results
        let addedCount = 0;
        for (const result of results) {
            if (addedCount >= 2)
                break; // Limit to 2 per run
            // Check duplicate by Google Place ID
            const exists = yield Place_1.default.findOne({ googlePlaceId: result.place_id });
            if (exists) {
                console.log(`Skipping duplicate: ${result.name}`);
                continue;
            }
            // Fetch details for better data (photos, hours)
            const details = yield (0, googleMapsService_1.getPlaceDetailsGoogle)(result.place_id);
            if (!details)
                continue;
            // Map to our Schema
            const newPlace = new Place_1.default({
                name: details.name,
                googlePlaceId: result.place_id,
                description: `Discovered via Google Maps: ${details.formatted_address}`, // Fallback description
                formattedAddress: details.formatted_address,
                location: {
                    type: 'Point',
                    coordinates: [details.geometry.location.lng, details.geometry.location.lat]
                },
                types: details.types,
                category: mapTypesToCategory(details.types),
                state: extractStateFromAddress(details.formatted_address) || 'Malaysia',
                rating: details.rating,
                userRatingsTotal: details.user_ratings_total,
                openingHours: details.opening_hours,
                photos: details.photos, // Stores Google Photo metadata
                images: [], // We don't have direct image URLs yet without further API calls
                content: `
# ${details.name}

Located at ${details.formatted_address}.

Rating: ${details.rating} (${details.user_ratings_total} reviews).
                `,
                status: 'approved', // Auto-approve for MVP
                featured: false
            });
            yield newPlace.save();
            console.log(`Added new place: ${newPlace.name}`);
            addedCount++;
        }
        console.log(`Harvest complete. Added ${addedCount} places.`);
    }
    catch (error) {
        console.error('Harvest failed:', error);
    }
});
exports.runPoiHarvest = runPoiHarvest;
// Helper to map Google types to our generic categories
const mapTypesToCategory = (types = []) => {
    if (types.includes('park') || types.includes('natural_feature'))
        return 'Nature';
    if (types.includes('museum') || types.includes('church') || types.includes('hindu_temple') || types.includes('mosque'))
        return 'Heritage';
    return 'Urban';
};
// Simple heuristic to guess state from address
const extractStateFromAddress = (address) => {
    const states = ['Selangor', 'Penang', 'Johor', 'Sabah', 'Sarawak', 'Perak', 'Kedah', 'Pahang', 'Terengganu', 'Kelantan', 'Perlis', 'Melaka', 'Negeri Sembilan', 'Kuala Lumpur', 'Putrajaya', 'Labuan'];
    for (const state of states) {
        if (address.includes(state))
            return state;
    }
    return null;
};
