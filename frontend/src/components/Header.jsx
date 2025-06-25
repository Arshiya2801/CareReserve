import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row items-center bg-primary rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-[6vw] gap-10">
  {/* Left Side */}
    <div className="md:w-1/2 flex flex-col gap-5 text-white items-center md:items-start text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
        Book Appointment <br /> With Trusted Doctors
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3 text-sm font-light">
        <img className="w-28" src={assets.group_profiles} alt="Profiles" />
        <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
        </p>
        </div>

        <a
        href="#speciality"
        className="mt-4 flex items-center gap-2 bg-white text-gray-600 px-8 py-3 rounded-full text-sm w-fit hover:scale-105 transition-transform"
        >
        Book Appointment
        <img className="w-3" src={assets.arrow_icon} alt="Arrow icon" />
        </a>
    </div>


        {/* Right Side */}
        <div className="md:w-1/2 relative flex justify-center">
            <img
            className="w-full md:w-auto max-w-[450px] h-auto object-contain rounded-lg"
            src={assets.header_img}
            alt="Doctor illustration"
            />
        </div>
        </div>
    );
};

export default Header;
