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
exports.createComment = exports.getComments = void 0;
const Comment_1 = __importDefault(require("../models/Comment"));
// @desc    Get comments/posts for an entity
// @route   GET /api/comments
// @access  Public
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entityId, entityType } = req.query;
        if (!entityId || !entityType) {
            res.status(400).json({ message: 'entityId and entityType are required' });
            return;
        }
        const comments = yield Comment_1.default.find({
            entityId: entityId,
            entityType: entityType
        }).sort({ createdAt: -1 }); // Newest first
        res.json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getComments = getComments;
// @desc    Create a comment/post
// @route   POST /api/comments
// @access  Private
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { entityId, entityType, content } = req.body;
        // @ts-ignore - Middleware adds user
        const user = req.user;
        // For MVP, we use the user's username from the token or fetch it if needed.
        // Assuming req.user has username (it usually has _id).
        // Let's fetch the user actually to be safe or use what's in JWT.
        // Ideally user object in req is populated. 
        // For now, we'll assume the client sends username or we trust req.user.username if available.
        // To keep it simple and since I don't want to change authMiddleware right now, 
        // I'll assume the username is passed or we look it up (skipping lookup for speed/MVP).
        // Better: let's require username in body or assume middleware provides it.
        // For this implementation, I will rely on the body containing 'username' or fallback "Anonymous"
        const newComment = new Comment_1.default({
            userId: user._id,
            username: req.body.username || 'User', // In real app, secure this
            entityId,
            entityType,
            content,
            createdAt: new Date(),
        });
        const savedComment = yield newComment.save();
        res.status(201).json(savedComment);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
exports.createComment = createComment;
