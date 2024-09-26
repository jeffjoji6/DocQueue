import React from 'react'

const Quiz = () => {
  return (
    <div className='w-full h-screen justify-center flex' id='bck'>
    <div className=' bg-slate-50  w-11/12 mt-12 rounded-md '>
    <div className='w-1/3 h-2/4 shadow-2xl mx-[500px] mt-32  items-center justify-center rounded-xl'>
    <h1 className='text-[24px] pt-6  flex  justify-center  font-bold'>
  What symptoms are you experiencing
</h1>
<hr style={{ border: 'none', borderTop: '2px solid black', width: '50%', margin: '20px auto' }}></hr>
<div className='space-y-6 pl-4 text-md'>
<input type="checkbox" id="vehicle1" name="Diarrhea" value="Diarrhea"/>
<label for="Diarrhea">Diarrhea</label><br/>
<input type="checkbox" id="vehicle1" name="Diarrhea" value="Diarrhea"/>
<label for="Diarrhea">Chest Pain</label><br/>
<input type="checkbox" id="vehicle1" name="Diarrhea" value="Diarrhea"/>
<label for="Diarrhea">Fever</label><br/>

<input type="checkbox" id="vehicle1" name="Diarrhea" value="Diarrhea"/>
<label for="Diarrhea">Abdominal Pain</label><br/>
    </div>
    <div className='flex justify-center pt-11'>
        
        <input type='submit' value='NEXT' className='border shadow-sm hover:bg-slate-400 font-semibold w-44 h-12 bg-blue-400 rounded-xl'/>
        </div>
    </div>
        
    
  
    </div>
    </div>
  )
}

export default Quiz