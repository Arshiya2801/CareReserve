import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Doctor from './models/doctorModel.js';

dotenv.config();

const doctorsData = [
    {
        name: 'Dr. Richard James',
        image: '/src/assets/doc1.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James emphasizes personalized patient care, combining clinical expertise with a compassionate approach.',
        fees: 950,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Emily Larson',
        image: '/src/assets/doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Larson prioritizes delivering high-quality care, using a patient-centered approach that emphasizes early diagnosis.',
        fees: 900,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Sarah Patel',
        image: '/src/assets/doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Patel is dedicated to improving patient outcomes through early detection, preventative strategies, and evidence-based medicine.',
        fees: 900,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Christopher Lee',
        image: '/src/assets/doc4.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Lee brings a patient-first philosophy to his practice, focusing on preventive health and proactive care.',
        fees: 1090,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Jennifer Garcia',
        image: '/src/assets/doc5.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Garcia blends compassionate care with modern medical practices, ensuring early intervention.',
        fees: 1100,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Andrew Williams',
        image: '/src/assets/doc6.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Williams takes a proactive role in patient care, prioritizing early identification of conditions.',
        fees: 1000,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Christopher Davis',
        image: '/src/assets/doc7.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine.',
        fees: 900,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Timothy White',
        image: '/src/assets/doc8.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. White believes in an integrative approach to healthcare, combining clinical insight with early diagnosis.',
        fees: 1900,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Ava Mitchell',
        image: '/src/assets/doc9.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Mitchell focuses on creating strong doctor-patient relationships, encouraging early screenings.',
        fees: 2200,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Jeffrey King',
        image: '/src/assets/doc10.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. King adopts a prevention-first mindset, emphasizing wellness education, regular checkups.',
        fees: 3500,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Zoe Kelly',
        image: '/src/assets/doc11.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kelly is passionate about proactive care that starts with prevention and builds toward lasting health.',
        fees: 1290,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Patrick Harris',
        image: '/src/assets/doc12.png',
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Harris blends technology and personal care to offer detailed diagnostics and preventative plans.',
        fees: 3020,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
    try {
        await connectDB();
        await Doctor.deleteMany();
        await Doctor.insertMany(doctorsData);
        console.log('Successfully seeded 12 doctors!');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
seedData();
