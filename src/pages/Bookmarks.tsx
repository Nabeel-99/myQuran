import React from 'react'
import { FaXmark } from 'react-icons/fa6'

const Bookmarks = () => {
  return (
    <div className='flex flex-col gap-10 h-full pb-20  items-start mt-32 px-4 lg:px-20 '> 
        <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>Bookmarks</h2>
        <div className='grid lg:grid-cols-5 gap-4 w-full'>
            <div className='relative rounded-md cursor-pointer hover:border-blue-700  hover:transition-all border dark:bg-[#161616] flex flex-col gap-4 shadow-md px-4 p-4'>
                <div className='flex justify-between items-center w-full'>
                    <p>Surah Al-Fatihah</p>
                    <button title='remove'><FaXmark className='text-xl'/></button>
                </div>
                <div className='border bg-gray-100 dark:bg-[#161717] rounded-md flex flex-col items-center justify-center'>
                    <p className='arabicText text-2xl'>1</p>
                    <p>Verse 4 </p>
                </div>
            </div>
        
        </div>
    </div>
  )
}

export default Bookmarks
