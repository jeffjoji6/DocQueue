import React, { useState } from 'react';
import homepic from '../assets/images/homepic.png';
import hospic from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';
import Chatbot from "../components/Chatbot";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const hospitals = [
    {
      id: 1,
      name: "Sreenethra Eye Care",
      type: "Multi-speciality Hospital",
      image: hospic,
      rating: 4.8,
      reviews: 128,
      location: "Chennai",
      specialties: ["Ophthalmology", "General Medicine"]
    },
    // Add more hospitals here
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-5 pattern-grid-lg"></div>
        <div className="container mx-auto px-4 pt-20 md:pt-24 pb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Health, <br />
                <span className="text-blue-600">Our Priority</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Experience seamless healthcare scheduling with DocQueue. Book appointments, manage your visits, and prioritize your well-being with just a few clicks.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/Hospitaldetails">
                  <button className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Book Appointment
                  </button>
                </Link>
                <Link to="/emergency">
                  <button className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-pulse">
                    Emergency Care
                  </button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative flex justify-center lg:justify-end">
              <div className="absolute inset-0 bg-blue-200 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
              <img 
                src={homepic} 
                alt="Healthcare Illustration" 
                className="relative z-10 w-[90%] lg:w-[95%] h-auto transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Quick Actions */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full lg:col-span-1">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 px-6 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="Search hospitals, doctors..."
                />
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            <Link to="/timeslot" className="group">
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-all cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Appointments</h3>
                <p className="text-blue-600">View and manage your bookings →</p>
              </div>
            </Link>
            <Link to="/Aboutus" className="group">
              <div className="bg-blue-50 rounded-xl p-6 hover:bg-blue-100 transition-all cursor-pointer">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">About DocQueue</h3>
                <p className="text-blue-600">Learn more about our services →</p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Hospitals */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Hospitals</h2>
          <Link to="/Hospitaldetails" className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hospitals.map(hospital => (
            <div key={hospital.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img src={hospital.image} className="w-full h-48 object-cover" alt={hospital.name} />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-blue-600">
                  ★ {hospital.rating}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{hospital.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{hospital.type}</p>
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600 text-sm">{hospital.location}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {hospital.specialties.map((specialty, index) => (
                    <span key={index} className="bg-blue-50 text-blue-600 text-xs px-3 py-1 rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
                <Link to="/Hospitaldetails">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose DocQueue?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick Booking</h3>
            <p className="text-gray-600">Book appointments instantly with our efficient scheduling system</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Platform</h3>
            <p className="text-gray-600">Your health data is protected with top-tier security measures</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient Care</h3>
            <p className="text-gray-600">24/7 support and emergency services when you need them most</p>
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />

      {/* Add this style for the blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: scale(1) translate(0, 0); }
          33% { transform: scale(1.1) translate(20px, -20px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0, 0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .pattern-grid-lg {
          background-image: linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(to right, currentColor 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}

export default Home;
