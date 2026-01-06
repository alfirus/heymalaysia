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
exports.updateAdStatus = exports.createAd = exports.getAllAds = exports.getActiveAds = void 0;
const Ad_1 = __importDefault(require("../models/Ad"));
// @desc    Get active ads
// @route   GET /api/ads
// @access  Public
const getActiveAds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ads = yield Ad_1.default.find({ status: 'active' });
        res.json(ads);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getActiveAds = getActiveAds;
// @desc    Get all ads (Admin)
// @route   GET /api/ads/admin
// @access  Private/Admin
const getAllAds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ads = yield Ad_1.default.find({});
        res.json(ads);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAllAds = getAllAds;
// @desc    Create an ad (Submission)
// @route   POST /api/ads
// @access  Private
const createAd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, imageUrl, targetUrl, paymentReference, duration } = req.body;
        const ad = new Ad_1.default({
            title,
            imageUrl,
            targetUrl,
            paymentReference,
            duration,
            submittedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            status: 'pending',
        });
        const createdAd = yield ad.save();
        res.status(201).json(createdAd);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createAd = createAd;
// @desc    Approve/Reject an ad
// @route   PUT /api/ads/:id/status
// @access  Private/Admin
const updateAdStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body; // 'active' | 'rejected'
        const ad = yield Ad_1.default.findById(req.params.id);
        if (ad) {
            ad.status = status;
            const updatedAd = yield ad.save();
            res.json(updatedAd);
        }
        else {
            res.status(404).json({ message: 'Ad not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateAdStatus = updateAdStatus;
