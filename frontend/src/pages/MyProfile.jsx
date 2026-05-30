import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const MyProfile = () => {
  const { backendUrl, token, userData, loadUserProfileData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/appointments/my-appointments', { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      setAppointments(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token && !userData) {
      loadUserProfileData();
    }
    if (token) {
      fetchAppointments();
    }
  }, [token, userData]);

  if (isLoading || !userData) {
    return (
      <div className="flex items-center justify-center min-h-[500px]">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const upcomingCount = appointments.filter(app => !app.cancelled && !app.isCompleted).length;
  const completedCount = appointments.filter(app => app.isCompleted).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your personal information and account settings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => toast.info('Change Password Modal Coming Soon')}>Change Password</Button>
          <Button variant="primary" onClick={() => toast.info('Edit Profile Modal Coming Soon')}>Edit Profile</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Avatar & Summary */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center pt-8 border-none shadow-md overflow-hidden relative bg-white dark:bg-slate-800">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary to-secondary"></div>
            <CardContent className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-800 overflow-hidden bg-gray-100 dark:bg-slate-700 shadow-xl mb-4 flex items-center justify-center">
                {userData.image ? (
                  <img src={userData.image} alt={userData.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-5xl font-bold text-primary/40">
                    {userData.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{userData.name}</h2>
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-6">Patient Account</p>

              <div className="w-full grid grid-cols-2 gap-4 border-t border-gray-100 dark:border-slate-700 pt-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Upcoming</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">{upcomingCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Completed</p>
                  <p className="text-2xl font-black text-primary">{completedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border border-gray-100 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-800">
            <div className="p-6 border-b border-gray-100 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <span className="text-primary">📋</span> Personal Information
              </h3>
            </div>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Full Name</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{userData.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Email Address</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{userData.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Phone Number</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{userData.phone || 'Not Provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Date of Birth</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{userData.dob !== 'Not Selected' ? userData.dob : 'Not Provided'}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Gender</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">{userData.gender !== 'Not Selected' ? userData.gender : 'Not Provided'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-semibold mb-1">Account Created</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently'}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-gray-500 font-semibold mb-1">Residential Address</p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {userData.address?.line1 !== 'Not Provided' ? (
                      <>
                        {userData.address.line1} <br />
                        {userData.address.line2}
                      </>
                    ) : (
                      'Address not provided'
                    )}
                  </p>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default MyProfile;