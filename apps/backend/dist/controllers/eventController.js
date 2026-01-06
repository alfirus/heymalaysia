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
exports.approveEvent = exports.createEvent = exports.getAdminEvents = exports.getEvents = void 0;
const Event_1 = __importDefault(require("../models/Event"));
// @desc    Get all events (Public: approved only, Admin: all)
// @route   GET /api/events
// @access  Public/Private
const getEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};
        // If admin, show all. If user, show approved only.
        // Note: This logic can be refined based on exact requirements.
        // For now, we return approved events for public query.
        // Admin specific query can constitute a separate route or query param.
        // Assuming simple public view first:
        const events = yield Event_1.default.find(Object.assign(Object.assign({}, keyword), { approved: true }));
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getEvents = getEvents;
// @desc    Get all events (Admin view)
// @route   GET /api/events/admin
// @access  Private/Admin
const getAdminEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.default.find({});
        res.json(events);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getAdminEvents = getAdminEvents;
// @desc    Create an event (Submission)
// @route   POST /api/events
// @access  Private
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, description, date, location, paymentReference } = req.body;
        const event = new Event_1.default({
            title,
            description,
            date,
            location,
            paymentReference,
            submittedBy: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
            approved: false, // Default to pending
        });
        const createdEvent = yield event.save();
        res.status(201).json(createdEvent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.createEvent = createEvent;
// @desc    Approve an event
// @route   PUT /api/events/:id/approve
// @access  Private/Admin
const approveEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield Event_1.default.findById(req.params.id);
        if (event) {
            event.approved = true;
            const updatedEvent = yield event.save();
            res.json(updatedEvent);
        }
        else {
            res.status(404).json({ message: 'Event not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.approveEvent = approveEvent;
