import express from 'express';
import {
  getEvents,
  getAdminEvents,
  createEvent,
  approveEvent,
} from '../controllers/eventController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getEvents).post(protect, createEvent);
router.route('/admin').get(protect, admin, getAdminEvents);
router.route('/:id/approve').put(protect, admin, approveEvent);

export default router;
