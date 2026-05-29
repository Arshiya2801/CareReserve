import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [socket, setSocket] = useState(null);
  const [queueInfo, setQueueInfo] = useState({}); // To track queue info per room/appointment

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

  useEffect(() => {
    if (appointments.length > 0) {
      const newSocket = io(backendUrl);
      setSocket(newSocket);

      // Join rooms for all pending appointments
      appointments.forEach(app => {
        if (!app.isCompleted && !app.cancelled) {
          newSocket.emit('join_queue', { docId: app.docId, date: app.slotDate });
        }
      });

      newSocket.on('queue_update', (data) => {
        // data contains pendingCount, nextUp, etc.
        // For simplicity, we just store it globally, but you could map it per doc/date if needed
        setQueueInfo(data);
      });

      return () => newSocket.disconnect();
    }
  }, [appointments, backendUrl]);

  return (
    <div className="px-4 md:px-8 lg:px-12 py-8">
      <p className="text-lg font-semibold text-zinc-700 border-b pb-3 mb-6">
        My Appointments
      </p>
      
      {queueInfo.pendingCount !== undefined && (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mb-6 shadow-sm border border-blue-200">
          <p className="font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Real-Time Queue Update
          </p>
          <p className="text-sm mt-1">There are currently <b>{queueInfo.pendingCount}</b> patients waiting in the queue.</p>
        </div>
      )}

      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 border-b pb-6 relative"
          >
            {item.isCompleted && (
               <div className="absolute top-0 right-0 bg-green-100 text-green-700 px-3 py-1 rounded-bl-lg text-xs font-bold">COMPLETED</div>
            )}
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
              {!item.isCompleted && (
                <>
                  <button className="text-sm text-stone-600 border py-2 rounded hover:bg-primary hover:text-white transition-all sm:min-w-[180px]">
                    Pay Online
                  </button>
                  <button className="text-sm text-stone-600 border py-2 rounded hover:bg-red-600 hover:text-white transition-all sm:min-w-[180px]">
                    Cancel Appointment
                  </button>
                  {/* TEST BUTTON for Queue Tracking */}
                  <button 
                    onClick={async () => {
                      try {
                        await axios.put(backendUrl + '/api/appointments/complete/' + item._id, {}, { headers: { Authorization: `Bearer ${token}` } });
                        toast.success("Appointment completed! (Queue Advanced)");
                        getUserAppointments();
                      } catch (error) {
                        toast.error(error.message);
                      }
                    }}
                    className="text-sm text-white bg-green-500 border py-2 rounded hover:bg-green-600 transition-all sm:min-w-[180px]">
                    Complete (Simulate Doctor)
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
