import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/appointments/my-appointments', { headers: { Authorization: `Bearer ${token}` } });
      setAppointments(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8">
      <p className="text-lg font-semibold text-zinc-700 border-b pb-3 mb-6">
        My Appointments
      </p>

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 border-b pb-6"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.docData.image}
                alt={item.docData.name}
                className="w-32 h-32 object-cover rounded-lg bg-indigo-50"
              />
            </div>

            {/* Appointment Info */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>

              <div className="mt-2">
                <p className="text-zinc-700 font-medium">Address</p>
                <p className="text-xs">{item.docData.address?.line1}</p>
                <p className="text-xs">{item.docData.address?.line2}</p>
              </div>

              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{' '}
                {item.slotDate} | {item.slotTime}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 mt-4 sm:mt-0 sm:justify-end">
              <button className="text-sm text-stone-600 border py-2 rounded hover:bg-primary hover:text-white transition-all sm:min-w-[180px]">
                Pay Online
              </button>
              <button className="text-sm text-stone-600 border py-2 rounded hover:bg-red-600 hover:text-white transition-all sm:min-w-[180px]">
                Cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
