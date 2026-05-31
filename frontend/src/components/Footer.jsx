import React from 'react';
import { assets } from '../assets/assets';
import { Phone, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-16 px-4 md:px-10 mt-20">
        {/* Top Footer */}
        <div className="max-w-7xl mx-auto flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr] gap-14 mb-10">
            {/* Logo + Description */}
            <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    M
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Medi<span className="text-primary">Queue</span></span>
            </div>
            <p className="md:w-3/4 leading-relaxed text-sm text-gray-400">
                The world's premium healthcare appointment platform. We connect patients with top-rated medical experts instantly, featuring real-time queue tracking for an anxiety-free experience.
            </p>
            </div>

            {/* Company Links */}
            <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Company</h3>
            <ul className="space-y-3 text-sm">
                <li><a href="/" className="hover:text-primary transition-colors">Home</a></li>
                <li><a href="/doctors" className="hover:text-primary transition-colors">Find Doctors</a></li>
                <li><a href="/about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="/contact" className="hover:text-primary transition-colors">Contact Support</a></li>
            </ul>
            </div>

            {/* Contact Info */}
            <div>
            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Get in Touch</h3>
            <ul className="flex flex-col gap-2 text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2 group">
                    <Phone className="w-4 h-4 text-primary" /> +1-213-456-6542
                </li>
                <li className="flex items-center gap-2 group">
                    <Mail className="w-4 h-4 text-primary" /> info@mediqueue.com
                </li>
            </ul>
            </div>
        </div>

        {/* Bottom Footer */}
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2026 MediQueue Technologies. All Rights Reserved.</p>
            <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
        </footer>
    );
};

export default Footer;
