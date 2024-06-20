import React from 'react'
import { GoDeviceDesktop } from 'react-icons/go'
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5'

interface ToggleModesProps{
    lightMode:() => void
    darkMode:() => void
    systemMode:() => void
    closeModesModal:() => void
}
const ToggleModes:React.FC<ToggleModesProps> = ({lightMode, darkMode, systemMode, closeModesModal }) => {
  return (
        <div className='absolute md:top-10 top-14 right-10 md:right-0 dark:bg-[#303233]  bg-white border shadow-md w-32 rounded-lg '>
            <div className='flex flex-col gap-4 px-4 text-[1rem] p-4'>
                <button onClick={() => {lightMode(); closeModesModal()}} title='sun' className='flex items-center gap-2 hover:text-blue-700 dark:hover:text-blue-300'><IoSunnyOutline/> Light</button>
                <button onClick={() => {darkMode(); closeModesModal()}} title='moon' className='flex items-center gap-2  hover:text-blue-700 dark:hover:text-blue-300'><IoMoonOutline/> Dark</button>
                <button onClick={() => {systemMode(); closeModesModal()}} title='system' className='flex items-center gap-2  hover:text-blue-700 dark:hover:text-blue-300'><GoDeviceDesktop/> System</button>
            </div>
        </div>
  )
}

export default ToggleModes
