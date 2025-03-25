import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Navbar_white = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="p-5 w-[140px] md:w-[200px]" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/timeslot" className="text-gray-700 hover:text-blue-600 transition">
              Appointments
            </Link>
            <Link to="/aboutus" className="text-gray-700 hover:text-blue-600 transition">
              About us
            </Link>
            <Link to="/emergency" className="text-red-600 hover:text-red-700 transition animate-pulse">
              Emergency
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              <Link
                to="/timeslot"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Appointments
              </Link>
              <Link
                to="/aboutus"
                className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/emergency"
                className="block px-3 py-2 rounded-md text-red-600 hover:text-red-700 hover:bg-gray-50 transition animate-pulse"
                onClick={() => setIsMenuOpen(false)}
              >
                Emergency
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar_white;