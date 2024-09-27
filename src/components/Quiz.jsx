import React from 'react';
import { Link } from 'react-router-dom';

const Quiz = () => {
  return (
    <div className='w-full h-screen flex justify-center' id='bck'>
      <div className='bg-slate-50 w-11/12 mt-12 rounded-md'>
        <div className='w-4/12 h-3/5 shadow-xl mx-auto mt-24 flex flex-col items-center justify-center rounded-2xl hover:shadow-2xl'>
          <h1 className='text-2xl  font-bold text-center'>
            What symptoms are you <br/>experiencing ?
          </h1>

          <hr
            style={{
              border: 'none',
              borderTop: '4px solid black',
              width: '50%',
              margin: '20px auto'
            }}
          />
          <form className='space-y-6 pl-10 pt-5 text-md w-full '>
            <div>
              <input type="checkbox" id="diarrhea" name="symptom" value="Diarrhea" />
              <label htmlFor="diarrhea" className='pl-2'>Diarrhea</label>
            </div>
            <div>
              <input type="checkbox" id="chestPain" name="symptom" value="Chest Pain" />
              <label htmlFor="chestPain" className='pl-2'>Chest Pain</label>
            </div>
            <div>
              <input type="checkbox" id="fever" name="symptom" value="Fever" />
              <label htmlFor="fever" className='pl-2'>Fever</label>
            </div>
            <div>
              <input type="checkbox" id="abdominalPain" name="symptom" value="Abdominal Pain" />
              <label htmlFor="abdominalPain" className='pl-2'>Abdominal Pain</label>
            </div>
            <div className='flex justify-center pt-11'>
            <Link to='/Timeslot'>
              <input type='submit' value='NEXT' className='border shadow-sm hover:bg-blue-400 font-semibold w-44 h-12 rounded-2xl' />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Quiz;