import express from 'express';
import { getUsers, updateUserRole, deleteUser } from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id/role')
  .put(protect, admin, updateUserRole);

router.route('/:id')
  .delete(protect, admin, deleteUser);

export default router;
