import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="px-4 md:px-10 mt-20 text-sm text-gray-600">
        {/* Top Footer */}
        <div className="flex flex-col md:grid md:grid-cols-[3fr_1fr_1fr] gap-14 mb-10">
            {/* Logo + Description */}
            <div>
            <img className="mb-5 w-40" src={assets.logo} alt="CareReserve logo" />
            <p className="md:w-2/3 leading-6">
                At CareReserve, we connect patients with trusted healthcare professionals — making it
                easy to book appointments, access quality care, and manage your health anytime, anywhere.
            </p>
            </div>

            {/* Company Links */}
            <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">COMPANY</h3>
            <ul className="space-y-2">
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About Us</a></li>
                <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
            </div>

            {/* Contact Info */}
            <div>
            <h3 className="text-base font-semibold text-gray-800 mb-4">GET IN TOUCH</h3>
            <ul className="space-y-2">
                <li>+1-213-456-6542</li>
                <li>CareReserve@gmail.com</li>
            </ul>
            </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 pt-5 text-center text-xs text-gray-500">
            © 2025 CareReserve — All Rights Reserved.
        </div>
        </footer>
    );
};

export default Footer;
