import React from 'react'

const TopEmployee = () => {
  return (
    <div className='col-start-6 col-span-4 bg-p1 row-span-6 p-3 rounded-lg'>
        <h2 className='mb-2 text-p2 text-xl font-medium'>Top Employees</h2>
        <div className='w-full h-10 border-gray-500 rounded-md border-2 text-xl overflow-hidden'>
            <input type="search" placeholder='Search' className='bg-black h-full w-[80%] outline-none '/>
        </div>
    </div>
  )
}

export default TopEmployee