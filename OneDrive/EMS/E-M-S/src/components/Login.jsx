import React, { useState } from 'react';


function Login({handleLogin}) {
const [email, setEmail]=useState("")
const [password, setPassword]=useState("")



function handleSubmit(e){
e.preventDefault()
handleLogin(email,password)

}
const btnInputStyles = `w-full  my-[10px] text-black border-2 outline-none   rounded-md text-2xl p-2 `
  return (
    <div id='container'>
   <form className="py-16 px-10  rounded-lg bg-[#fffeff] flex flex-col bg-opacity-90  w-96 shadow-xl h-[450px] items-center justify-center">
    <h1 className='text-3xl text-center -mt-10 pb-10 pt-8 text-black font-medium'>Login</h1>
    
      <input type="email" required
      className={`${btnInputStyles}  border-slate-500`}
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input type="password" required
     className={`${btnInputStyles}  border-slate-500`}
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <button type='submit'
      className={`   text-white text-2xl rounded-md ${btnInputStyles} bg-[#8d36ff]`}

      onClick={(e)=>handleSubmit(e)}
      >Login</button>
    
   </form>
    </div>
  )
}

export default Login