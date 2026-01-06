import { Request, Response } from 'express';
import Message from '../models/Message';

// @desc    Get conversation between current user and another user
// @route   GET /api/messages/:userId
// @access  Private
export const getConversation = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // @ts-ignore
    const currentUserId = req.user.id; // User attached by auth middleware

    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId },
      ],
    }).sort({ timestamp: 1 }); // Oldest first

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId, content } = req.body;
     // @ts-ignore
    const senderId = req.user.id;

    if (!receiverId || !content) {
      res.status(400).json({ message: 'Receiver ID and content are required' });
      return;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      read: false,
    });

    const savedMessage = await newMessage.save();

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
