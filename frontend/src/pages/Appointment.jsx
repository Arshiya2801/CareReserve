import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { doctors, currencySymbol } = useContext(AppContext);
  const { docId } = useParams();
  const [docInfo, setDocInfo] = useState(null);

  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();

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
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, []);

  const fetchDocInfo = async () => {
    const info = doctors.find((doc) => doc._id === docId);
    setDocInfo(info);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  return (
    docInfo && (
      <div className="p-4 max-w-7xl mx-auto">
        {/* Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-6">
          <img
            className="bg-primary w-full sm:w-60 rounded-lg object-cover"
            src={docInfo.image}
            alt={docInfo.name}
          />

          <div className="flex-1 border border-gray-300 rounded-lg p-4 bg-white">
            <p className="flex items-center gap-2 text-xl font-semibold text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>

            <div className="flex items-center flex-wrap gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} – {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div className="mt-3">
              <p className="flex items-center gap-2 text-sm font-medium text-gray-900">
                About
                <img className="w-4 h-4" src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
            </div>

            <p className="text-gray-700 font-medium mt-4">
              Appointment fee:{' '}
              <span className="text-gray-900">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="mt-10">
          <h2 className="text-lg font-medium text-gray-800 mb-2">
            Booking Slots
          </h2>

          {/* Date Selectors */}
          <div className="flex gap-3 items-center overflow-x-auto pb-2">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`text-center py-4 px-3 min-w-[60px] rounded-lg cursor-pointer 
                    ${
                      slotIndex === index
                        ? 'bg-primary text-white'
                        : 'border border-gray-300 text-gray-700'
                    }`}
                >
                  <p className="text-sm font-medium">
                    {item[0] && daysofWeek[item[0].dateTime.getDay()]}
                  </p>
                  <p className="text-base">
                    {item[0] && item[0].dateTime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 overflow-x-auto mt-5 pb-2">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm px-5 py-2 rounded-full cursor-pointer whitespace-nowrap ${
                    item.time === slotTime
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 text-gray-600'
                  }`}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all text-sm">
            Book Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
