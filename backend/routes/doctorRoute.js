import express from 'express';
import { getDoctors, addDoctor } from '../controllers/doctorController.js';

const router = express.Router();

router.route('/').get(getDoctors).post(addDoctor);

export default router;
