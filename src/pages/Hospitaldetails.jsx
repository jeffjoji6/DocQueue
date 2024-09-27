import React from 'react';
import hos from '../assets/images/samplehos.png';
import { Link } from 'react-router-dom';


const Hospitaldetails = () => {
  return (
    <div className='w-full h-screen justify-center flex' id='bck'>
      <div className='bg-slate-50 w-11/12 mt-12 rounded-md'>
        <div className='pl-16'>
          <h1 className='text-2xl pt-10'>
            Bharathi Hospital, Tambaram
          </h1>
          <h4 className='text-slate-400'>
            Multi-speciality Hospital
          </h4>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-2'>
            <img src={hos} alt="Hospital" className='w-[800px] h-[500px] m-16 rounded-md shadow-lg' />
            <p className='ml-16 max-w-[800px]'>
              Lorem ipsum dolor sit amet consectetur. Tincidunt habitasse pretium purus in sed. Purus tempor sit nec lectus quis fermentum urna nulla. Learn More.
            </p>
            <div className='grid grid-cols-2 pt-10'>
  <div className='pl-16 '>
    <h1 className='font-semibold'>Treatments Available</h1>
    <ul className='list-none text-gray-500'>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Cardiology</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Orthopedics</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Neurology</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>General Surgery</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>ENT</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dermatology</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Ophthalmology</span></li>
     
    </ul>
  </div>
  <div className='pl-16 '>
    <h1 className='font-semibold'>Top Doctors</h1>
    <ul className='list-none text-gray-500'>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dr. John Smith</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dr. Sarah Jones</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dr. Michael Brown</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dr. Emily Garcia</span></li>
      <li className='flex items-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 mt-1"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className='pl-2'>Dr. Daniel Lee</span></li>
    </ul>
  </div>
</div>
          </div>
          <div className='col-span-1 '>
          <div className='w-10/12 h-4/6 shadow-xl mx-auto mt-16 flex flex-col items-center justify-center rounded-2xl hover:shadow-2xl bg-slate-50'>
              <h1 className='text-2xl  font-bold text-center'>
              Book your Appointment using  <br/>our Smart Quiz
              </h1>
             
    
              <hr
                style={{
                  border: 'none',
                  borderTop: '4px solid black',
                  width: '50%',
                  margin: '20px auto'
                }}
              />
              <div className='flex'>
              <svg className='pl-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
  <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" stroke-width="2"/>
  <circle cx="12" cy="8" r="1" fill="currentColor"/>
</svg>
              <p className='text-[10px] pl-2 text-gray-400'> Our Smart Quiz to book appointments based on your condition, prioritizing urgent cases to receive timely care and ensuring efficient scheduling for all patients.</p>
              </div>
              <div className='pt-12 text-gray-400 text-[14px] pl-2 space-y-5 '>
  <input type="checkbox" id="terms" />
  <label htmlFor="terms" className='pl-2'>Agree to our Terms and Conditions.</label>
  <br/>
  
  <input type="checkbox" id="share" />
  <label htmlFor="share" className='pl-2'>Agree to share your quiz data with the respective hospital.</label>
</div>
              <form className='space-y-6 pt-5 text-md w-full p-2 '>
             
                
               
                <div className='flex justify-center pt-20  '>
                <Link to='/Quiz'>
      <input 
        type='submit' 
        value='Take the quiz to 
Book Your Appointment' 
        className='border shadow-sm hover:bg-blue-400 font-semibold w-56 h-16 bg-blue-100  rounded-2xl' 
      />
    </Link>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hospitaldetails;