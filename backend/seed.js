import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Doctor from './models/doctorModel.js';

dotenv.config();

const doctorsData = [
  {
    name: 'Dr. Richard James',
    image: 'doc1.png',
    speciality: 'General physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: 'Dr. James emphasizes personalized patient care, combining clinical expertise with a compassionate approach.',
    fees: 950,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Emily Larson',
    image: 'doc2.png',
    speciality: 'Gynecologist',
    degree: 'MBBS',
    experience: '3 Years',
    about: 'Dr. Larson prioritizes delivering high-quality care, using a patient-centered approach.',
    fees: 900,
    address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    name: 'Dr. Sarah Patel',
    image: 'doc3.png',
    speciality: 'Dermatologist',
    degree: 'MBBS',
    experience: '1 Years',
    about: 'Dr. Patel is dedicated to improving patient outcomes through early detection and preventative strategies.',
    fees: 900,
    address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  }
];

const seedDoctors = async () => {
  try {
    await connectDB();
    
    // Clear existing doctors to avoid duplicates during testing
    await Doctor.deleteMany();
    
    await Doctor.insertMany(doctorsData);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedDoctors();
