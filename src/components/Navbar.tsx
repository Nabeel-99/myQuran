import React from 'react'
import { FaBars, FaGlobe, FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { FaPerson } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='flex bg-white fixed w-full justify-between md:px-16 py-4 md:py-3.5 items-center border-b '>
        <div className='hidden md:flex gap-2 items-center justify-center'>
            <button title='menu' className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200'><FaBars/></button>
            <h2 className='text-lg'>My Quran</h2>
        </div>
        <div className='hidden md:flex'>
            <ul className='flex gap-3 items-center'>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='moon'><FaMoon/></button></li>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='globe'><FaGlobe/></button></li>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='search'><FaUser/></button></li>
            </ul>
        </div>
        {/* mobile */}
        <div className='flex md:hidden gap-2 px-8 items-center'>
            <button title='menu' className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200'><FaBars/></button>
            <h2 className='text-md'>My Quran</h2>
        </div>
        <div className='md:hidden'>
            <ul className='flex gap-3 px-4 items-center'>
                <li><button className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200' title='moon'><FaMoon/></button></li>
                <li><button className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200' title='globe'><FaGlobe/></button></li>
                <li><button className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200' title='search'><FaUser/></button></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
 