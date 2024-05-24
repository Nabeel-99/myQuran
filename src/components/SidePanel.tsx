import React from 'react'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { FaRadio } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
const SidePanel = () => {
  return (
    <div className='hidden md:flex flex-col gap-2  h-full p-5'>
        <div className='flex flex-col '>
            <p className='text-blue-500'>Current Reciter:</p>
            <p>Sheikh Muhammad Ayyub</p>
        </div>
        <div className='flex flex-col pb-8'>
            <p className='text-blue-500'>Translation By:</p>
            <p className='text-sm'>Dr. Mustafa Khattab, the Clear Quran</p> 
        </div>
        <ul>
            <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaRadio/>Reciters</Link></li>
            <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBook/>Seerah</Link></li>
             <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBookOpen/>Duas and Supplications</Link></li>
             <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBookOpen/>Quiz</Link></li>
        </ul>
    </div> 
  )
}

export default SidePanel
