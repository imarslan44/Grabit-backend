import React, {useState} from 'react'
import Header from '../Navbars/Header'
import CreateTask from './CreateTask'
import AllTask from './AllTask'
import Sidebar from '../Navbars/Sidebar'
import Graph from '../../Charts/Graph'
import Progress from '../../Charts/Progress'
import TopEmployes from '../EmplyeDashboard/TopEmployes'
import { getLocalStorage } from '../Context/localStorage'
function Admin({handleLogOut}) {
  const [Data, setData] = useState(localStorage.getItem("logedInUserData"));
   const [User, setUser] = useState(JSON.parse(Data))
   const [AllUsers, setEmployees] = useState(getLocalStorage());
  return (
    <div id="container" className=''>
        <div className="wrapper  grid grid-cols-12 grid-rows-12 gap-5 pr-5 pb-3">
        <Header userData={User} handleLogOut={handleLogOut}/>
       <Sidebar/>
       <Progress className={`col-start-3 col-span-2 row-start-2 row-span-6 shadow-2xl`}/>
       <Graph className={`col-start-5 col-span-5 row-start-2 row-span-6 shadow-2xl`}/>
       <CreateTask/>
       <AllTask/>
       <TopEmployes AllUsers={AllUsers} className={` col-strat-4 col-span-4  row-start-8 row-span-5 shadow-2xl`}/>

       
    


     
        </div>
    </div>
  )
}

export default Admin