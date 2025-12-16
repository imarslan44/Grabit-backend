import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
function TopEmployes({AllUsers, className}) {
const [employees, setemployees] = useState(AllUsers.employees)

  const data = useContext(AuthContext)
  
  useEffect(() => {
    setemployees(data.employees)
  }, [data])
  
 
  return (
    <div className={`p-8 bg-white  backdrop-blur-sm rounded-xl w-full h-full ${className}`}>
      <h1 className='text-2xl font-bold'>
      Top Employees</h1>
    <div>
      {employees.map((e, idx)=>{
        return <div key={idx} className="flex justify-between items-center my-4 bg-[#8655c500] p-2  border-b-2 border-black border-opacity-10">

          <div className='flex items-center w-[35%] font-bold text-xl '>
          <img src={e.img} className="w-14 h-14  mr-3 rounded-full"/>
          <h2 className='text-xl font-light'>{e.name}</h2>
          </div>
          <h3 className='w-2/6 text-lg font-thin text-gray-600'>{e.profession}</h3>
          <h4 className='font-semibold text-gray-700'>{e.tasks.length} Tasks</h4>
          <span className='text-green-600 font-semibold'>{"59-"}Pts</span>
        </div>
      })}
    </div>
    
    </div>
  )
}

export default TopEmployes