import React from 'react'
import Button from '../Button'
import { Link } from 'react-router-dom'
const Hero = () => {

  return (

    
    <section id="Hero" className='w-full h-screen bg-p1 flex justify-center items-center xl:px-20 '>

      <div className="text-content text-black w-1/2 flex items-start flex-col  pl-5">
       <h1 className='text-8xl tracking-wide font-extrabold uppercase py-5 font-anton pointer-events-none'>step up with_-
       <span className='text-p3'>Next step</span></h1>
       <p className='text-2xl text-slate-700 pb-4  pr-40 '>Manage Your Office Tasks Much more  efficiently
        and get clear view of your team progress.
       </p>
     <Link to="/signIn/signUp">
     <Button content="Get Started" classes="py-3 px-10 text-2xl  tracking-wide font text-white hover:text-black "/>
     </Link>
      </div>

      <div className="image  w-full lg:w-1/2 flex justify-end pt-10">

      <div className='relative '>
        
         <img src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/68f7be125319719.6116759c51156.jpg" alt="" className='mix-blend-multiply scale-120'/>
      </div>
      </div>
      
    </section>
  )
}

export default Hero