import React, {useEffect, useState}from 'react'
import Header from '../Navbars/Header'
import TaskCataGories from "./TaskCatagories"
import TaskList from './TaskList'
import Sidebar from '../Navbars/Sidebar'
import Progress from '../../Charts/Progress'
import TopEmployes from './TopEmployes'
import Graph from '../../Charts/Graph'
import { getLocalStorage } from '../Context/localStorage'
import AllTask from '../AdminDashboard/AllTask'

function Employe({ handleLogOut }) {
  const [logedUserData, setlogedUserData] = useState(localStorage.getItem("logedInUserData"));  
  const [AllUsers, setEmployees] = useState(getLocalStorage());
  const [employees, setemployees] = useState(AllUsers.employees)
  const [user, setuser] = useState(JSON.parse(logedUserData))
  const [curUser, setcurUser] = useState(employees.find(e=>e.email == user.email))
  const [userTasks, setuserTasks] = useState(curUser.tasks)
   //console.log(userTasks)
console.log(AllUsers)
console.log(curUser)

 useEffect(() => {
   
    ///return AllUsers.

  
 }, [logedUserData, AllUsers])
 
 

  //console.log(userData.tasks)
  return (
    <div id="container">
     
       <div className='h-screen w-full   grid grid-cols-12 grid-rows-12 place-content-center gap-5  pr-5 pb-5'>
       
       <Header handleLogOut={handleLogOut} userData={user}/>
    
       <Sidebar/>
       
        <TaskCataGories userData={user} />

        <Graph className={`col-start-7 col-span-4 row-start-8 row-span-full  shadow-2xl`}/>

        <Progress className={`col-start-11 col-span-2 row-start-8 row-span-full shadow-2xl`}/>
        <TaskList userData={userTasks}/>
        <TopEmployes AllUsers={AllUsers} className={`col-start-3 col-span-4 row-start-7 row-span-full shadow-2xl`}/>
        
       
        </div>
    </div>
  )
}

export default Employe