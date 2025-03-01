import React from "react";

const AboutUs = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 p-10">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-blue-600">About DocQueue</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Revolutionizing healthcare scheduling with AI-powered efficiency.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white shadow-lg rounded-lg p-8 mt-10 w-full max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
        <p className="text-gray-600 mt-4 text-md">
          At <span className="text-blue-600 font-semibold">DocQueue</span>, we strive to enhance patient experience and optimize doctor availability through real-time, AI-driven scheduling. Our goal is to reduce waiting times, streamline medical resource allocation, and make healthcare more accessible for everyone.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">⏳ Dynamic Scheduling</h3>
          <p className="text-gray-600 mt-2">
            AI-driven scheduling system ensuring optimal doctor allocation based on real-time data.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">⚙️ Advanced Algorithms</h3>
          <p className="text-gray-600 mt-2">
            Utilizing Integer Linear Programming (ILP) & Genetic Algorithms (GA) for priority-based scheduling.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">📊 Real-Time Updates</h3>
          <p className="text-gray-600 mt-2">
            Seamless integration with real-time data tracking for effective resource management.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold text-gray-800">🌍 Accessible Anywhere</h3>
          <p className="text-gray-600 mt-2">
            Cloud-based system ensuring 24/7 access to appointments and doctor availability.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-10 text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Join Us in Transforming Healthcare</h2>
        <p className="text-gray-600 mt-4">
          Experience seamless scheduling and optimized doctor appointments. Get started today!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
