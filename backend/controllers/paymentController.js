import Razorpay from 'razorpay';
import crypto from 'crypto';
import Appointment from '../models/appointmentModel.js';

// Instantiate Razorpay (Mock logic if env vars missing to prevent crashing)
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'mock_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret',
});

// @desc    Create a Razorpay Order
// @route   POST /api/payments/create-order
// @access  Private (Patient)
const createOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const userId = req.user._id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    if (appointment.userId.toString() !== userId.toString()) {
      return res.status(401).json({ success: false, message: 'Not authorized to pay for this appointment' });
    }

    if (appointment.paymentStatus === 'Completed') {
      return res.status(400).json({ success: false, message: 'Payment already completed' });
    }

    const options = {
      amount: appointment.amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${appointment._id}`,
    };

    const order = await razorpayInstance.orders.create(options);

    if (!order) {
      return res.status(500).json({ success: false, message: 'Failed to create Razorpay order' });
    }

    // Save order id to appointment
    appointment.razorpayOrderId = order.id;
    await appointment.save();

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify Razorpay Payment Signature
// @route   POST /api/payments/verify-payment
// @access  Private (Patient)
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = req.body;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Create expected signature
    const secret = process.env.RAZORPAY_KEY_SECRET || 'mock_key_secret';
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body.toString())
      .digest("hex");

    // We skip actual signature validation if we are in mock mode without keys
    const isMock = !process.env.RAZORPAY_KEY_SECRET;
    const isAuthentic = expectedSignature === razorpay_signature || isMock;

    if (isAuthentic) {
      // Update appointment
      appointment.paymentStatus = 'Completed';
      appointment.razorpayPaymentId = razorpay_payment_id;
      appointment.receiptUrl = `https://mediqueue-receipts.mock/download/${razorpay_payment_id}`;
      await appointment.save();

      // Emit Socket.io Events
      const io = req.app.get('io');
      if (io) {
        // Notify Patient
        io.to(`user_${appointment.userId}`).emit('payment-success', {
          message: 'Payment completed successfully!',
          appointmentId: appointment._id
        });
        
        // Notify Doctor
        io.to(`doctor_${appointment.docId}`).emit('notification-created', {
          title: 'Payment Received',
          message: `Patient has completed payment for appointment on ${appointment.slotDate}.`,
          type: 'success'
        });
      }

      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      appointment.paymentStatus = 'Failed';
      await appointment.save();
      res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createOrder, verifyPayment };
