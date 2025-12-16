import React from 'react'
import Button from '../Button'
import BarChart from '../BarCHart'
import CreateTask from './createTask'
import TopEmployee from '../TopEmployee'


const AdminDashboard = ({openNav, setOpenNav}) => {
  
  return (
    <section className='w-full h-screen  bg-blue-50 grid grid-cols-12 grid-rows-12 p-3 pt-0 gap-2 '>
    
    <nav className='col-span-full items-center bg-p1 flex justify-between pr-5'>
      <h1 className='text-3xl font-medium text-p2'>Hello Arslan 👋</h1>
      <Button content="Logout" classes={"px-3 h-10 "} onclick={()=>setOpenNav((prev)=>!prev)}>
        
    </Button>
    </nav>
    <BarChart/> 
    <TopEmployee/>
    <CreateTask/>
  

    </section>


  )
}

export default AdminDashboard