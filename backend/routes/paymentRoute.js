import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentController.js';
import { protect as authUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create-order', authUser, createOrder);
router.post('/verify-payment', authUser, verifyPayment);

export default router;
