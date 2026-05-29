import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    address: {
      line1: { type: String, default: "" },
      line2: { type: String, default: "" }
    },
    available: {
      type: Boolean,
      default: true
    },
    slots_booked: {
      type: Object,
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
