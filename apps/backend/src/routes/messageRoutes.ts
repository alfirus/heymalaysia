import express from 'express';
import { getConversation, sendMessage } from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:userId', protect, getConversation);
router.post('/', protect, sendMessage);

export default router;
