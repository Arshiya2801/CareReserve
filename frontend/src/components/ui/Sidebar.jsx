import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SidebarItem = ({ icon, label, path, isActive }) => {
  return (
    <Link 
      to={path} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
        isActive 
          ? 'bg-primary/10 text-primary font-semibold border-r-4 border-primary' 
          : 'text-text-light dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
      }`}
    >
      <div className={`${isActive ? 'text-primary' : 'text-gray-400'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = ({ isOpen, onClose, navItems = [] }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Content */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface-light dark:bg-surface-dark border-r border-border-light dark:border-border-dark transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="h-20 flex items-center px-6 border-b border-border-light dark:border-border-dark">
            <h2 className="text-2xl font-black text-primary">Medi<span className="text-gray-900 dark:text-white">Queue</span></h2>
            {/* Close button for mobile */}
            <button 
              className="lg:hidden ml-auto text-gray-500 hover:text-gray-900 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {navItems.map((item, index) => (
              <SidebarItem 
                key={index} 
                icon={item.icon} 
                label={item.label} 
                path={item.path} 
                isActive={location.pathname === item.path} 
              />
            ))}
          </nav>

          {/* Footer (e.g. Logout) */}
          <div className="p-4 border-t border-border-light dark:border-border-dark">
            <button className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
