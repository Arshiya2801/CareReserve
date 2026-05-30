import express from 'express';
import { getDoctors, addDoctor, getDoctorById, getDoctorAppointments, updateAppointmentStatus } from '../controllers/doctorController.js';
import authUser from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getDoctors).post(addDoctor);
router.route('/appointments').get(authUser, getDoctorAppointments);
router.route('/appointment-status').put(authUser, updateAppointmentStatus);
router.route('/:id').get(getDoctorById);

export default router;
