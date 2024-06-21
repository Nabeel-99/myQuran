import React, { useEffect, useState } from 'react'
import { FaBook, FaBookOpen } from 'react-icons/fa'
import { FaRadio } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { Reciters } from '../../types/types'
import axios from 'axios'
import { getAllReciters } from '../../apis/quranApi'
const SidePanel = () => {
  const [reciters, setReciters] = useState<Reciters[]>([])
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const fetchAllReciters = async() => {
    try {
      const response = await getAllReciters()
      console.log(response)
      setReciters(response)
    } catch (error) {
      console.log(error)
    }
  }
  const displayReciters = () => {
    setIsDisplaying(!isDisplaying)
  }
  useEffect(() => {
    fetchAllReciters()
  }, [])
  return (
    <div className='hidden md:flex flex-col gap-2 dark:bg-[#232528]  h-full p-5'>
        <div className='flex flex-col '>
            <p className='text-blue-500'>Current Reciter:</p>
            <p>Sheikh Muhammad Ayyub</p>
        </div>
        <div className='flex flex-col pb-8'>
            <p className='text-blue-500'>Translation By:</p>
            <p className='text-sm'>Dr. Mustafa Khattab, the Clear Quran</p> 
        </div>
        <ul>
            <li className='border-b-2 py-3'><button onClick={displayReciters}  className='flex items-center gap-3'><FaRadio/>Change Reciter</button></li>
         
            <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBook/>Seerah</Link></li>
             <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBookOpen/>Duas and Supplications</Link></li>
             <li className='border-b-2 py-3'><Link to={"/"}  className='flex items-center gap-3'><FaBookOpen/>Quiz</Link></li>
        </ul>
        {isDisplaying && (
              <div className='fixed top-44 right-72 p-3 border bg-white dark:bg-[#2f3031] shadow-md rounded-lg'>
                  {reciters.map((reciter: Reciters) => (
                      <div className='flex flex-col gap-2 pb-2 ' key={reciter.id}>
                          <p>{reciter.reciter_name}</p>
                      </div>
                  ))}
                  
              </div>
            )}
    </div> 
  )
}

export default SidePanel
