import React, { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const NotificationCenter = ({ onClose }) => {
  const { backendUrl, token, socket } = useContext(AppContext);
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const dropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
    
    if (socket) {
      socket.on('notification-created', (newNotif) => {
        setNotifications((prev) => [newNotif, ...prev]);
        toast.info(newNotif.title);
      });
    }
    return () => socket?.off('notification-created');
  }, [socket]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/notifications`, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (onClose) onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${backendUrl}/api/notifications/${id}/read`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const deleteNotification = async (id) => {
    // We didn't create delete endpoint, so just remove from UI for now
    setNotifications(prev => prev.filter(n => n._id !== id));
  };

  const getFiltered = () => {
    if (activeTab === 'unread') return notifications.filter(n => !n.read);
    return notifications;
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">✅</div>;
      case 'error': return <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">❌</div>;
      case 'alert': return <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">🔔</div>;
      case 'queue': return <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">⏱️</div>;
      default: return <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">ℹ️</div>;
    }
  };

  const filteredNotifications = getFiltered();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-16 right-4 sm:right-10 w-full sm:w-96 max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Notifications</h3>
          <p className="text-xs text-gray-500">You have {unreadCount} unread messages</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full sm:hidden">
          ✕
        </button>
      </div>

      <div className="flex border-b border-gray-100 dark:border-slate-800">
        {['all', 'unread'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto min-h-[300px]">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <span className="text-4xl mb-2">📭</span>
            <p className="font-medium">No notifications here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-slate-800/50">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif._id} 
                className={`p-4 border-b border-gray-100 dark:border-slate-700/50 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors group ${!notif.read ? 'bg-primary/5 dark:bg-primary/10' : ''}`}
              >
                <div className="flex gap-4">
                  <div className="mt-1">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-sm font-bold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {new Date(notif.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className={`text-sm ${!notif.read ? 'text-gray-800 dark:text-gray-200 font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                      {notif.message}
                    </p>
                    
                    <div className="flex gap-3 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notif.read && (
                        <button onClick={() => markAsRead(notif._id)} className="text-xs font-bold text-primary hover:text-primary-dark">
                          Mark as read
                        </button>
                      )}
                      <button onClick={() => deleteNotification(notif._id)} className="text-xs font-bold text-red-500 hover:text-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-900/50 text-center">
        <button 
          onClick={() => setNotifications(prev => prev.map(n => ({...n, read: true})))}
          className="text-xs font-bold text-primary hover:underline"
        >
          Mark all as read
        </button>
      </div>

    </div>
  );
};

export default NotificationCenter;
