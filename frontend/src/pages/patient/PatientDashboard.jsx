import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PatientDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Patient Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Welcome back! Manage your healthcare journey.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/doctors')}>Find Doctor</Button>
            <Button variant="primary" onClick={() => navigate('/doctors')}>Book Appointment</Button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-gradient-to-br from-primary to-secondary text-white border-none transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider">Upcoming</h3>
              <p className="text-4xl font-black mt-2">1</p>
            </CardContent>
          </Card>
          <Card className="transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</h3>
              <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">12</p>
            </CardContent>
          </Card>
          <Card className="transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Completed</h3>
              <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">11</p>
            </CardContent>
          </Card>
          <Card className="transform transition-transform hover:-translate-y-1 hover:shadow-lg">
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Pending</h3>
              <p className="text-4xl font-black text-gray-900 dark:text-white mt-2">0</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Upcoming & Recent */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Appointment Widget */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Upcoming Appointment</h2>
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-primary/20 overflow-hidden relative group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
                <div className="p-6 flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-accent dark:bg-slate-700 flex items-center justify-center text-primary text-2xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dr. Richard James</h3>
                      <p className="text-primary font-medium">General physician</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <span>📅 Tomorrow</span>
                      <span className="text-gray-300 dark:text-gray-600">|</span>
                      <span className="font-semibold text-gray-900 dark:text-white">10:30 AM</span>
                    </div>
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs font-bold rounded-full">
                      Awaiting Confirmation
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
              <Card>
                <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
                  
                  <div className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">✓</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Appointment Completed</p>
                      <p className="text-xs text-gray-500">Dr. Sarah Patel • Cardiology</p>
                    </div>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>

                  <div className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">📅</div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">New Booking Created</p>
                      <p className="text-xs text-gray-500">Dr. Richard James • General physician</p>
                    </div>
                    <span className="text-xs text-gray-400">4 days ago</span>
                  </div>

                </div>
              </Card>
            </section>

          </div>

          {/* Right Column: Quick Actions */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                
                <button 
                  onClick={() => navigate('/doctors')}
                  className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-accent dark:bg-slate-700 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-3">
                    🔍
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Find Doctor</span>
                </button>
                
                <button 
                  className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-primary hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 bg-accent dark:bg-slate-700 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform mb-3">
                    📁
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">Medical Records</span>
                </button>
                
              </div>
            </section>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PatientDashboard;
