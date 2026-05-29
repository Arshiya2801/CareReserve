import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

const BookingCalendar = ({ doctor, onBook, isLoading }) => {
  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const getAvailableSlots = () => {
    setDocSlots([]);
    const today = new Date();
    const newSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        if (currentDate.getHours() >= 18) continue;
        currentDate.setHours(currentDate.getHours() + 1);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 0 : 30);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      newSlots.push(timeSlots);
    }
    setDocSlots(newSlots);
  };

  useEffect(() => {
    if (doctor) {
      getAvailableSlots();
      setSlotIndex(0);
      setSlotTime('');
    }
  }, [doctor]);

  const handleBook = () => {
    if (!slotTime) return;
    const date = docSlots[slotIndex][0].dateTime;
    onBook(doctor._id, date, slotTime);
  };

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
        
        {/* Date Selectors */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Date</h4>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
            {docSlots.length > 0 && docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSlotIndex(index);
                  setSlotTime('');
                }}
                className={`snap-start shrink-0 flex flex-col items-center justify-center w-16 py-3 rounded-xl transition-all duration-200 ${
                  slotIndex === index
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                    : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">
                  {item[0] && daysofWeek[item[0].dateTime.getDay()]}
                </span>
                <span className="text-lg font-black">
                  {item[0] && item[0].dateTime.getDate()}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Available Slots</h4>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {docSlots.length > 0 && docSlots[slotIndex]?.length > 0 ? (
              docSlots[slotIndex].map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm py-2.5 rounded-lg font-medium transition-all duration-200 ${
                    item.time === slotTime
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-primary/50'
                  }`}
                >
                  {item.time}
                </button>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-sm text-gray-500 border border-dashed border-gray-200 dark:border-slate-700 rounded-xl">
                No slots available on this date
              </div>
            )}
          </div>
        </div>

      </CardContent>

      <div className="p-6 border-t border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/80">
        <Button 
          fullWidth 
          variant="primary" 
          size="lg" 
          disabled={!slotTime || isLoading}
          isLoading={isLoading}
          onClick={handleBook}
        >
          {slotTime ? 'Confirm Booking' : 'Select a time slot'}
        </Button>
      </div>
    </Card>
  );
};

export default BookingCalendar;
