import express from 'express';
import {
  getPlaces,
  getPlaceById,
  createPlace,
  updatePlace,
  deletePlace,
} from '../controllers/placeController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getPlaces).post(protect, admin, createPlace);
router
  .route('/:id')
  .get(getPlaceById)
  .put(protect, admin, updatePlace)
  .delete(protect, admin, deletePlace);

export default router;
