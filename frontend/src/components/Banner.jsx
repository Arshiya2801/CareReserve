import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-16 my-20 mx-4 md:mx-10 overflow-hidden">
        
        {/* Left side text */}
        <div className="flex-1 py-10 md:py-16 lg:py-24 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-tight">
            Book Appointment
            <br className="hidden sm:block" />
            <span className="block mt-2">With 100+ Trusted Doctors</span>
            </h2>
            <button
            onClick={() => {
                navigate('/login');
                scrollTo(0, 0);
            }}
            className="bg-white text-gray-700 text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:scale-105 transition-transform duration-300"
            >
            Create Account
            </button>
        </div>

        {/* Right side image */}
        <div className="md:w-1/2 lg:w-[370px] mt-10 md:mt-0 relative">
            <img
            className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto"
            src={assets.appointment_img}
            alt="Doctor appointment illustration"
            />
        </div>
        </div>
    );
};

export default Banner;
