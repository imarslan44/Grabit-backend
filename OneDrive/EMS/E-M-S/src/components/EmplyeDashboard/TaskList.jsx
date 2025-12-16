import { random } from 'lodash'
import React, { useState } from 'react'

function TaskList(props) {
const date = props.userData.map((e)=>{
  if(e.date){
 return e.date.split("-").reverse().join("/")
  }
})

const key = crypto.randomUUID();
  

  return (
    <div className='col-start-7 col-span-full row-start-2 row-span-6 bg-white bg-opacity-70 rounded-xl  relative shadow-md'>

    <div  id="taskList" className=' pt-14 pb-10 pl-10 pr-10  flex gap-5 overflow-x-auto overflow-y-hidden items-end justify-start  h-full'>

   <h1 className='absolute top-3 left-12 font-bold text-3xl'>Tasks</h1>


    {props.userData.map((e,idx)=>{

 return <div key={idx} className=" shrink-0  h-full w-[320px] bg-[#ffffff] rounded-md p-8 relative flex flex-col justify-between shadow-2xl shadow-gray-300">

  <div>
 <div className='flex justify-between'>
 <h3 className='bg-[#7555c3] py-1 px-3 text-lg rounded-sm font-extralight tracking-wide   text-white'>High</h3>
 <h4 className=' py-1 px-3 text-xl font-sans'>{date[idx] || "12/3/2025"}</h4>
 </div>
 <h1 className='py-2 text-2xl font-mono font-bold'>{e.title}</h1>
 <p className='text-xl text-slate-500  h-30 line-clamp-4' >{e.description}</p>

</div>

<div className='flex justify-between  gap-2 '>
<button className='flex-1 p-2 rounded-[5px]  text-xl text-black  text-center border-2 border-slate-500 '>Decline</button>
 <button className='flex-1 p-2 rounded-[5px] text-xl text-white  text-center bg-[#7555c3]'>Accept</button>
 </div>

</div>

    })}
       
        
       </div>   
    </div>
  )
}

export default TaskList