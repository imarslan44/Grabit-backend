import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import "./output.css"
import "./index.css"
import Employe from './components/EmplyeDashboard/Employe'
import Admin from './components/AdminDashboard/Admin'
import { getLocalStorage, setLocalStorage } from './components/Context/localStorage'
import { use } from 'react'
import { useContext } from 'react'
import {AuthContext} from './components/Context/AuthContext'





function App() {
  
  useEffect(() => {
    const isData = getLocalStorage()
    console.log(isData.employees)
    if(!isData.employees){
    setLocalStorage()
    }
  },[])
  
const [userRole, setUserRole] = useState(null)
const [logedInUserData, setlogedInUserData] 
= useState(null)
const data = useContext(AuthContext)



 
 async function handleLogin(email, password){

  const employees =  await data.employees
  const admins =  await data.admins

  
  const employee =  employees.find(e => e.email === email && e.password === password)
  
  const admin = admins.find(e => e.email === email && e.password === password)
  if(employee){

    setlogedInUserData(employee)
    setUserRole("employee")
    localStorage.setItem("user","employee")
    localStorage.setItem("logedInUserData", JSON.stringify(employee))
    
  }else if(admin){
    setlogedInUserData(admin)
    localStorage.setItem("user","admin")
    localStorage.setItem("logedInUserData",JSON.stringify(admin))
    setUserRole("admin")
  }
  
 }


 const curUser = localStorage.getItem("user")
 const curUserData = localStorage.getItem("logedInUserData")
 
 useEffect(() => {
  if(curUser){
    setUserRole(curUser)
   }
   },[curUser])
 


   
  function handleLogOut(){
    setUserRole(null)
    
  }

 
  return (
    <div className='wrapper'>
    {!userRole && <Login handleLogin={handleLogin}/>}
   
    {userRole==="admin" && <Admin handleLogOut={handleLogOut}/>}
    {userRole==="employee" && <Employe handleLogOut={handleLogOut}/>}
     
    
       
    </div>
  )
}

export default App
