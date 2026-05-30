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

// @desc    Complete an appointment (Doctor/Admin action)
// @route   PUT /api/appointments/complete/:id
// @access  Private (should be restricted to doc, but keeping it simple for now)
const completeAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.isCompleted = true;
    await appointment.save();

    // Broadcast queue update to all patients in this doctor's specific date room
    const io = req.app.get('io');
    const room = `${appointment.docId}_${appointment.slotDate}`;
    
    // Fetch remaining pending appointments for this doctor on this date, sorted by time/creation
    // This is simple queue logic: count how many are pending to update positions
    const pendingAppointments = await Appointment.find({
      docId: appointment.docId,
      slotDate: appointment.slotDate,
      isCompleted: false,
      cancelled: false
    }).sort({ slotTime: 1, _id: 1 }); // Sort by time, then arrival

    // Broadcast the new queue state to the room
    io.to(room).emit('queue_update', {
      message: 'Queue advanced',
      pendingCount: pendingAppointments.length,
      nextUp: pendingAppointments.length > 0 ? pendingAppointments[0]._id : null
    });

    res.json({ message: 'Appointment completed and queue updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/cancel/:id
// @access  Private
const cancelAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Verify user owns the appointment
    if (appointment.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    appointment.cancelled = true;
    await appointment.save();

    // Remove the booked slot from the doctor
    const docData = await Doctor.findById(appointment.docId);
    if (docData && docData.slots_booked && docData.slots_booked[appointment.slotDate]) {
      docData.slots_booked[appointment.slotDate] = docData.slots_booked[appointment.slotDate].filter(
        time => time !== appointment.slotTime
      );
      await Doctor.findByIdAndUpdate(appointment.docId, { slots_booked: docData.slots_booked });
    }

    res.json({ success: true, message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { bookAppointment, myAppointments, completeAppointment, cancelAppointment };
