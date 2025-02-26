import React from 'react';
import homepic from '../assets/images/homepic.png';
import hospic from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full h-screen" id="bck">
      {/* Header Section */}
      <div className="grid grid-cols-3">
        <div className="col-span-2 m-14 mt-28">
          <p className="text-[45px] font-bold text-white">
            Simplify Your Appointments,<br />Enhance Your Care
          </p>
          <p className="text-white max-w-[450px] mt-6">
            Experience hassle-free scheduling with our app. Simplify your appointments and enjoy enhanced care by booking with ease. Prioritize your health effortlessly, ensuring timely and efficient medical consultations. Your path to better healthcare starts here.
          </p>
        </div>
        <div className="col-span-1">
          <img src={homepic} className="mt-16" alt="Home Illustration" />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-16 flex items-center ml-16">
        <Link to="/Hospitaldetails">
          <button className="rounded-2xl px-6 py-2 uppercase text-white bg-blue-500 hover:bg-white hover:text-black transition">
            Book An Appointment
          </button>
        </Link>
        <Link to="/timeslot">
          <button className="text-white rounded-2xl h-[40px] w-[162px] ml-10 uppercase bg-blue-500 hover:bg-white hover:text-black transition">
            Your Bookings
          </button>
        </Link>
        <input
          type="search"
          className="h-[40px] w-[300px] rounded-2xl ml-10 px-4 outline-none"
          placeholder="Search"
        />
      </div>

      {/* Hospital List Section */}
      <div className="ml-16 bg-white w-11/12 h-3/4 mt-9 rounded-2xl p-6">
        <h1 className="text-[35px] font-extrabold text-[#333333]">Chennai</h1>
        <hr className="border-t-2 border-gray-300 my-4" />
        
        <div className="grid grid-cols-4 gap-10 mt-8 ml-10">
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img src={hospic} className="w-full h-auto rounded-md" alt="Hospital" />
            <p className="text-[15px] font-bold mt-2">Sreenethra Eye Care, Trivandrum</p>
            <p className="text-[10px] text-gray-500">Multi-speciality Hospital</p>
            <Link to="/Hospitaldetails" className="text-[14px] font-bold text-blue-500 underline mt-2 block">
              Book An Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
