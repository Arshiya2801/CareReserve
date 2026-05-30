import express from 'express';
import { getDoctors, addDoctor, getDoctorById } from '../controllers/doctorController.js';

const router = express.Router();

router.route('/').get(getDoctors).post(addDoctor);
router.route('/:id').get(getDoctorById);

export default router;
