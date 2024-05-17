import React from 'react'
import { FaBars, FaGlobe, FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { FaPerson } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <div className='flex w-full justify-between px-16 py-4 items-center border-b border-b-black'>
        <div className='flex gap-2 items-center justify-center'>
            <button title='menu' className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200'><FaBars/></button>
            <h2 className='text-lg'>My Quran</h2>
        </div>
        <div className=''>
            <ul className='flex gap-3 items-center'>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='moon'><FaMoon/></button></li>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='globe'><FaGlobe/></button></li>
                <li><button className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200' title='search'><FaUser/></button></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar
