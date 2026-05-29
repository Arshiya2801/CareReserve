import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken } = useContext(AppContext);

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
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition`
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
                  className="w-10 h-10 rounded-full border-2 border-primary"
                />
                <img
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                  className="w-2.5"
                />
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-xl rounded-lg hidden group-hover:block z-20 text-sm text-gray-700 overflow-hidden border border-gray-100">
                <button
                  onClick={() => navigate('/my-profile')}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition"
                >
                  My Profile
                </button>
                <button
                  onClick={() => navigate('/my-appointments')}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition"
                >
                  My Appointments
                </button>
                <button
                  onClick={() => {
                    setToken(false);
                    localStorage.removeItem('token');
                  }}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 font-medium hover:text-primary px-4 py-2 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-primary to-secondary text-white font-medium px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all"
              >
                Sign Up
              </button>
            </div>
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
        className={`fixed top-0 right-0 w-full h-full bg-white z-50 transition-transform duration-500 ${
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
