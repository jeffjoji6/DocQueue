import React from 'react';
import hos from '../assets/images/samplehos.png';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

// Hospital data
const hospitals = {
  1: {
    name: "Sreenethra Eye Care, Trivandrum",
    type: "Multi-speciality Hospital",
    image: hos,
    description: "Sreenethra group of hospitals is the foremost provider of eye care in South India. Their newly launched referral center, South Asian Centre for Ophthalmic Care, provides tertiary treatment options for complex eye conditions at affordable costs.",
    treatments: ["Ophthalmology"],
    doctors: [
      "Dr. Ashad Sivaraman", "Dr. Mahadevan K", "Dr. Swapna Nair",
      "Dr. Anoop Sivaraman", "Dr. Harshali Yadav",
      "Dr. Anila George", "Dr. Pinki", "Dr. Aiswaria"
    ]
  },
  2: {
    name: "Aravind Eye Hospital, Madurai",
    type: "Speciality Eye Hospital",
    image: hos,
    description: "Aravind Eye Hospital is a world-renowned eye care institution known for its high-quality, affordable eye care services. It's one of the largest eye care providers in the world, serving millions of patients annually.",
    treatments: ["Cataract Surgery", "Retina Care", "Cornea Transplant"],
    doctors: [
      "Dr. G. Natchiar", "Dr. R.D. Thulasiraj", "Dr. R. Venkatesh",
      "Dr. P. Namperumalsamy", "Dr. R. Kim", "Dr. S. Haripriya"
    ]
  },
  3: {
    name: "Sankara Nethralaya, Chennai",
    type: "Super Speciality Eye Hospital",
    image: hos,
    description: "Sankara Nethralaya is a premier eye care institution in India, known for its excellence in eye care, research, and education. It's recognized globally for its advanced treatments and research in ophthalmology.",
    treatments: ["Retina Services", "Cornea Services", "Glaucoma Management"],
    doctors: [
      "Dr. S.S. Badrinath", "Dr. Lingam Vijaya", "Dr. Ronnie George",
      "Dr. Tarun Sharma", "Dr. Rajiv Raman", "Dr. S. Krishnakumar"
    ]
  }
};

const Hospitaldetails = () => {
  const { id } = useParams();
  const hospital = hospitals[id] || hospitals[1];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="flex-grow py-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hospital Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{hospital.name}</h1>
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              {hospital.type}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Hospital</h2>
                <p className="text-gray-600 leading-relaxed">
                  {hospital.description}
                </p>
              </div>

              {/* Treatments Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Treatments Available</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.treatments.map((treatment, index) => (
                    <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Doctors Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Expert Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hospital.doctors.map((doctor, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-gray-700">{doctor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Book Your Appointment</h2>
                  <p className="text-gray-600 text-sm">
                    Take our Smart Quiz to find the best treatment option for you
                  </p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-700">I agree to the Terms and Conditions</label>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-700">I agree to share my quiz data with the hospital</label>
                    </div>
                  </div>
                </div>

                <Link to="/Quiz" className="block w-full">
                  <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 transform hover:scale-[1.02]">
                    Start Smart Quiz
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hospitaldetails;
