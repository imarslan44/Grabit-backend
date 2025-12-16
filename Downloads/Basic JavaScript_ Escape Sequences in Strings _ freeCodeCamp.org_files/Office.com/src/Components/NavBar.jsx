import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <header className='w-full py-8 px-25  bg-p1 flex justify-between items-center absolute top-0 left-0 text-p2 '>
        <div className="logo text-2xl font-bold">
            <img src="#" alt="" />
            <h1 className='text-3xl text-s2 '>NextStep</h1>
        </div>

        <nav className='text-xl font- tracking-tight w-3/5 flex justify-around selection:bg-transparent pr-20'>
           <Link to="/" className='hover:text-s2'>Home</Link>
            <a href="#" className='hover:text-s2'>About</a>
            <a href="#" className='hover:text-s2'>Features</a>
            <Link to="/signIn/signUp" className='hover:text-s2'>Sign In / Sign Up</Link>
        </nav>
    </header>
  )
}

export default NavBar