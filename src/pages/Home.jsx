import React from 'react';
import homepic from '../assets/images/homepic.png';
import hospic from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';
import Chatbot from "../components/Chatbot";

const Home = () => {
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Simplify Your Appointments,<br />Enhance Your Care
            </h1>
            <p className="text-gray-600 text-sm md:text-base max-w-lg mx-auto md:mx-0 mb-8">
              Experience hassle-free scheduling with our app. Simplify your appointments and enjoy enhanced care by booking with ease. Prioritize your health effortlessly, ensuring timely and efficient medical consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/Hospitaldetails">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Book An Appointment
                </button>
              </Link>
              <Link to="/timeslot">
                <button className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Your Bookings
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src={homepic} 
              alt="Healthcare Illustration" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 mb-8">
        <div className="max-w-2xl mx-auto">
          <input
            type="search"
            className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Search hospitals, doctors, or services..."
          />
        </div>
      </div>

      {/* Hospitals Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Hospitals in Chennai</h2>
          <hr className="border-gray-200 mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Hospital Card */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <img src={hospic} className="w-full h-48 object-cover" alt="Hospital" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">Sreenethra Eye Care</h3>
                <p className="text-sm text-gray-500 mb-3">Multi-speciality Hospital</p>
                <Link 
                  to="/Hospitaldetails" 
                  className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                >
                  Book An Appointment →
                </Link>
              </div>
            </div>
            {/* Add more hospital cards as needed */}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default Home;
