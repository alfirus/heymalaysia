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
exports.sendMessage = exports.getConversation = void 0;
const Message_1 = __importDefault(require("../models/Message"));
// @desc    Get conversation between current user and another user
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // @ts-ignore
        const currentUserId = req.user.id; // User attached by auth middleware
        const messages = yield Message_1.default.find({
            $or: [
                { senderId: currentUserId, receiverId: userId },
                { senderId: userId, receiverId: currentUserId },
            ],
        }).sort({ timestamp: 1 }); // Oldest first
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.getConversation = getConversation;
// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { receiverId, content } = req.body;
        // @ts-ignore
        const senderId = req.user.id;
        if (!receiverId || !content) {
            res.status(400).json({ message: 'Receiver ID and content are required' });
            return;
        }
        const newMessage = new Message_1.default({
            senderId,
            receiverId,
            content,
            read: false,
        });
        const savedMessage = yield newMessage.save();
        res.status(201).json(savedMessage);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});
exports.sendMessage = sendMessage;
