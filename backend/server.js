import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import doctorRoutes from './routes/doctorRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';
import paymentRoutes from './routes/paymentRoute.js';
import notificationRoutes from './routes/notificationRoute.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Make io accessible in our routers
app.set('io', io);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);
  
  socket.on('join_queue', (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined queue room: ${room}`);
  });

  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`Socket ${socket.id} joined user room: user_${userId}`);
  });

  socket.on('join_doctor_room', (docId) => {
    socket.join(`doctor_${docId}`);
    console.log(`Socket ${socket.id} joined doctor room: doctor_${docId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Basic middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Restrict in production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: false }));

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all API requests
app.use('/api/', apiLimiter);

// Serve static files (images)
app.use('/images', express.static('public/images'));

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
