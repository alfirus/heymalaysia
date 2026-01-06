import express from 'express';
import {
  getHistory,
  getHistoryById,
  createHistory,
  updateHistory,
  deleteHistory,
} from '../controllers/historyController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getHistory).post(protect, admin, createHistory);
router
  .route('/:id')
  .get(getHistoryById)
  .put(protect, admin, updateHistory)
  .delete(protect, admin, deleteHistory);

export default router;
