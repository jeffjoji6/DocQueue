import React from "react";
import { Link } from 'react-router-dom';

const Timeslot = () => {
  return (
    <div className="w-full h-screen flex justify-center" id="bck">
      <div className="bg-slate-50 w-11/12 mt-12 rounded-md">
        <div className="w-4/12 h-4/6 shadow-xl mx-auto mt-24 flex flex-col items-center justify-center rounded-2xl hover:shadow-2xl">
          <h1 className="text-2xl  font-bold text-center">
            Choose your preferred Doctor and <br />
            Timeslot
          </h1>

          <hr
            style={{
              border: "none",
              borderTop: "4px solid black",
              width: "50%",
              margin: "20px auto",
            }}
          />
          <form className="space-y-6 pl-10 pt-5 text-md w-full ">
            <div className="text-center">
            <select name="doctors" id="doctors" className="w-3/4 h-[40px]">
  <option value="" disabled selected>Select your Doctor</option>
  <option value="dr_smith">Dr. John Smith</option>
  <option value="dr_jones">Dr. Sarah Jones</option>
  <option value="dr_brown">Dr. Michael Brown</option>
  <option value="dr_garcia">Dr. Emily Garcia</option>
  <option value="dr_lee">Dr. Daniel Lee</option>
</select>

<input type="datetime-local" id="timeslot" name="timeslot" className="w-3/4 h-[40px] mt-10" />
<div className='flex justify-center pt-24'>
    <Link to='/Confirmed'>
    
              <input type='submit' value='Book Your Appointment' className='border shadow-sm hover:bg-blue-400 font-semibold w-56 h-12 rounded-2xl' />
              </Link>
            </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Timeslot;
