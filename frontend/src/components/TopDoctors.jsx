import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, currencySymbol } = useContext(AppContext);

    return (
        <section className="flex flex-col items-center gap-6 py-16 px-4 md:px-10 bg-slate-50 w-full mb-16 rounded-3xl shadow-sm border border-gray-100">
        <div className="text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured <span className="text-primary">Professionals</span></h2>
            <p className="text-lg text-gray-600">
                Book appointments with the most trusted and highly-rated medical experts in our network.
            </p>
        </div>

        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10">
            {doctors.slice(0, 6).map((item, index) => (
            <div
                key={index}
                onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
                }}
                className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-md hover:shadow-xl border border-gray-100 group relative"
            >
                {/* Available Badge */}
                {item.available && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm z-10">
                        <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-secondary tracking-wide">AVAILABLE</span>
                    </div>
                )}
                
                <div className="h-64 overflow-hidden bg-accent relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-0"></div>
                  <img
                  className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700"
                  src={item.image}
                  alt={`${item.name} profile`}
                  />
                </div>

                <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</h3>
                        <p className="text-sm font-semibold text-secondary">{item.speciality}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm font-bold text-gray-700">4.9</span>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                        <p><span className="font-semibold text-gray-800">{item.experience}</span> Exp.</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Consultation</p>
                        <p className="text-lg font-extrabold text-primary">{currencySymbol}{item.fees}</p>
                    </div>
                </div>

                <button className="w-full mt-5 bg-gray-50 text-primary border border-teal-100 font-semibold py-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    View Profile
                </button>
                </div>
            </div>
            ))}
        </div>

        <button
            onClick={() => {
            window.scrollTo(0, 0);
            navigate('/doctors');
            }}
            className="bg-white text-gray-800 border-2 border-gray-200 px-10 py-3.5 rounded-full font-semibold mt-10 hover:border-primary hover:text-primary hover:shadow-md transition-all"
        >
            View All Doctors
        </button>
        </section>
    );
};

export default TopDoctors;
