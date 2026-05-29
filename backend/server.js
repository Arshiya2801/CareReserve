import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoute.js';
import doctorRoutes from './routes/doctorRoute.js';
import appointmentRoutes from './routes/appointmentRoute.js';

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
  
  socket.on('join_queue', ({ docId, date }) => {
    const room = `${docId}_${date}`;
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files (images)
app.use('/images', express.static('public/images'));

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
