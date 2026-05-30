import React, { useState, useRef, useEffect } from 'react';

const mockNotifications = [
  { id: 1, type: 'alert', title: 'Appointment Reminder', message: 'Your appointment with Dr. Richard James is in 2 hours.', time: '10 mins ago', read: false },
  { id: 2, type: 'queue', title: 'Queue Position Updated', message: 'You are now #3 in line. Estimated wait: 15 mins.', time: '1 hour ago', read: false },
  { id: 3, type: 'success', title: 'Payment Success', message: 'Payment of $150 was successful for your upcoming visit.', time: '2 hours ago', read: true },
  { id: 4, type: 'info', title: 'Appointment Booked', message: 'Your booking for Friday, Oct 24 has been confirmed.', time: '1 day ago', read: true },
  { id: 5, type: 'success', title: 'Consultation Completed', message: 'Dr. Sarah Smith has completed your consultation. View prescription.', time: '2 days ago', read: true },
  { id: 6, type: 'success', title: 'Appointment Accepted', message: 'Dr. Davis has accepted your reschedule request.', time: '3 days ago', read: true },
  { id: 7, type: 'error', title: 'Appointment Rejected', message: 'Dr. Brown is unavailable at the requested time.', time: '1 week ago', read: true },
];

const NotificationCenter = ({ onClose }) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState('All');
  const dropdownRef = useRef(null);

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

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id, e) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getFiltered = () => {
    if (activeTab === 'Unread') return notifications.filter(n => !n.read);
    if (activeTab === 'Alerts') return notifications.filter(n => n.type === 'alert' || n.type === 'queue');
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

  const filtered = getFiltered();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-16 right-4 sm:right-10 w-full sm:w-96 max-h-[80vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-800 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50 dark:bg-slate-900/50">
        <div>
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">Notifications</h3>
          <p className="text-xs text-gray-500">You have {unreadCount} unread messages</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-slate-800 rounded-full sm:hidden">
          ✕
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 dark:border-slate-800">
        {['All', 'Unread', 'Alerts'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-sm font-semibold transition-colors ${
              activeTab === tab 
                ? 'text-primary border-b-2 border-primary' 
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto min-h-[300px]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <span className="text-4xl mb-2">📭</span>
            <p className="font-medium">No notifications here</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50 dark:divide-slate-800/50">
            {filtered.map(notification => (
              <div 
                key={notification.id} 
                onClick={() => markAsRead(notification.id)}
                className={`p-4 flex gap-4 cursor-pointer group transition-colors ${
                  notification.read ? 'hover:bg-gray-50 dark:hover:bg-slate-800/50 opacity-75' : 'bg-primary/5 hover:bg-primary/10'
                }`}
              >
                {getIcon(notification.type)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className={`text-sm font-bold truncate pr-4 ${notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                      {notification.title}
                    </p>
                    <span className="text-[10px] whitespace-nowrap text-gray-400 font-medium">
                      {notification.time}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {notification.message}
                  </p>
                </div>
                
                {/* Actions (Hover) */}
                <div className="flex flex-col items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pl-2">
                  {!notification.read && <div className="w-2 h-2 rounded-full bg-primary mt-1"></div>}
                  <button 
                    onClick={(e) => deleteNotification(notification.id, e)}
                    className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
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
