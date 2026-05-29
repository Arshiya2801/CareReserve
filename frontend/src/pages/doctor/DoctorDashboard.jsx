import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import Sidebar from '../../components/ui/Sidebar';

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { label: 'Overview', path: '/doctor/dashboard', icon: '📊' },
    { label: 'Queue Manager', path: '/doctor/queue', icon: '👥' },
    { label: 'Schedule', path: '/doctor/schedule', icon: '📅' },
    { label: 'Profile', path: '/my-profile', icon: '⚙️' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 -mx-4 sm:-mx-[10%] -mt-[88px]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header Toggle */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-primary">MediQueue Doctor</h2>
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
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Doctor Dashboard</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your active patients and live queue.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white/90">Patients in Live Queue</h3>
                  <p className="text-4xl font-black mt-2">8</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Today's Total Appointments</h3>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">24</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Earnings Today</h3>
                  <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">₹12,400</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader title="Next Patient" subtitle="Current active booking" />
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl font-bold">JD</div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">John Doe</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled: 10:30 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
