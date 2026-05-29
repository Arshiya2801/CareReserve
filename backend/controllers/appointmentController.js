import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';
import User from '../models/userModel.js';

// @desc    Book an appointment
// @route   POST /api/appointments/book
// @access  Private
const bookAppointment = async (req, res) => {
  const { docId, slotDate, slotTime } = req.body;
  const userId = req.user._id;

  try {
    const docData = await Doctor.findById(docId);
    if (!docData) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    if (!docData.available) {
      return res.status(400).json({ message: 'Doctor is not available' });
    }

    let slots_booked = docData.slots_booked;

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.status(400).json({ message: 'Slot already booked' });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await User.findById(userId).select('-password');

    // Remove slots_booked from docData to save space in appointment doc
    delete docData.slots_booked;

    const appointment = new Appointment({
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    });

    await appointment.save();

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({ message: 'Appointment booked successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const myAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { bookAppointment, myAppointments };
