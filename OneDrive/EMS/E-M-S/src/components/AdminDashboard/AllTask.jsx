import React from 'react'

function AllTask() {

    const taskClasses = `rounded-lg flex justify-between text-xl my-3 bg-opacity-20 p-6`
  return (
    <div className='divs w-full rounded-lg p-6 overflow-y-auto row-start-8 row-span-full col-start-3 col-span-3 shadow-2xl'>

    <div className={`w-full  bg-rose-500 ${taskClasses}`}>
        <h2>Arslan</h2>
        <h3>Make a UI Design</h3>
        <h4>Status</h4>
    </div>
    <div className={`w-full  bg-green-500 ${taskClasses}`}>
        <h2>Arslan</h2>
        <h3>Make a UI Design</h3>
        <h4>Status</h4>
    </div>
    <div className={`w-full  bg-yellow-500 ${taskClasses}`}>
        <h2>Arslan</h2>
        <h3>Make a UI Design</h3>
        <h4>Status</h4>
    </div>
    <div className={`w-full  bg-rose-500 ${taskClasses}`}>
        <h2>Arslan</h2>
        <h3>Make a UI Design</h3>
        <h4>Status</h4>
    </div>
    <div className={`w-full  bg-green-500 ${taskClasses}`}>
        <h2>Arslan</h2>
        <h3>Make a UI Design</h3>
        <h4>Status</h4>
    </div>
    
 
    </div>
  )
}

export default AllTask