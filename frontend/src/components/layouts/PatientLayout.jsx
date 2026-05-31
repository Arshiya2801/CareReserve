import React, { useState, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../ui/Sidebar';
import { AppContext } from '../../context/AppContext';
import { Home, Search, Calendar, Clock, Folder, User } from 'lucide-react';

const PatientLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: <Home className="w-5 h-5" /> },
    { label: 'Book Appointment', path: '/patient/book-appointment', icon: <Search className="w-5 h-5" /> },
    { label: 'My Appointments', path: '/my-appointments', icon: <Calendar className="w-5 h-5" /> },
    { label: 'Queue Tracking', path: '/patient/queue-tracking', icon: <Clock className="w-5 h-5" /> },
    { label: 'Appointment History', path: '/patient/appointment-history', icon: <Folder className="w-5 h-5" /> },
    { label: 'Profile', path: '/my-profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 w-full overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        navItems={navItems} 
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header Toggle */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 z-10">
          <h2 className="text-xl font-bold text-primary">Medi<span className="text-gray-900 dark:text-white">Queue</span></h2>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-900 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
