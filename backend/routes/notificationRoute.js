import express from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController.js';
import { protect as authUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(authUser, getNotifications);
router.route('/:id/read').put(authUser, markAsRead);

export default router;
