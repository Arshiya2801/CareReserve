import express from 'express';
import { bookAppointment, myAppointments, completeAppointment } from '../controllers/appointmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', protect, bookAppointment);
router.get('/my-appointments', protect, myAppointments);
router.put('/complete/:id', protect, completeAppointment);

export default router;
