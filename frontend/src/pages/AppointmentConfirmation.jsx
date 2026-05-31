import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import DoctorAvatar from '../components/ui/DoctorAvatar';
import Button from '../components/ui/Button';

const AppointmentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointmentId, setAppointmentId] = useState('');

  // Fallback if accessed without state
  useEffect(() => {
    if (!location.state || !location.state.doctor) {
      navigate('/doctors');
    }
    // Generate mock appointment ID
    setAppointmentId(`MQ-${Math.floor(100000 + Math.random() * 900000)}`);
  }, [location, navigate]);

  if (!location.state || !location.state.doctor) return null;

  const { doctor, selectedDate, selectedTime } = location.state;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        
        {/* Success Header Animation */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce-short">
            <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Booking Confirmed!</h1>
          <p className="text-gray-500 dark:text-gray-400">Your appointment has been successfully scheduled.</p>
        </div>

        {/* Appointment Timeline (Stepper) */}
        <Card className="border-none shadow-sm bg-white dark:bg-surface-dark overflow-hidden">
          <CardContent className="p-8">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-slate-700 -z-10"></div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[50%] h-1 bg-primary -z-10 transition-all duration-1000"></div>
              
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold border-4 border-white dark:border-surface-dark shadow-sm">1</div>
                <p className="text-xs font-bold mt-2 text-gray-900 dark:text-white">Payment Received</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold border-4 border-white dark:border-surface-dark shadow-sm">2</div>
                <p className="text-xs font-bold mt-2 text-gray-900 dark:text-white">Confirmed</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 text-gray-500 flex items-center justify-center font-bold border-4 border-white dark:border-surface-dark shadow-sm">3</div>
                <p className="text-xs font-medium mt-2 text-gray-500">Consultation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Appointment Card */}
        <Card className="border border-gray-100 dark:border-slate-700 shadow-md bg-white dark:bg-surface-dark overflow-hidden relative">
          <div className="absolute top-0 right-0 p-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-black bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
              Confirmed
            </span>
          </div>
          
          <CardContent className="p-8 space-y-8">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Appointment ID</p>
              <p className="text-lg font-mono font-bold text-gray-900 dark:text-white">{appointmentId}</p>
            </div>

            <div className="flex items-center gap-4 py-6 border-y border-gray-100 dark:border-slate-700">
              <DoctorAvatar doctor={doctor} className="w-20 h-20 rounded-2xl text-2xl shadow-sm" showContainer={false} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{doctor.name}</h3>
                <p className="text-primary font-medium">{doctor.speciality}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 dark:bg-slate-800 rounded-lg text-blue-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Date & Time</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">{selectedDate.toLocaleDateString()}</p>
                  <p className="text-primary font-bold">{selectedTime}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-50 dark:bg-slate-800 rounded-lg text-purple-500">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500">Hospital / Clinic</p>
                  <p className="font-bold text-gray-900 dark:text-white mt-1">MediQueue Care Center</p>
                  <p className="text-sm text-gray-500">124 Health Avenue, Block A, NY</p>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          <Button 
            variant="primary" 
            onClick={() => navigate('/my-appointments')}
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
            View Appointment
          </Button>
          <Button 
            variant="outline" 
            onClick={() => alert("Downloading PDF Confirmation...")}
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            Download Receipt
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/track/${appointmentId}`, { state: { doctor, selectedDate, selectedTime } })}
            className="flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            Track Queue
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AppointmentConfirmation;
