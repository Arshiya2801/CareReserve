import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { Card, CardContent } from '../../components/ui/Card';

const Notifications = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchNotifications();
    }
  }, [token, backendUrl]);

  const markAsRead = async (id) => {
    try {
      await axios.put(backendUrl + `/api/notifications/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.log(error);
    }
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter(n => !n.read);
    for (let n of unread) {
      await markAsRead(n._id);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Stay updated on your appointments and alerts.</p>
        </div>
        {notifications.some(n => !n.read) && (
          <button 
            onClick={markAllAsRead}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-slate-700 rounded-2xl overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-2xl">
              🔔
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">No notifications</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100 dark:divide-slate-700/50">
            {notifications.map((notif) => (
              <div 
                key={notif._id}
                className={`p-5 flex gap-4 transition-colors ${
                  !notif.read ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  notif.type === 'success' ? 'bg-green-100 text-green-600' :
                  notif.type === 'warning' ? 'bg-amber-100 text-amber-600' :
                  notif.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {notif.type === 'success' ? '✓' :
                   notif.type === 'warning' ? '!' :
                   notif.type === 'error' ? '✕' : 'ℹ'}
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-sm ${!notif.read ? 'font-bold text-gray-900 dark:text-white' : 'font-semibold text-gray-700 dark:text-gray-300'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-gray-400 shrink-0 whitespace-nowrap">
                      {new Date(notif.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm mt-1 ${!notif.read ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500'}`}>
                    {notif.message}
                  </p>
                  
                  {!notif.read && (
                    <button 
                      onClick={() => markAsRead(notif._id)}
                      className="mt-3 text-xs font-bold text-primary hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
