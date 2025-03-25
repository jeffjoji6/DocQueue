import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Footer from '../components/Footer';

const Hospitaldetails = () => {
  const { id } = useParams();

  // Hospital data - in a real app, this would come from an API
  const hospitals = {
    1: {
      name: "Sreenethra Eye Care",
      type: "Multi-speciality Hospital",
      image: "https://img.freepik.com/free-photo/hospital-building-modern-parking-lot_1127-3478.jpg",
      location: "Chennai",
      specialties: ["Ophthalmology", "General Medicine"],
      waitTime: "15 mins",
      nextAvailable: "Today",
      description: "Sreenethra Eye Care is a state-of-the-art facility specializing in comprehensive eye care services. With cutting-edge technology and experienced specialists, we provide world-class treatment for all eye-related conditions.",
      treatments: [
        "Cataract Surgery",
        "Glaucoma Treatment",
        "Retinal Disorders",
        "Corneal Transplantation",
        "Pediatric Ophthalmology",
        "Laser Vision Correction"
      ],
      doctors: [
        { name: "Dr. Ashad Sivaraman", specialty: "Ophthalmologist", experience: "15 years" },
        { name: "Dr. Mahadevan K", specialty: "Retina Specialist", experience: "12 years" },
        { name: "Dr. Swapna Nair", specialty: "Pediatric Ophthalmologist", experience: "10 years" },
        { name: "Dr. Anoop Sivaraman", specialty: "Cornea Specialist", experience: "8 years" },
        { name: "Dr. Harshali Yadav", specialty: "Glaucoma Specialist", experience: "11 years" },
        { name: "Dr. Anila George", specialty: "Oculoplastic Surgeon", experience: "9 years" }
      ],
      facilities: [
        "24/7 Emergency Care",
        "Modern Operation Theaters",
        "Advanced Diagnostic Equipment",
        "Pharmacy",
        "Cafeteria",
        "Parking Facility"
      ],
      timings: {
        weekdays: "8:00 AM - 8:00 PM",
        weekends: "9:00 AM - 6:00 PM",
        emergency: "24/7"
      }
    },
    2: {
      name: "Apollo Hospitals",
      type: "Multi-speciality Hospital",
      image: "https://img.freepik.com/free-photo/modern-hospital-building_1127-3482.jpg",
      location: "Chennai",
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
      waitTime: "30 mins",
      nextAvailable: "Today",
      description: "Apollo Hospitals is a leading healthcare provider offering comprehensive medical services across multiple specialties. Our state-of-the-art facilities and expert medical professionals ensure the highest quality of patient care.",
      treatments: [
        "Cardiac Surgery",
        "Brain Surgery",
        "Joint Replacement",
        "Cancer Treatment",
        "Organ Transplantation",
        "Emergency Care"
      ],
      doctors: [
        { name: "Dr. Rajesh Kumar", specialty: "Cardiologist", experience: "20 years" },
        { name: "Dr. Priya Sharma", specialty: "Neurologist", experience: "15 years" },
        { name: "Dr. Amit Patel", specialty: "Orthopedic Surgeon", experience: "18 years" },
        { name: "Dr. Sangeeta Reddy", specialty: "Oncologist", experience: "16 years" },
        { name: "Dr. Vikram Singh", specialty: "Transplant Surgeon", experience: "14 years" }
      ],
      facilities: [
        "Advanced Cardiac Care Unit",
        "Neurosurgery Center",
        "Orthopedic Center",
        "Cancer Center",
        "Transplant Unit",
        "Emergency Department"
      ],
      timings: {
        weekdays: "24/7",
        weekends: "24/7",
        emergency: "24/7"
      }
    },
    3: {
      name: "City Care Hospital",
      type: "General Hospital",
      image: "https://img.freepik.com/free-photo/hospital-building-with-emergency-sign_1127-3480.jpg",
      location: "Chennai",
      specialties: ["General Medicine", "Pediatrics"],
      waitTime: "20 mins",
      nextAvailable: "Tomorrow",
      description: "City Care Hospital provides comprehensive healthcare services with a focus on general medicine and pediatrics. Our patient-centered approach ensures personalized care for every individual.",
      treatments: [
        "General Medicine",
        "Pediatric Care",
        "Internal Medicine",
        "Family Medicine",
        "Preventive Healthcare",
        "Vaccination Services"
      ],
      doctors: [
        { name: "Dr. Ravi Kumar", specialty: "General Physician", experience: "12 years" },
        { name: "Dr. Meena Sharma", specialty: "Pediatrician", experience: "15 years" },
        { name: "Dr. Arun Patel", specialty: "Internal Medicine", experience: "10 years" },
        { name: "Dr. Priya Gupta", specialty: "Family Medicine", experience: "8 years" }
      ],
      facilities: [
        "General Wards",
        "Pediatric Ward",
        "Laboratory",
        "Pharmacy",
        "Cafeteria",
        "Parking"
      ],
      timings: {
        weekdays: "8:00 AM - 8:00 PM",
        weekends: "9:00 AM - 6:00 PM",
        emergency: "24/7"
      }
    },
    4: {
      name: "Dental Excellence",
      type: "Dental Clinic",
      image: "https://img.freepik.com/free-photo/medical-clinic-exterior_1127-3485.jpg",
      location: "Chennai",
      specialties: ["Dentistry", "Oral Surgery"],
      waitTime: "10 mins",
      nextAvailable: "Today",
      description: "Dental Excellence is a modern dental clinic offering comprehensive oral healthcare services. Our team of experienced dentists provides personalized care using the latest dental technology.",
      treatments: [
        "General Dentistry",
        "Cosmetic Dentistry",
        "Orthodontics",
        "Oral Surgery",
        "Root Canal Treatment",
        "Dental Implants"
      ],
      doctors: [
        { name: "Dr. Sanjay Verma", specialty: "General Dentist", experience: "15 years" },
        { name: "Dr. Neha Sharma", specialty: "Orthodontist", experience: "12 years" },
        { name: "Dr. Rajesh Kumar", specialty: "Oral Surgeon", experience: "18 years" },
        { name: "Dr. Priya Patel", specialty: "Cosmetic Dentist", experience: "10 years" }
      ],
      facilities: [
        "Digital X-ray",
        "Dental Laboratory",
        "Sterilization Unit",
        "Comfortable Waiting Area",
        "Parking",
        "Wheelchair Access"
      ],
      timings: {
        weekdays: "9:00 AM - 8:00 PM",
        weekends: "10:00 AM - 6:00 PM",
        emergency: "24/7"
      }
    }
  };

  const hospital = hospitals[id] || hospitals[1]; // Fallback to first hospital if ID not found

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-100 py-10">
        <div className="bg-white w-11/12 mx-auto rounded-lg shadow-lg p-8">
          {/* Hospital Header */}
          <div className="pl-10">
            <h1 className="text-3xl font-bold text-gray-800">{hospital.name}</h1>
            <h4 className="text-gray-500 text-lg">{hospital.type}</h4>
            <div className="flex items-center gap-4 mt-2">
              <span className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {hospital.location}
              </span>
              <span className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Wait: {hospital.waitTime}
              </span>
            </div>
          </div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-3 gap-10 mt-8">
            {/* Left Section: Hospital Image & Description */}
            <div className="col-span-2">
              <img 
                src={hospital.image} 
                alt={hospital.name} 
                className="w-full h-[500px] rounded-lg shadow-md object-cover"
              />
              <p className="mt-6 text-gray-600 leading-relaxed max-w-[1000px]">
                {hospital.description}
              </p>

              {/* Treatments & Doctors */}
              <div className="grid grid-cols-2 gap-6 pt-10">
                {/* Treatments Section */}
                <div>
                  <h2 className="font-semibold text-xl text-gray-800 mb-4">Treatments Available</h2>
                  <ul className="text-gray-600 space-y-2">
                    {hospital.treatments.map((treatment, index) => (
                      <li key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2 text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {treatment}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Doctors List */}
                <div>
                  <h2 className="font-semibold text-xl text-gray-800 mb-4">Our Doctors</h2>
                  <ul className="text-gray-600 space-y-2">
                    {hospital.doctors.map((doctor, index) => (
                      <li key={index} className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4 mr-2 text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <div>
                          <div className="font-medium">{doctor.name}</div>
                          <div className="text-sm text-gray-500">{doctor.specialty} • {doctor.experience}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Facilities Section */}
              <div className="mt-10">
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hospital.facilities.map((facility, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{facility}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timings Section */}
              <div className="mt-10">
                <h2 className="font-semibold text-xl text-gray-800 mb-4">Timings</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Weekdays</h3>
                    <p className="text-gray-600">{hospital.timings.weekdays}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Weekends</h3>
                    <p className="text-gray-600">{hospital.timings.weekends}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Emergency</h3>
                    <p className="text-gray-600">{hospital.timings.emergency}</p>
                  </div>
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
      <Footer />
    </div>
  );
};

export default Hospitaldetails;
