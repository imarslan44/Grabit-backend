import React, { useEffect, useState } from 'react'

function TaskCataGories({userData}) {
  const [totalTaks, settotalTaks] = useState(".")

const btnClasses = `shadow-xl h-32 w-44 p-5 text-nowrap`


  return (
// Buttons TO select Task Catagory  
    <div className='flex  flex-wrap gap-3 items-center justify-center col-start-3  col-end-7  row-start-2 row-span-5  p-4 bg-white bg-opacity-60 rounded-xl shadow-2xl overflow-auto'>

      <h1 className='w-full px-6 text-2xl font-semibold'>Catagories</h1>

        <div className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> {totalTaks}</h2>
        <h3 className='text-2xl font-normal'>All </h3>
        </div>

        <div className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> 0</h2>
        <h3 className='text-2xl font-normal '>Accepted</h3>
        </div>

        <div className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> 0</h2>
        <h3 className='text-2xl font-normal'>High priority</h3>
        </div>

        <div id="active-t" className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> 0</h2>
        <h3 className='text-2xl font-normal '>New </h3>
        </div>

        <div className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> 0</h2>
        <h3 className='text-2xl font-normal'>Completed </h3>
        </div>

        <div className={` bg-white rounded-xl ${btnClasses} `}>
        <h2 className='text-4xl font-bold'> 0</h2>
        <h3 className='text-2xl font-normal'>Declined </h3>
        </div>

    </div>
  )
}

export default TaskCataGories