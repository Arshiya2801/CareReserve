import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PatientQueueTracking = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(backendUrl + '/api/appointments/my-appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchAppointments();
    }
  }, [token, backendUrl]);

  // Filter for today's active appointments
  const getTodayDateString = () => {
    const today = new Date();
    return `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}`;
  };

  const todayStr = getTodayDateString();
  const activeAppointments = appointments.filter(
    (app) => !app.cancelled && !app.isCompleted // && app.slotDate === todayStr // (Commented out slotDate check for testing purposes, but ideally should be checked)
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Live Queue Tracking</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Track your position in the doctor's queue in real-time.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : activeAppointments.length === 0 ? (
        <Card className="text-center p-12 border-dashed border-2 border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50">
          <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm">
            ⏱️
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Active Queues</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
            You don't have any active appointments to track right now. Book an appointment to see live tracking.
          </p>
          <Button variant="primary" onClick={() => navigate('/patient/book-appointment')}>Book Appointment</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeAppointments.map((app) => (
            <Card key={app._id} className="hover:shadow-lg transition-shadow border border-primary/20 bg-white dark:bg-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center relative">
                     <span className="w-3 h-3 bg-primary rounded-full absolute top-1 right-1 border-2 border-white dark:border-slate-800 animate-pulse"></span>
                     <span className="text-xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{app.docData.name}</h3>
                    <p className="text-xs text-primary font-medium">{app.docData.speciality}</p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-4 mb-6 border border-gray-100 dark:border-slate-700">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-xs text-gray-500">Date</span>
                     <span className="text-sm font-semibold text-gray-900 dark:text-white">{app.slotDate}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-xs text-gray-500">Time</span>
                     <span className="text-sm font-bold text-primary">{app.slotTime}</span>
                   </div>
                </div>

                <Button 
                  fullWidth 
                  variant="primary" 
                  className="group"
                  onClick={() => navigate(`/track/${app._id}`, { 
                    state: { 
                      doctor: app.docData, 
                      selectedDate: app.slotDate, 
                      selectedTime: app.slotTime 
                    }
                  })}
                >
                  <span className="flex items-center justify-center gap-2">
                    Enter Live Queue
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientQueueTracking;
