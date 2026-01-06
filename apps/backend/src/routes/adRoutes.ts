import express from 'express';
import {
  getActiveAds,
  getAllAds,
  createAd,
  updateAdStatus,
} from '../controllers/adController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getActiveAds).post(protect, createAd);
router.route('/admin').get(protect, admin, getAllAds);
router.route('/:id/status').put(protect, admin, updateAdStatus);

export default router;
