import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Hero = () => {
  const navigate = useNavigate();
  const { token } = useContext(AppContext);

  return (
    <div className="flex flex-col md:flex-row items-center bg-gradient-to-br from-accent to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl px-6 md:px-16 lg:px-24 py-16 md:py-24 mb-16 shadow-sm border border-teal-100 dark:border-slate-700">
      
      {/* Left Content */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 md:pr-10">
        <div className="inline-block bg-teal-100 dark:bg-primary/20 text-teal-800 dark:text-primary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
          #1 Premium Healthcare Platform
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Book Healthcare <br className="hidden lg:block"/> 
          Appointments in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Minutes</span>
        </h1>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed md:max-w-lg">
          Find trusted doctors, schedule appointments instantly, and track your queue in real time without the waiting room anxiety.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto">
          <button 
            onClick={() => token ? navigate('/patient/dashboard') : navigate('/login?role=patient')} 
            className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Book Appointment
          </button>
          <button 
            onClick={() => token ? navigate('/doctor/dashboard') : navigate('/login?role=doctor')} 
            className="w-full sm:w-auto bg-white dark:bg-slate-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-slate-600 px-8 py-3.5 rounded-full font-semibold hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300"
          >
            Doctor Portal
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex items-center gap-4 mt-6 pt-6 border-t border-gray-200 w-full">
          <div className="flex -space-x-3">
            <img src={assets.testimonial_1} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            <img src={assets.testimonial_2} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
            <img src={assets.testimonial_3} alt="Patient" className="w-10 h-10 rounded-full border-2 border-white object-cover" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Trusted by 10,000+ patients</p>
        </div>
      </div>
      
      {/* Right Image */}
      <div className="md:w-1/2 flex justify-center mt-12 md:mt-0 relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-full blur-3xl group-hover:blur-2xl transition-all duration-700"></div>
        <img 
          src={assets.hero_illustration} 
          alt="Healthcare Illustration" 
          className="w-full max-w-lg rounded-2xl relative z-10 hover:scale-[1.02] transition-transform duration-500" 
        />
      </div>

    </div>
  );
};

export default Hero;
