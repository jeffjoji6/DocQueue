import React from 'react'
import { Link } from 'react-router-dom';

const Confirmationpop = () => {
  return (
    
        <div className='w-full h-screen flex justify-center' id='bck'>
          
            <div className='w-4/12 h-3/5 shadow-xl mx-auto mt-24 flex flex-col items-center justify-center rounded-2xl hover:shadow-2xl bg-slate-50'>
              <h1 className='text-2xl  font-bold text-center'>
              Congratulation Your booking has <br/>been confirmed
              </h1>
    
              <hr
                style={{
                  border: 'none',
                  borderTop: '4px solid black',
                  width: '50%',
                  margin: '20px auto'
                }}
              />
              <form className='space-y-6 pt-5 text-md w-full p-2 '>
               <div className='justify-center items-center flex'>
                <img src='https://img.icons8.com/ios/452/checked.png' className='w-40 h-40'></img>
               </div>
                <div className='text-center p-x-3'>
                    <p className='text-gray-400 font-thin text-[10px]'>You will be recieving a mail on your date of appointment telling your exact timing of your appointment.</p>
                </div>
               
                <div className='flex justify-center '>
                <Link to='/'>
      <input 
        type='submit' 
        value='GO TO HOME' 
        className='border shadow-sm hover:bg-blue-400 font-semibold w-44 h-12 rounded-2xl' 
      />
    </Link>
                </div>
              </form>
            </div>
          </div>
        
      );
  
}

export default Confirmationpop