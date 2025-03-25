import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const HospitalList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const hospitals = [
    {
      id: 1,
      name: "Sreenethra Eye Care",
      type: "Multi-speciality Hospital",
      image: "https://img.freepik.com/free-photo/hospital-building-modern-parking-lot_1127-3478.jpg",
      location: "Chennai",
      specialties: ["Ophthalmology", "General Medicine"],
      waitTime: "15 mins",
      nextAvailable: "Today"
    },
    {
      id: 2,
      name: "Apollo Hospitals",
      type: "Multi-speciality Hospital",
      image: "https://img.freepik.com/free-photo/modern-hospital-building_1127-3482.jpg",
      location: "Chennai",
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
      waitTime: "30 mins",
      nextAvailable: "Today"
    },
    {
      id: 3,
      name: "City Care Hospital",
      type: "General Hospital",
      image: "https://img.freepik.com/free-photo/hospital-building-with-emergency-sign_1127-3480.jpg",
      location: "Chennai",
      specialties: ["General Medicine", "Pediatrics"],
      waitTime: "20 mins",
      nextAvailable: "Tomorrow"
    },
    {
      id: 4,
      name: "Dental Excellence",
      type: "Dental Clinic",
      image: "https://img.freepik.com/free-photo/medical-clinic-exterior_1127-3485.jpg",
      location: "Chennai",
      specialties: ["Dentistry", "Oral Surgery"],
      waitTime: "10 mins",
      nextAvailable: "Today"
    }
  ];

  // Get unique specialties for filter
  const allSpecialties = ['All', ...new Set(hospitals.flatMap(hospital => hospital.specialties))];

  // Filter hospitals based on search query and specialty
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialties.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      hospital.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter Section */}
          <div className="max-w-6xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Find Your Perfect Hospital
            </h1>
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-14 px-6 rounded-full border-2 border-gray-200 
                             focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Search by hospital name, type, or location..."
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
                {/* Specialty Filter */}
                <div className="relative">
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full h-14 px-6 rounded-full border-2 border-gray-200 
                             focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 
                             transition-all appearance-none bg-white"
                  >
                    {allSpecialties.map(specialty => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                  <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hospitals Grid */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map(hospital => (
                <div key={hospital.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl 
                           transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img src={hospital.image} className="w-full h-48 object-cover" alt={hospital.name} />
                    <div className="absolute bottom-4 left-4 bg-green-500 px-3 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Wait: {hospital.waitTime}
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
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">Next Available</span>
                      <span className="text-sm font-medium text-green-600">{hospital.nextAvailable}</span>
                    </div>
                    <Link to={`/hospitaldetails/${hospital.id}`}>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg 
                                     hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                        <span>Book Appointment</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredHospitals.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                  <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Hospitals Found</h3>
                  <p className="text-gray-600">
                    We couldn't find any hospitals matching your search criteria. 
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HospitalList; 