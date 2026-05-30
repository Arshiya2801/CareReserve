import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const navLinks = [
    { name: 'HOME', path: '/#home' },
    { name: 'ALL DOCTORS', path: '/#doctors' },
    { name: 'ABOUT', path: '/#about' },
    { name: 'CONTACT', path: '/#contact' },
  ];

  return (
    <nav className="w-full border-b border-gray-300 px-4 md:px-8 py-4 mb-5 text-sm bg-white">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">Medi<span className="text-primary">Queue</span></span>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                className="hover:text-primary transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Side / Hamburger */}
        <div className="flex items-center gap-4">
          <img
            src={assets.menu_icon}
            alt="Menu"
            onClick={() => setShowMenu(true)}
            className="w-6 cursor-pointer md:hidden"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-full h-full bg-white z-50 transition-transform duration-500 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
          <div className="cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
            <span className="text-2xl font-bold text-gray-800 tracking-tight">Medi<span className="text-primary">Queue</span></span>
          </div>
          <img
            src={assets.cross_icon}
            alt="Close Menu"
            onClick={() => setShowMenu(false)}
            className="w-7 cursor-pointer"
          />
        </div>

        <ul className="flex flex-col items-center gap-6 mt-10 text-lg font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                onClick={() => setShowMenu(false)}
                className="hover:text-primary"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
