import Doctor from '../models/doctorModel.js';

// @desc    Fetch all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a doctor
// @route   POST /api/doctors
// @access  Public (mocking admin access for now)
const addDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const createdDoctor = await doctor.save();
    res.status(201).json(createdDoctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getDoctors, addDoctor };
