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
exports.deleteHistory = exports.updateHistory = exports.createHistory = exports.getHistoryById = exports.getHistory = void 0;
const History_1 = __importDefault(require("../models/History"));
// @desc    Get all history articles
// @route   GET /api/history
// @access  Public
const getHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield History_1.default.find().sort({ year: 1 }); // Sort chronologically if year is parsable, else creation
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getHistory = getHistory;
// @desc    Get single history article
// @route   GET /api/history/:id
// @access  Public
const getHistoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield History_1.default.findById(req.params.id);
        if (history) {
            res.json(history);
        }
        else {
            res.status(404).json({ message: 'History article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getHistoryById = getHistoryById;
// @desc    Create a history article
// @route   POST /api/history
// @access  Private/Admin
const createHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, era, year, images } = req.body;
        const history = new History_1.default({
            title,
            content,
            era,
            year,
            images,
        });
        const createdHistory = yield history.save();
        res.status(201).json(createdHistory);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.createHistory = createHistory;
// @desc    Update a history article
// @route   PUT /api/history/:id
// @access  Private/Admin
const updateHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield History_1.default.findById(req.params.id);
        if (history) {
            history.title = req.body.title || history.title;
            history.content = req.body.content || history.content;
            history.era = req.body.era || history.era;
            history.year = req.body.year || history.year;
            history.images = req.body.images || history.images;
            const updatedHistory = yield history.save();
            res.json(updatedHistory);
        }
        else {
            res.status(404).json({ message: 'History article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.updateHistory = updateHistory;
// @desc    Delete a history article
// @route   DELETE /api/history/:id
// @access  Private/Admin
const deleteHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield History_1.default.findById(req.params.id);
        if (history) {
            yield history.deleteOne();
            res.json({ message: 'History article removed' });
        }
        else {
            res.status(404).json({ message: 'History article not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.deleteHistory = deleteHistory;
