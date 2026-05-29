import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const MyAppointments = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [socket, setSocket] = useState(null);
  const [queueInfo, setQueueInfo] = useState({});

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

      appointments.forEach(app => {
        if (!app.isCompleted && !app.cancelled) {
          newSocket.emit('join_queue', { docId: app.docId, date: app.slotDate });
        }
      });

      newSocket.on('queue_update', (data) => {
        setQueueInfo(data);
      });

      return () => newSocket.disconnect();
    }
  }, [appointments, backendUrl]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900">My Appointments</h2>
        <p className="text-gray-500 mt-2">Manage your bookings and track your wait time in real-time.</p>
      </div>
      
      {/* Premium Real-Time Queue Widget */}
      {queueInfo.pendingCount !== undefined && (
        <div className="bg-gradient-to-r from-primary to-secondary p-[1px] rounded-2xl shadow-xl mb-10 transform hover:scale-[1.01] transition-transform duration-300">
          <div className="bg-white p-6 rounded-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center gap-4 z-10 w-full sm:w-auto">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center relative">
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20"></div>
                <span className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(13,148,136,0.8)]"></span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Live Queue Tracking</h3>
                <p className="text-sm text-gray-500">Your doctor's current waiting room status</p>
              </div>
            </div>

            <div className="mt-4 sm:mt-0 bg-gray-50 border border-gray-100 px-6 py-3 rounded-xl flex flex-col items-center z-10 w-full sm:w-auto">
              <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {queueInfo.pendingCount}
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Patients Waiting</span>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Cards */}
      <div className="grid grid-cols-1 gap-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row gap-6 p-6 rounded-2xl border transition-all duration-300 ${
              item.isCompleted ? 'bg-gray-50 border-gray-200 opacity-80' : 'bg-white border-teal-50 shadow-sm hover:shadow-md'
            } relative overflow-hidden`}
          >
            {item.isCompleted && (
               <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                 COMPLETED
               </div>
            )}
            
            {/* Doctor Image */}
            <div className="flex-shrink-0 relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl overflow-hidden bg-accent relative z-10">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Appointment Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{item.docData.name}</h3>
                <p className="text-sm font-semibold text-secondary mb-3">{item.docData.speciality}</p>
                
                <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
                  <span className="text-gray-400 mt-0.5">📍</span>
                  <p>{item.docData.address?.line1}<br/>{item.docData.address?.line2}</p>
                </div>
              </div>

              <div className="bg-accent/30 rounded-lg px-4 py-3 mt-4 inline-flex items-center gap-3 border border-teal-50">
                <span className="text-xl">📅</span>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Scheduled For</p>
                  <p className="text-sm font-bold text-gray-900">{item.slotDate} <span className="text-gray-400 mx-1">|</span> <span className="text-primary">{item.slotTime}</span></p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 justify-center min-w-[200px]">
              {!item.isCompleted && (
                <>
                  <button className="w-full text-sm font-semibold bg-gray-50 text-gray-700 border border-gray-200 py-3 rounded-xl hover:bg-gray-100 hover:text-gray-900 transition-all">
                    Pay Online
                  </button>
                  <button className="w-full text-sm font-semibold bg-red-50 text-red-600 border border-red-100 py-3 rounded-xl hover:bg-red-500 hover:text-white transition-all">
                    Cancel Booking
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
                    className="w-full text-sm font-semibold bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all mt-2">
                    Simulate Doctor Visit
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {appointments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-500 mb-4">You have no upcoming appointments.</p>
            <button onClick={() => window.location.href='/doctors'} className="bg-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-teal-700 transition-colors">
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
