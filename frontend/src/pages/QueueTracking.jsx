import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { AppContext } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Calendar } from 'lucide-react';

const QueueTracking = () => {
  const { appointmentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { backendUrl, socket } = useContext(AppContext);

  // Initial State setup
  const [currentPatient, setCurrentPatient] = useState(12);
  const [yourNumber] = useState(17);
  const [patientsAhead, setPatientsAhead] = useState(4); // 16, 15, 14, 13
  const [estimatedWait, setEstimatedWait] = useState(45); // minutes
  const [status, setStatus] = useState('Waiting');
  
  // Progress bar calculation
  const totalInQueue = 5; // You + 4 ahead
  const progressPercent = Math.max(0, 100 - (patientsAhead / totalInQueue) * 100);

  const { doctor, selectedDate, selectedTime } = location.state || {};

  useEffect(() => {
    if (!socket || !doctor || !selectedDate) return;

    // Join a specific room for this doctor/date
    const room = `queue_${doctor._id}_${selectedDate}`;
    socket.emit('join_queue', room);

    // Listen for real-time updates
    const handleQueueUpdate = (data) => {
      if (data.pendingCount !== undefined) {
        // Calculate the difference or position
        // In a real app, 'yourNumber' and the 'pendingCount' math would be exact based on queue ID
        // For this real-time implementation, we'll sync patientsAhead directly to pendingCount 
        // to show live movement when the doctor clicks 'Complete'
        setPatientsAhead(data.pendingCount);
        
        // Update estimated wait dynamically
        setEstimatedWait(data.pendingCount * 10);
        
        // Move current patient forward
        setCurrentPatient(prev => prev + 1);

        if (data.pendingCount === 1) {
          setStatus('Your Turn Soon');
        } else if (data.pendingCount === 0) {
          setStatus('Please Proceed to Consultation Room');
        } else {
          setStatus('Waiting');
        }
      }
    };

    socket.on('queue_update', handleQueueUpdate);

    return () => {
      socket.off('queue_update', handleQueueUpdate);
    };
  }, [socket, doctor, selectedDate]);

  // Fallback for missing state
  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p>Tracking information unavailable.</p>
        <Button onClick={() => navigate('/my-appointments')}>Back to Appointments</Button>
      </div>
    );
  }

  // Dynamic status colors
  const statusConfig = {
    'Waiting': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: '⏳' },
    'Doctor Running Late': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', icon: '⚠️' },
    'Your Turn Soon': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: '🔔' },
    'Please Proceed to Consultation Room': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: '✅' },
  };

  const currentConfig = statusConfig[status] || statusConfig['Waiting'];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-slate-900 py-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Live Queue</h1>
          <span className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-200">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Live Updates Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Display - Token & Status */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Live Status Card */}
            <Card className={`border-none shadow-sm transition-colors duration-500 ${currentConfig.bg}`}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-wider opacity-80 mb-1" style={{ color: 'inherit' }}>Current Status</p>
                  <h2 className={`text-2xl font-black ${currentConfig.text}`}>{status}</h2>
                </div>
                <div className="text-5xl">{currentConfig.icon}</div>
              </CardContent>
            </Card>

            {/* Token Display */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark text-center">
                <CardContent className="p-8">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Current Patient</p>
                  <p className="text-5xl font-black text-gray-900 dark:text-white mt-4 transition-all duration-500">#{currentPatient}</p>
                </CardContent>
              </Card>
              
              <Card className="border border-primary shadow-lg bg-primary/5 dark:bg-primary/10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
                <CardContent className="p-8">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Your Token</p>
                  <p className="text-5xl font-black text-primary mt-4">#{yourNumber}</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Bar */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark">
              <CardContent className="p-6">
                <div className="flex justify-between items-end mb-2">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">Queue Progress</p>
                  <p className="text-sm font-bold text-gray-500">{patientsAhead} ahead of you</p>
                </div>
                <div className="w-full h-4 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out rounded-full" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>

          </div>

          {/* Sidebar - Doctor Info & Wait Time */}
          <div className="space-y-6">
            
            {/* Wait Time Countdown */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-slate-900 dark:bg-slate-800 text-white text-center">
              <CardContent className="p-8">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Estimated Wait</p>
                <div className="text-5xl font-black mt-2 tabular-nums transition-all duration-500">
                  {estimatedWait} <span className="text-xl text-gray-400 font-bold">min</span>
                </div>
              </CardContent>
            </Card>

            {/* Doctor Info */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-surface-dark">
              <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50">
                <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Appointment Details
                </h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <img src={doctor.image} alt={doctor.name} className="w-16 h-16 rounded-full object-cover bg-gray-100 border border-gray-200 dark:border-slate-700" />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white leading-tight">{doctor.name}</p>
                    <p className="text-sm text-primary font-medium">{doctor.speciality}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                  <p className="text-sm text-gray-500">Scheduled Time</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">{selectedTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Appointment ID</p>
                  <p className="font-mono font-bold text-gray-900 dark:text-white mt-1">{appointmentId}</p>
                </div>
              </CardContent>
            </Card>

            <Button fullWidth variant="outline" onClick={() => navigate('/my-appointments')}>Back to Dashboard</Button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default QueueTracking;
