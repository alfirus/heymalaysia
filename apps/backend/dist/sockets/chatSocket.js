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
exports.configureChatSockets = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const configureChatSockets = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        socket.on('join', (userId) => {
            socket.join(userId);
            console.log(`User ${userId} joined room ${userId}`);
        });
        socket.on('send_message', (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { senderId, receiverId, content } = data;
                // Save to DB
                const newMessage = new Message_1.default({
                    senderId,
                    receiverId,
                    content,
                    timestamp: new Date(),
                });
                yield newMessage.save();
                // Emit to receiver's room
                io.to(receiverId).emit('receive_message', newMessage);
                // Also emit back to sender (optional, can be optimistic UI)
                io.to(senderId).emit('message_sent', newMessage);
            }
            catch (error) {
                console.error('Error sending message:', error);
            }
        }));
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};
exports.configureChatSockets = configureChatSockets;
