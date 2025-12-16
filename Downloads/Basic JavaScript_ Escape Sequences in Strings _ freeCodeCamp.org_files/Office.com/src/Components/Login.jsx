import React from 'react'
import Button from './Button'
const Login = () => {
  return (
    <section className='w-full h-screen flex justify-center items-center'>
    <form className='bg-slate-50 flex flex-col text-lg p-10 shadow-lg rounded-md w-80'>
    <h2 className='text-center mb-10 text-2xl font-medium'>Login</h2>

    <input type="text" className="border-2 rounded-sm p-1 my-2" placeholder='Email'/>
    <input type="password" className="border-2 rounded-sm p-1 my-2"  placeholder='Password?'/>

    <Button content="Get Started" classes=" border-2 border-s1 hover:border-black rounded-sm p-1 my-2
    transition-all duration-1s "/>

    <p className='text-sm text-center font- tracking-wide mt-2'>dont have an acount.
       <button className='underline tracking-wider font-medium'>signUp!</button>
    </p> 
 </form>
 </section>
  )
}

export default Login