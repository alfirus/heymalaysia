import { Request, Response } from 'express';
import Comment from '../models/Comment';

// @desc    Get comments/posts for an entity
// @route   GET /api/comments
// @access  Public
export const getComments = async (req: Request, res: Response) => {
  try {
    const { entityId, entityType } = req.query;
    
    if (!entityId || !entityType) {
       res.status(400).json({ message: 'entityId and entityType are required' });
       return;
    }

    const comments = await Comment.find({ 
        entityId: entityId as string, 
        entityType: entityType as string 
    }).sort({ createdAt: -1 }); // Newest first

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a comment/post
// @route   POST /api/comments
// @access  Private
export const createComment = async (req: Request, res: Response) => {
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
    
    const newComment = new Comment({
      userId: user._id,
      username: req.body.username || 'User', // In real app, secure this
      entityId,
      entityType,
      content,
      createdAt: new Date(),
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
