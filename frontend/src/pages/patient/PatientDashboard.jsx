import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Sidebar from '../../components/ui/Sidebar';

const PatientDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/patient/dashboard', icon: '🏠' },
    { label: 'My Appointments', path: '/my-appointments', icon: '📅' },
    { label: 'Find Doctors', path: '/doctors', icon: '👨‍⚕️' },
    { label: 'Profile Settings', path: '/my-profile', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 -mx-4 sm:-mx-[10%] -mt-[88px]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header Toggle */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-primary">MediQueue</h2>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-slate-900 p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Patient Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Here is an overview of your healthcare journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-primary to-secondary text-white border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white/90">Upcoming Appointments</h3>
                  <p className="text-4xl font-black mt-2">2</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Completed Visits</h3>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">14</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Pending Reports</h3>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">0</p>
                </CardContent>
              </Card>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default PatientDashboard;
