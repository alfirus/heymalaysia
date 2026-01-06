import express from 'express';
import { getComments, createComment } from '../controllers/commentController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getComments)
  .post(protect, createComment);

export default router;
