import React, { useEffect, useState } from 'react'
import { use } from 'react'

function Header(props) {
  
  const handleClick=(e)=>{
   props.handleLogOut()
  }

  return (
    <div className='flex justify-between items-end col-start-3 col-span-full row-span-1 bg-slate-200 bg-opacity-0'>

      <h1 className='text-5xl'>
        Hello <span className='font-semibold'>{props.userData.name?props.userData.name:""}</span> 👋
      </h1>
      <button className='px-3 p-2  rounded-sm text-2xl font-semibold hover:bg-[#8555c0] hover:text-white bg-[#6555c3] text-white'
      onClick={(e)=>handleClick(e)}
      >Log Out</button>
    </div>
  )
}

export default Header