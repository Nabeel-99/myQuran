import React, { useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

const Notes = () => {
  const [isShowNote, setIsShowNote] = useState(false)
  const showFullNote = () => {
    setIsShowNote(true)
  }
  const closeFullNote = () => {
    setIsShowNote(false)
  }
  return (
     <div className='flex flex-col gap-10 h-full pb-20   items-start mt-32 px-4 lg:px-20 '> 
        <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>My Notes</h2>
        <div className='grid lg:grid-cols-2 grid-flow-rows gap-4 w-full'>
            <div className='bg-gray-50 dark:bg-[#1f2020] border dark:border-gray-600 dark:hover:border-gray-50 rounded-lg cursor-pointer hover:border-blue-700  flex flex-col gap-4  px-4 p-4' onClick={showFullNote}>
                <div className=' text-sm flex justify-between items-start'>
                   <span className=' rounded-full p-2 bg-black text-white dark:bg-white dark:text-black'>Al-Fatihah 1:1</span>
                </div>
                <div className='flex flex-col'>
                    <p>All thanks be to Allah. This means that in every situation you found yourself, make sure to thank Allah because Allah knows best.</p>
                    <p className='text-sm mt-4 text-gray-400'>Tuesday, 4th June, 2024</p>
                </div>
              
            </div>
          
        </div>
        {isShowNote && (
            <div className='z-10 fixed  inset-0 bg-transparent flex items-center justify-center top-0 right-0 left-0 bottom-0 px-2 lg:px-0'>
                <div className='absolute inset-0 h-full w-full bg-black opacity-15'></div>
                <div className='z-10 border-black flex flex-col gap-7 border px-4 lg:px-10 pb-8   bg-white dark:bg-[#232528] dark:border-white rounded-md items-center justify-center lg:w-3/5 lg:h-3/4'>
                <button title='close' className=' hover:bg-gray-200 hover:rounded-full dark:hover:bg-gray-700 p-2' onClick={closeFullNote} ><FaXmark className='text-2xl'/></button>
                <div className=' text-sm '>
                    <span className=' rounded-full p-2 bg-black text-white dark:bg-white dark:text-black'>Al-Fatihah 1:1</span>
                </div>
                <div className='flex flex-col gap-8 w-full'> 
                    <p className='arabicText verseText text-3xl'>127 </p>
                    <p className=''>In the Name of Allah—the Most Compassionate, Most Merciful.</p>
                </div> 
                <div className='border border-black dark:border-white flex flex-col gap-8 rounded-lg w-full lg:px-10 lg:py-8'>
                    <div className="flex gap-3 items-center justify-end w-full pr-6 pt-4 lg:pr-0 lg:pt-0">
                        <button title='edit' className=' hover:text-blue-500'><FaEdit/></button>
                        <button title='delete' className='hover:text-red-500'><FaTrash/></button>
                    </div>
                    <p className='px-4 lg:px-0'>All thanks be to Allah. This means that in every situation you found yourself, make sure to thank Allah because Allah knows best.</p> 
                    <div className='flex justify-end pb-8 pr-3 lg:pb-0 lg:pr-0 lg:mt-8'>
                        <button className='rounded-md py-1  text-white bg-black px-4 hover:bg-[#232528] dark:bg-white dark:text-black dark:hover:bg-[#f1f1f5]'>Share Verse</button>
                    </div>   
                </div>   
                </div>
            </div>
        )}
    </div>
  )
}

export default Notes
