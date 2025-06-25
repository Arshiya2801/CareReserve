import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8">
      <p className="text-lg font-semibold text-zinc-700 border-b pb-3 mb-6">
        My Appointments
      </p>

      <div className="space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 border-b pb-6"
          >
            {/* Doctor Image */}
            <div className="flex-shrink-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg bg-indigo-50"
              />
            </div>

            {/* Appointment Info */}
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">{item.name}</p>
              <p>{item.speciality}</p>

              <div className="mt-2">
                <p className="text-zinc-700 font-medium">Address</p>
                <p className="text-xs">{item.address.line1}</p>
                <p className="text-xs">{item.address.line2}</p>
              </div>

              <p className="text-xs mt-2">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{' '}
                25 June, 2025 | 8:30 PM
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
