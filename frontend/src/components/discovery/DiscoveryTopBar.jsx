import React from 'react';
import Input from '../ui/Input';

const DiscoveryTopBar = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  return (
    <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text"
            placeholder="Search doctors by name or specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Location (Mock) */}
        <div className="md:col-span-3 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <input 
            type="text"
            placeholder="Location"
            defaultValue="New York, NY"
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="md:col-span-2">
          <select 
            value={filters.speciality}
            onChange={(e) => setFilters({...filters, speciality: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-700 dark:text-gray-300 appearance-none"
          >
            <option value="">All Specialities</option>
            <option value="General physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <select 
            value={filters.availability}
            onChange={(e) => setFilters({...filters, availability: e.target.value})}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-gray-700 dark:text-gray-300 appearance-none"
          >
            <option value="">Any Availability</option>
            <option value="Available">Available Today</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default DiscoveryTopBar;
