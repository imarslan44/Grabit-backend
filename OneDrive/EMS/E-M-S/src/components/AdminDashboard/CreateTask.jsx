import React, {useState} from 'react'
import { getLocalStorage, setLocalStorage } from '../Context/localStorage';

function CreateTask() {

    const [users, setusers] = useState(getLocalStorage())
    const [employees, setemployees] = useState(users.employees)
const [inputVals, setinputVals] = useState({title:"",
   date: "",
   employeeName: "",
   catagory: "",
   description: ""
   
});




const handleChange = (e) => {
   
   const { name, value } = e.target;
   setinputVals((prevTask) => ({
     ...prevTask,
     [name]: value,
   }));
   
 };

 const SubmitForm = (e)=>{
   // e.preventDefault()

   const isValidName = employees.some(e => e.name === inputVals.employeeName);
   
   if(isValidName){
      const selectedEmployee =
     employees.find(e=>e.name === inputVals.employeeName);
   selectedEmployee.tasks.push(inputVals)
   localStorage.setItem("employees", JSON.stringify(users.employees))

   setinputVals((inputVal) => {
     const resetVals = {};
     Object.keys(inputVal).forEach(key => resetVals[key] = "");
     return resetVals;
   })
   

   }else{
      e.preventDefault()
      alert("invalid name")
   }
 }


  return (
    <form className='flex flex-col  h-full   rounded-lg overflow-hidden col-start-10 col-span-full row-start-2 row-span-full bg-white shadow-2xl'> 

    <div className='divs '>
         <div className='out-boxes'>
            <h3>Task Title</h3>
            <input type="text" placeholder='Make a UI design' 
            name="title"className=''
            value={inputVals.title}
            onChange={handleChange}/>
         </div>
        
         <div className='out-boxes'>
            <h3>Date</h3>
            <input type="Date"
             name='date'
            value={inputVals.date}
            onChange={handleChange}/>
          </div>
         <div className='out-boxes'>
            <h3>Asign to</h3>
            <input type="text" placeholder='eployee name'
             name='employeeName'
             value={inputVals.employeeName}
             onChange={handleChange}
            />
         </div>
         <div className='out-boxes'>
            <h3>Catagory</h3>
            <input type="text" placeholder='design, dev, etc.'
             name='catagory'
             value={inputVals.catagory}
             onChange={handleChange}
            />
         </div>
    </div>

      
      <div className='w-full flex justify-between gap-2 text-black px-10 my-2'>
      <button className='flex-1 p-2  border-2 border-gray-400 text-xl selected-priority rounded-md'>Normal</button>
      <button className='flex-1  p-2  rounded-md border-2 border-gray-400 text-xl'>High</button>
      </div>
   

    <div className='divs'>
        <div className='out-boxes'>
            <h3>Description </h3>
            <textarea  id="" cols="30" rows="5" className='outline-none'
            name="description"
             value={inputVals.description}
             onChange={handleChange}
            ></textarea>
            <div>
               <button
            className='bg-[#8639eb] w-full py-2  font-semibold text-2xl mt-2 rounded-md text-white'
            onClick={SubmitForm}
            >Create Task</button></div>
        
        </div>
    </div>
        
</form>
  )
}

export default CreateTask