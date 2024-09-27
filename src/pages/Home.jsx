import React from 'react';
import homepic from '../assets/images/homepic.png';
import hospic from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
  <div className=' w-full h-screen' id='bck' >
    <div className='grid grid-cols-3'>
      <div className='col-span-2 m-14 mt-28'>
        <p className='text-[45px] font-bold text-white'>Simplify Your Appointments,<br/>Enhance Your Care</p>
        <p className='text-white max-w-[450px] mt-6'>Experience hassle-free scheduling with our app. Simplify your appointments and enjoy enhanced care by booking with ease. Prioritize your health effortlessly, ensuring timely and efficient medical consultations. Your path to better healthcare starts here.</p>
      </div>
      <div className='col-span-1'>
        <img src={homepic} className='mt-16'></img>
      </div>

    </div>
    <div className='mt-16'>
      
    <Link to="/Hospitaldetails" className='rounded-2xl  ml-16 uppercase text-white hover:text-black'>
      Book An Appointment
    </Link>
    
    <button className=' text-white rounded-2xl h-[40px] w-[162px] ml-10 uppercase hover:text-black'>Your Bookings</button>
    <input type='search' className='h-[40px] w-[300px] rounded-2xl ml-10' placeholder=' Search'></input>
    </div>
    <div className='ml-16 bg-white w-11/12 h-3/4 mt-9 rounded-2xl'>
    <h1 className='text-[35px] font-extrabold p-6 text-[#333333]'>Chennai</h1>
    <hr class="border-t-2 border-gray-300 mx-6"></hr>
    <div className='grid grid-cols-4 mt-8 ml-28 '>
      <div>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div className='mt-10'>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div className='mt-10'>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div className='mt-10'>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>
      <div className='mt-10'>
        <img src={hospic} className='w-250 h-200'></img>
        <p className='text-[15px] bold'>Bharathi Hospital, Tambaram</p>
        <p className='text-[10px] text-gray-400 bold'>Multi-speciality Hospital</p>
        <button className='text-[11px] bold text-blue-500 underline'>Book your appointment</button>
      </div>

    </div>
    </div>
    </div>
  );
}

export default Home;