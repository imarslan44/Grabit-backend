
import React, {useState}from 'react'
import Sidebar from '../sidebar/Sidebar'
import AdminDashboard from './Ad Dashboard'
const AdminPannel = () => {
 const [openNav, setOpenNav] = useState(false)
 const handleClick = ()=>{
  
 }
  return (
    <section className='w-full h-screen flex'>

    <Sidebar openNav={openNav} />
    <AdminDashboard openNav={openNav} setOpenNav={setOpenNav}/>
    </section>
  )
}

export default  AdminPannel