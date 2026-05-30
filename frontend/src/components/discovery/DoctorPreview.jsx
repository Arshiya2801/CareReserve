import React from 'react';
import { Card, CardContent } from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

const DoctorPreview = ({ doctor, currencySymbol }) => {
  if (!doctor) {
    return (
      <EmptyState 
        title="Select a Doctor" 
        description="Browse the list and select a doctor to view their profile, experience, and book an appointment."
      />
    );
  }

  return (
    <Card className="h-full border-none shadow-md overflow-hidden bg-white dark:bg-surface-dark flex flex-col">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute -bottom-12 left-6">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            onError={(e) => { e.target.onerror = null; e.target.src = assets.profile_pic; }}
            className="w-24 h-24 rounded-2xl object-cover bg-white p-1 shadow-lg border border-gray-100"
          />
        </div>
      </div>
      
      <CardContent className="pt-16 pb-6 px-6 flex-1 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            {doctor.name}
            <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
          </h2>
          <p className="text-primary font-semibold mt-1">{doctor.degree} - {doctor.speciality}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Experience</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{doctor.experience}</p>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Consultation Fee</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">{currencySymbol}{doctor.fees}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            About Doctor
          </h3>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            {doctor.about}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Location</h3>
          <div className="flex items-start gap-3 text-gray-600 dark:text-gray-400 text-sm mb-6">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <p>
              {doctor.address?.line1}<br/>
              {doctor.address?.line2}
            </p>
          </div>
          
          <Link 
            to={`/doctor/${doctor._id}`}
            className="w-full flex items-center justify-center py-3 px-4 bg-gray-50 dark:bg-slate-800 text-primary font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
          >
            View Full Profile
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorPreview;
