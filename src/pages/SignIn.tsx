import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark, FaRegEye } from 'react-icons/fa'
import { IoGameControllerOutline } from 'react-icons/io5'
import { TfiWrite } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className='flex  h-full w-full justify-around items-start mt-32 mb-52 px-20'>
     
    <div className='w-1/3  '>
        <form className='border border-black p-6 rounded-lg'>
          <p className='text-3xl font-bold'>Login</p>
          <div className='mb-8 mt-11'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='email'>Email</label>
            <input className='border border-black rounded-md px-3 py-1 w-full' id='email' placeholder='Enter your email'/>
          </div>
        
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='password'>Password</label>
            <input className='border border-black rounded-md px-3 w-full py-1' id='email' placeholder='Password'/>
          </div>
          <div className='flex flex-col gap-3 items-start'>
              <button className='bg-green-500 hover:bg-green-600 text-white px-5 rounded-md py-1'>Login</button>
              <p>Don't have an account? <Link to={'/signup'} className='text-blue-700 font-bold'>Register</Link></p>
          </div>
        </form>
    </div>
    <div className='text-xl flex flex-col gap-4 w-2/6 '>

   <p className='text-2xl'>Start your journey with the following benefits:</p>
   <ul className='flex flex-col gap-4'>
     <li className='flex items-center  gap-2'><FaRegBookmark/>Bookmarking Verses</li>
     <li className='flex items-center  gap-2'><TfiWrite/>Personal Notes</li>
     <li className='flex items-center  gap-2'><IoGameControllerOutline/>Developing Quizzes</li>
     <li className='flex items-center  gap-2'><CiShare2/>Share Verses</li>
     <li className='flex items-center  gap-2'><FaRegEye/>Track Recent Activities</li>
   </ul> 
</div>
</div>
  )
}

export default SignIn
