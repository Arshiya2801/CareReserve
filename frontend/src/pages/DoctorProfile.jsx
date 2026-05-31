import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import DoctorAvatar from '../components/ui/DoctorAvatar';
import { assets } from '../assets/assets';

const DoctorProfile = () => {
  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors.length > 0) {
      const info = doctors.find((doc) => doc._id === docId);
      setDocInfo(info);
    }
  }, [doctors, docId]);

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Mock data for extended profile fields since they don't exist in the current DB schema yet
  const mockExtendedData = {
    languages: ['English', 'Hindi', 'Gujarati'],
    education: [
      { degree: docInfo.degree, institute: 'All India Institute of Medical Sciences (AIIMS)', year: '2010' },
      { degree: 'MD', institute: 'Johns Hopkins University', year: '2014' }
    ],
    certifications: ['Board Certified in ' + docInfo.speciality, 'Advanced Life Support (ALS)'],
    hospitals: ['Apollo Hospital, City Center', 'Fortis Escorts Heart Institute'],
    reviews: [
      { name: 'Rahul Sharma', rating: 5, date: '2 days ago', text: `Dr. ${docInfo.name.replace('Dr. ', '')} was incredibly patient and explained everything clearly. Highly recommended!` },
      { name: 'Priya Patel', rating: 4.5, date: '1 week ago', text: 'Very professional clinic and great consultation. Just had to wait 15 minutes past my slot.' },
      { name: 'Ankit Desai', rating: 5, date: '1 month ago', text: 'Accurate diagnosis and friendly demeanor. The best ' + docInfo.speciality.toLowerCase() + ' in the city.' }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto pt-6 pb-16 animate-fade-in px-4 sm:px-0">
      
      {/* HERO SECTION */}
      <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden mb-8">
        <div className="h-48 bg-gradient-to-r from-primary/90 to-secondary relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
        </div>
        <div className="px-8 pb-8 relative">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Avatar */}
            <div className="-mt-20 shrink-0 w-40 h-40 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
              <DoctorAvatar doctor={docInfo} className="w-full h-full text-5xl md:text-7xl shadow-none border-0" showContainer={false} />
            </div>
            
            {/* Info & Actions */}
            <div className="flex-1 w-full pt-2 md:pt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">
                    {docInfo.name}
                  </h1>
                  <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
                </div>
                <p className="text-lg text-primary font-bold mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  {docInfo.speciality}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    ⭐ 4.8 Rating
                  </span>
                  <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                    📅 {docInfo.experience} Experience
                  </span>
                  <span className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {currencySymbol}{docInfo.fees} Consultation
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* FULL WIDTH LAYOUT */}
      <div className="space-y-8">
        
        {/* About */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-100 dark:border-slate-700 pb-2">About Doctor</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {docInfo.about}
            </p>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white mr-2">Languages:</span>
              {mockExtendedData.languages.map((lang, idx) => (
                <span key={idx} className="text-sm px-3 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-full">
                  {lang}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Professional Details */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">Professional Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Education</h3>
                <div className="space-y-3">
                  {mockExtendedData.education.map((edu, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">🎓</div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{edu.degree}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{edu.institute}, {edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-50 dark:border-slate-700/50">
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Certifications</h3>
                  <ul className="space-y-2">
                    {mockExtendedData.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Hospital Affiliations</h3>
                  <ul className="space-y-2">
                    {mockExtendedData.hospitals.map((hosp, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        {hosp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Patient Reviews */}
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 dark:border-slate-700 pb-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Patient Reviews</h2>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-gray-900 dark:text-white">4.8</span>
                <div className="flex text-amber-400">
                  {'★★★★★'.split('').map((star, i) => <span key={i}>{star}</span>)}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {mockExtendedData.reviews.map((review, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-amber-400 text-sm">
                      {'★★★★★'.split('').map((star, i) => <span key={i} className={i < Math.floor(review.rating) ? '' : 'text-gray-300 dark:text-slate-600'}>{star}</span>)}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm italic">"{review.text}"</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default DoctorProfile;
