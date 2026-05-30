import React from 'react';
import { assets } from '../../assets/assets';

const DoctorListCard = ({ doctor, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`p-4 cursor-pointer border-b border-gray-100 dark:border-slate-700/50 hover:bg-primary/5 dark:hover:bg-slate-800 transition-colors ${
        isSelected ? 'bg-primary/10 border-l-4 border-l-primary dark:bg-slate-800' : 'bg-white dark:bg-surface-dark border-l-4 border-l-transparent'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Profile Image */}
        <div className="relative shrink-0">
          <img 
            src={doctor.image} 
            alt={doctor.name} 
            onError={(e) => { e.target.onerror = null; e.target.src = assets.profile_pic; }}
            className="w-16 h-16 rounded-full object-cover bg-accent dark:bg-slate-700 border-2 border-white dark:border-slate-600 shadow-sm"
          />
          {doctor.available && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
          )}
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-gray-900 dark:text-white truncate flex items-center gap-1">
            {doctor.name}
            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{doctor.speciality}</p>
          <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              4.8
            </span>
            <span>•</span>
            <span>{doctor.experience} Exp</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorListCard;
