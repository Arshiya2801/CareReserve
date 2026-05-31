import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DoctorAvatar from '../components/ui/DoctorAvatar';
import AppointmentCalendar from '../components/ui/AppointmentCalendar';

const BookingFlow = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    if (doctors.length > 0) {
      const info = doctors.find((doc) => doc._id === docId);
      setDocInfo(info);
    }
  }, [doctors, docId]);

  const handleBookAppointment = async () => {
    if (!token) {
      toast.error("Please login to book an appointment");
      navigate('/login');
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    // Intercept API call and redirect to dedicated Payment Page
    navigate('/payment', { 
      state: { 
        docId: docInfo._id, 
        selectedDate, 
        selectedTime,
        doctor: docInfo 
      } 
    });
  };

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-16 px-4 animate-fade-in bg-gray-50 dark:bg-slate-900 min-h-[calc(100vh-80px)]">
      
      <div className="mb-6">
        <button onClick={() => navigate(-1)} className="flex items-center text-sm font-medium text-gray-500 hover:text-primary transition-colors">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back to Doctor Profile
        </button>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">Complete Your Booking</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* WIZARD LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <AppointmentCalendar 
            doctor={docInfo}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectDate={setSelectedDate}
            onSelectTime={setSelectedTime}
            isLoading={!docInfo}
          />
        </div>

        {/* RIGHT STICKY COLUMN */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Card className="border border-gray-100 dark:border-slate-700 shadow-lg overflow-hidden bg-white dark:bg-surface-dark">
              
              {/* Doctor Summary Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 text-white">
                <h3 className="font-bold text-lg mb-4 opacity-90">Order Summary</h3>
                <div className="flex items-center gap-4">
                  <DoctorAvatar doctor={docInfo} className="w-16 h-16 text-xl shadow-sm border-2 border-white" showContainer={false} />
                  <div>
                    <p className="font-bold text-lg leading-tight">{docInfo.name}</p>
                    <p className="text-sm font-medium opacity-90">{docInfo.speciality}</p>
                  </div>
                </div>
              </div>

              <CardContent className="p-6 space-y-6">
                
                {/* Selected Date/Time Detail */}
                <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-4 border border-gray-100 dark:border-slate-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500 font-semibold">Date & Time</span>
                    {selectedTime && selectedDate ? (
                       <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold px-2 py-1 rounded">Selected</span>
                    ) : (
                       <span className="text-xs bg-gray-200 text-gray-600 dark:bg-slate-700 dark:text-gray-400 font-bold px-2 py-1 rounded">Required</span>
                    )}
                  </div>
                  
                  {selectedTime && selectedDate ? (
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <p className="text-primary font-black text-xl mt-1">{selectedTime}</p>
                    </div>
                  ) : (
                    <p className="text-gray-400 dark:text-gray-500 italic text-sm">Please select a date and time slot from the left to continue.</p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                    <span>Consultation Fee</span>
                    <span className="font-medium">{currencySymbol}{docInfo.fees}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 dark:text-gray-300">
                    <span>Booking Fee</span>
                    <span className="font-medium">{currencySymbol}0</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="font-bold text-gray-900 dark:text-white text-lg">Total Payable</span>
                    <span className="font-black text-primary text-2xl">{currencySymbol}{docInfo.fees}</span>
                  </div>
                </div>

                {/* Submit Action */}
                <Button 
                  fullWidth 
                  size="lg" 
                  variant="primary" 
                  disabled={!selectedTime || isBooking}
                  isLoading={isBooking}
                  onClick={handleBookAppointment}
                >
                  Continue to Payment
                </Button>
                
                <p className="text-xs text-center text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  Secure encrypted checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookingFlow;
