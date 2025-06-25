import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true); // Set to false if not logged in

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ALL DOCTORS', path: '/doctors' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <nav className="w-full border-b border-gray-300 px-4 md:px-8 py-4 mb-5 text-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          src={assets.logo}
          alt="CareReserve Logo"
          className="w-36 md:w-40 cursor-pointer"
        />

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${isActive ? 'text-primary' : ''} hover:text-primary transition`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile / Create Account / Hamburger */}
        <div className="flex items-center gap-4">
          {token ? (
            <div className="relative group cursor-pointer">
              <div className="flex items-center gap-2">
                <img
                  src={assets.profile_pic}
                  alt="User profile"
                  className="w-8 h-8 rounded-full"
                />
                <img
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                  className="w-2.5"
                />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-md rounded hidden group-hover:block z-20 text-sm text-gray-700">
                <button
                  onClick={() => navigate('/my-profile')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => setToken(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="hidden md:block bg-primary text-white px-6 py-2 rounded-full"
            >
              Create Account
            </button>
          )}

          {/* Hamburger for mobile */}
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
        className={`fixed top-0 right-0 w-full h-full bg-white z-50 transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-300">
          <img src={assets.logo} alt="Logo" className="w-36" />
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
              <NavLink
                to={link.path}
                onClick={() => setShowMenu(false)}
                className="hover:text-primary"
              >
                {link.name}
              </NavLink>
            </li>
          ))}
          {!token && (
            <button
              onClick={() => {
                navigate('/login');
                setShowMenu(false);
              }}
              className="mt-4 bg-primary text-white px-6 py-2 rounded-full"
            >
              Create Account
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
