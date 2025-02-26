import React from 'react';
import hos from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';

const Hospitaldetails = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100 py-10">
      <div className="bg-white w-11/12 rounded-lg shadow-lg p-8">
        {/* Hospital Header */}
        <div className="pl-10">
          <h1 className="text-3xl font-bold text-gray-800">Sreenethra Eye Care, Trivandrum</h1>
          <h4 className="text-gray-500 text-lg">Multi-speciality Hospital</h4>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-3 gap-10 mt-8">
          {/* Left Section: Hospital Image & Description */}
          <div className="col-span-2">
            <img 
              src={hos} 
              alt="Sreenethra Eye Care" 
              className="w-full h-[500px] rounded-lg shadow-md object-cover"
            />
            <p className="mt-6 text-gray-600 leading-relaxed max-w-[1000px]">
              Sreenethra group of hospitals is the foremost provider of eye care in South India. 
              Their newly launched referral center, South Asian Centre for Ophthalmic Care, 
              provides tertiary treatment options for complex eye conditions at affordable costs.
            </p>

            {/* Treatments & Top Doctors */}
            <div className="grid grid-cols-2 gap-6 pt-10">
              {/* Treatments Section */}
              <div>
                <h2 className="font-semibold text-xl text-gray-800 mb-2">Treatments Available</h2>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ophthalmology
                  </li>
                </ul>
              </div>

              {/* Doctors List */}
              <div>
                <h2 className="font-semibold text-xl text-gray-800 mb-2">Top Doctors</h2>
                <ul className="text-gray-600 space-y-2">
                  {[
                    "Dr. Ashad Sivaraman", "Dr. Mahadevan K", "Dr. Swapna Nair", 
                    "Dr. Anoop Sivaraman", "Dr. Harshali Yadav", 
                    "Dr. Anila George", "Dr. Pinki", "Dr. Aiswaria"
                  ].map((doctor, index) => (
                    <li key={index} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {doctor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section: Booking Card */}
          <div className="col-span-1 flex justify-center h-1/2">
            <div className="w-full max-w-sm bg-gray-50 p-6 rounded-lg shadow-lg text-center flex flex-col items-center">
              <h1 className="text-xl font-bold text-gray-800">
                Book your Appointment using our Smart Quiz
              </h1>
              <hr className="border-t-2 border-gray-300 w-2/3 my-4" />
              <p className="text-sm text-gray-600">
                Our Smart Quiz helps you book appointments based on your condition, 
                prioritizing urgent cases and ensuring efficient scheduling for all patients.
              </p>

              {/* Agreement Checkboxes */}
              <div className="pt-6 space-y-3 text-gray-600 text-sm w-full text-left">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Agree to our Terms and Conditions.
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Agree to share your quiz data with the respective hospital.
                </label>
              </div>

              {/* Booking Button */}
              <Link to="/Quiz" className="mt-20 w-full">
                <button className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                  Take the Quiz to Book Your Appointment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitaldetails;
