import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';

const DoctorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Exact Sidebar Links Requested
  const navItems = [
    { label: 'Dashboard', path: '/doctor/dashboard', icon: '📊' },
    { label: 'Appointments', path: '/doctor/appointments', icon: '📅' },
    { label: 'Patients', path: '/doctor/patients', icon: '👥' },
    { label: 'Earnings', path: '/doctor/earnings', icon: '💰' },
    { label: 'Profile', path: '/my-profile', icon: '👤' },
    { label: 'Settings', path: '/doctor/settings', icon: '⚙️' },
    { label: 'Logout', path: '/login', icon: '🚪' },
  ];

  // Mock Appointments Data for the Table
  const mockAppointments = [
    { id: 1, name: "Emily Chen", time: "10:00 AM", status: "Pending", history: "Asthma, Mild Hypertension", prevVisits: 2, phone: "+1 555-0198" },
    { id: 2, name: "Michael Smith", time: "11:30 AM", status: "Accepted", history: "No major issues", prevVisits: 0, phone: "+1 555-0284" },
    { id: 3, name: "Sarah Johnson", time: "01:00 PM", status: "Pending", history: "Type 2 Diabetes", prevVisits: 5, phone: "+1 555-0371" },
    { id: 4, name: "David Wilson", time: "02:45 PM", status: "Completed", history: "Post-surgery checkup", prevVisits: 1, phone: "+1 555-0466" },
  ];

  // Table Action Handlers
  const handleAction = (action, patientName) => {
    alert(`${action} triggered for ${patientName}`);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 -mx-4 sm:-mx-[10%] -mt-[88px]">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} navItems={navItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
          <h2 className="text-xl font-bold text-primary">MediQueue</h2>
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-10">
          <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            
            {/* 1. Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white dark:bg-surface-dark border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Today's Appointments</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">12</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xl">📅</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-surface-dark border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Upcoming Patients</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">8</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 text-xl">👥</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-surface-dark border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Monthly Earnings</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">$4,250</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xl">💰</div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-surface-dark border-none shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">Total Patients</p>
                    <p className="text-3xl font-black text-gray-900 dark:text-white mt-1">1,432</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 text-xl">📈</div>
                </CardContent>
              </Card>
            </div>

            {/* 2. Appointments Table */}
            <Card className="border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Appointments</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-900/50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Patient Name</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Appointment Time</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-100 dark:divide-slate-700">
                    {mockAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button 
                            onClick={() => setSelectedPatient(app)}
                            className="font-bold text-primary hover:underline"
                          >
                            {app.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{app.time}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            app.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            app.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          {app.status !== 'Completed' && (
                            <>
                              <button onClick={() => handleAction('Accept', app.name)} className="text-blue-600 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">Accept</button>
                              <button onClick={() => handleAction('Reject', app.name)} className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors">Reject</button>
                              {app.status === 'Accepted' && (
                                <button onClick={() => handleAction('Complete Appointment', app.name)} className="text-green-600 hover:text-green-900 bg-green-50 hover:bg-green-100 px-3 py-1.5 rounded-lg transition-colors">Complete Appointment</button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

          </div>
        </main>
      </div>

      {/* 3. Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Patient Details</h3>
              <button onClick={() => setSelectedPatient(null)} className="text-gray-400 hover:text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <div className="p-6 space-y-6">
              
              {/* Info Block */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-xl font-bold text-primary">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">{selectedPatient.name}</h4>
                  <p className="text-sm text-gray-500">Patient ID: #{selectedPatient.id}A89</p>
                </div>
              </div>

              {/* Required Sections */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Medical History</h5>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                    {selectedPatient.history}
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Previous Appointments</h5>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                    {selectedPatient.prevVisits} visit(s) recorded.
                  </p>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Contact Information</h5>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700 flex items-center gap-2">
                    <span>📞</span> {selectedPatient.phone}
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
                <Button fullWidth variant="outline" onClick={() => setSelectedPatient(null)}>Close Details</Button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DoctorDashboard;
