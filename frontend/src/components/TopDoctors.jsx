import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);
    const [showAll, setShowAll] = useState(false);

    return (
        <section className="flex flex-col items-center gap-6 py-16 px-4 md:px-10 bg-slate-50 dark:bg-slate-800/50 w-full mb-16 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 transition-colors duration-300">
        <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured <span className="text-primary">Professionals</span></h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
                Book appointments with the most trusted and highly-rated medical experts in our network.
            </p>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10">
            {doctors.slice(0, showAll ? doctors.length : 6).map((item, index) => (
            <div
                key={index}
                onClick={() => {
                navigate(`/doctor/${item._id}`);
                window.scrollTo(0, 0);
                }}
                className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 dark:border-slate-700 group relative"
            >
                {/* Available Badge */}
                {item.available && (
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-10">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-secondary tracking-wide">AVAILABLE</span>
                    </div>
                )}
                
                <div className="h-64 overflow-hidden bg-primary/5 dark:bg-slate-700/50 flex items-center justify-center relative transition-colors duration-500 group-hover:bg-primary/10 dark:group-hover:bg-slate-700 border-b border-gray-100 dark:border-slate-700">
                    <div className="w-32 h-32 rounded-full bg-white dark:bg-slate-800 shadow-md flex items-center justify-center border-4 border-primary/10 group-hover:border-primary/30 transition-colors duration-500 relative z-10">
                        <span className="text-4xl font-extrabold text-primary tracking-wider">
                            {item.name.replace(/^Dr\.?\s+/i, '').split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
                        </span>
                    </div>
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                </div>

                <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm font-semibold text-secondary">{item.speciality}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">4.9</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <p><span className="font-semibold text-gray-800 dark:text-white">{item.experience}</span> Exp.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Consultation</p>
                        <p className="text-lg font-extrabold text-primary">{currencySymbol}{item.fees}</p>
                    </div>
                </div>

                <button className="w-full mt-5 bg-gray-50 dark:bg-slate-700 text-primary border border-teal-100 dark:border-slate-600 font-semibold py-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    View Profile
                </button>
                </div>
            </div>
            ))}
        </div>

        {!showAll && doctors.length > 6 && (
          <button
              onClick={() => setShowAll(true)}
              className="bg-white dark:bg-slate-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-slate-600 px-10 py-3.5 rounded-full font-semibold mt-10 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary hover:shadow-md transition-all duration-300"
          >
              View All Doctors
          </button>
        )}
        </section>
    );
};

export default TopDoctors;
