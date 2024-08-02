import React from 'react';
import homepic from '../assets/images/homepic.png';

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
    </div>
    
  );
}

export default Home;