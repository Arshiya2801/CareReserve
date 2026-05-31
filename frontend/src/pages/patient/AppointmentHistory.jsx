import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DoctorAvatar from '../../components/ui/DoctorAvatar';

const AppointmentHistory = () => {
  const { backendUrl, token } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, completed, cancelled

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(backendUrl + '/api/appointments/my-appointments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Only keep completed or cancelled
        const historyApps = data.filter(app => app.isCompleted || app.cancelled);
        setAppointments(historyApps);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchHistory();
    }
  }, [token, backendUrl]);

  // Apply filters
  const filteredHistory = appointments.filter(app => {
    // 1. Status Filter
    if (filterType === 'completed' && !app.isCompleted) return false;
    if (filterType === 'cancelled' && !app.cancelled) return false;

    // 2. Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchName = app.docData.name.toLowerCase().includes(term);
      const matchSpec = app.docData.speciality.toLowerCase().includes(term);
      if (!matchName && !matchSpec) return false;
    }
    
    return true;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Appointment History</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">View your past consultations and cancelled bookings.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm text-gray-900 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div className="relative flex-1 md:w-64">
            <input 
              type="text" 
              placeholder="Search doctors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-sm shadow-sm text-gray-900 dark:text-white"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-slate-700 rounded-2xl p-6 min-h-[400px]">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredHistory.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
              📁
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No history found</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm">
              {searchTerm || filterType !== 'all' 
                ? "No past appointments match your criteria." 
                : "You don't have any completed or cancelled appointments yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredHistory.map((item, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-slate-800/50 border border-gray-100 dark:border-slate-700 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <DoctorAvatar doctor={item.docData} className="w-14 h-14 rounded-xl shadow-sm text-lg" showContainer={false} />
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{item.docData.name}</h3>
                    <p className="text-xs text-primary font-semibold">{item.docData.speciality}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span>{item.slotDate}</span>
                      <span>•</span>
                      <span>{item.slotTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.cancelled 
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' 
                      : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {item.cancelled ? 'Cancelled' : 'Completed'}
                  </span>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/doctor/${item.docData._id}`)}
                  >
                    View Doctor
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentHistory;
