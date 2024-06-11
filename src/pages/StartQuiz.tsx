import React from 'react'
import { Link } from 'react-router-dom'

const StartQuiz = () => {
  return (
    <div className='flex flex-col gap-10 h-full w-full pb-20  bg-gradient-to-br from-blue-950 via-orange-700 to-violet-800'>
        
        <div className='flex flex-col mt-32 items-center  justify-center w-full pb-10'>
            <div className='pb-20 flex justify-start items-start w-full px-20'>
                <Link to="/quiz" className='border rounded-lg shadow0md bg-white text-black px-4 py-1'>Go Back</Link>
            </div>
             <div className='w-3/5  border bg-white p-8 rounded-2xl'>
                <div className='flex items-center w-full pb-8'>
                    <h2 className='text-xl'>1. How many chapters are there in the Quran</h2>
                </div>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex gap-2 items-center py-1 border rounded-full hover:bg-green-500 hover:text-white cursor-pointer'>
                       <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>A</p>
                       <p>114</p>
                    </div>
                    <div className='flex gap-2 items-center py-1 border rounded-full hover:bg-green-500 hover:text-white cursor-pointer'>
                       <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>B</p>
                       <p>14</p>
                    </div>
                    <div className='flex gap-2 items-center py-1 border rounded-full hover:bg-green-500 hover:text-white cursor-pointer'>
                       <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>C</p>
                       <p>1124</p>
                    </div>
                    <div className='flex gap-2 items-center py-1 border rounded-full hover:bg-green-500 hover:text-white cursor-pointer'>
                       <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>D</p>
                       <p>914</p>
                    </div>
                </div>
             </div>
        </div>
    </div>
  )
}

export default StartQuiz
