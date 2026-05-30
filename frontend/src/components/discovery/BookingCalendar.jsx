import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';
import AppointmentCalendar from '../ui/AppointmentCalendar';

const BookingCalendar = ({ doctor, onBook, isLoading }) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  if (!doctor) {
    return (
      <div className="h-full flex items-center justify-center p-6 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl bg-gray-50 dark:bg-slate-800/50">
        <p className="text-gray-400 text-center font-medium">Select a doctor to view their schedule</p>
      </div>
    );
  }

  return (
    <Card className="h-full border-none shadow-md flex flex-col bg-white dark:bg-surface-dark">
      <div className="p-6 border-b border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/30">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          Book Appointment
        </h3>
        <p className="text-sm text-gray-500 mt-1">Select an available date and time slot</p>
      </div>
      
      <CardContent className="flex-1 overflow-y-auto p-6 space-y-8">
        <AppointmentCalendar 
          doctor={doctor}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
          isLoading={isLoading}
        />
      </CardContent>

      <div className="p-6 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
        <Button 
          fullWidth 
          variant="primary" 
          size="lg" 
          disabled={isLoading}
          isLoading={isLoading}
          onClick={() => navigate(`/book/${doctor._id}`)}
        >
          Proceed to Booking
        </Button>
      </div>
    </Card>
  );
};

export default BookingCalendar;
