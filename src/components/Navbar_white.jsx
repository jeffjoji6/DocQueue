import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import logo from '../assets/images/logo.png'; // Import the logo

const Navbar_white = () => {
  return (
    <div className='w-screen h-[80px] sticky top-0 left-0 shadow-sm z-50 bg-white'>
      <div className='flex'>
        <Link to='/'>
          <img src={logo} alt='logo' className='p-5 ml-9 w-[200px]'></img>
        </Link >
        <Link to='/timeslot' ><button className='header pt-[26px]'>Appointments</button></Link>
        
        <Link to='/aboutus' ><button className='header pt-[26px]'>About us</button></Link>
        <Link to='/emergency' ><button className='header pt-[26px] animate-pulse text-red-600'>Emergency</button></Link>
        
      </div>
    </div>
  );
}

export default Navbar_white;