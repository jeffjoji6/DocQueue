import React from 'react'
import logo from '../assets/images/logo.png'


const Navbar_white = () => {
  return (
    <div className='w-screen h-[80px]'>
      <div className='flex'>
        <img src={logo} alt='logo' className='p-5 ml-9 w-[200px]'></img>
        <button class='header'>Appointments</button>
        <button class='header'>About us</button>
        <button class='header'>Help</button>

      </div>
    </div>
  )
}

export default Navbar_white