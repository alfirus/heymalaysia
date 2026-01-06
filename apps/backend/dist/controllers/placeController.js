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
exports.deletePlace = exports.updatePlace = exports.createPlace = exports.getPlaceById = exports.getPlaces = void 0;
const Place_1 = __importDefault(require("../models/Place"));
// @desc    Get all places with optional filters
// @route   GET /api/places
// @access  Public
const getPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, state, featured } = req.query;
        // Build query object
        const query = { status: 'approved' }; // Only show approved places by default
        if (category) {
            query.category = category;
        }
        if (state) {
            query.state = state;
        }
        if (featured === 'true') {
            query.featured = true;
        }
        const places = yield Place_1.default.find(query);
        res.json(places);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPlaces = getPlaces;
// @desc    Get single place
// @route   GET /api/places/:id
// @access  Public
const getPlaceById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place = yield Place_1.default.findById(req.params.id);
        if (place) {
            res.json(place);
        }
        else {
            res.status(404).json({ message: 'Place not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getPlaceById = getPlaceById;
// @desc    Create a place
// @route   POST /api/places
// @access  Private/Admin
const createPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place = new Place_1.default(req.body);
        const createdPlace = yield place.save();
        res.status(201).json(createdPlace);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createPlace = createPlace;
// @desc    Update a place
// @route   PUT /api/places/:id
// @access  Private/Admin
const updatePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place = yield Place_1.default.findById(req.params.id);
        if (place) {
            Object.assign(place, req.body);
            const updatedPlace = yield place.save();
            res.json(updatedPlace);
        }
        else {
            res.status(404).json({ message: 'Place not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updatePlace = updatePlace;
// @desc    Delete a place
// @route   DELETE /api/places/:id
// @access  Private/Admin
const deletePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const place = yield Place_1.default.findById(req.params.id);
        if (place) {
            yield place.deleteOne();
            res.json({ message: 'Place removed' });
        }
        else {
            res.status(404).json({ message: 'Place not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deletePlace = deletePlace;
