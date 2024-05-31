import React from 'react'
import { FaArrowRight, FaClipboard } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'

interface UserMenuProps{
    closeUserMenu:() => void
    logout:() => void
}
const UserMenu: React.FC<UserMenuProps> = ({closeUserMenu, logout}) => {
  return (
    <div className='absolute  border  rounded-md top-10 right-0  w-60 bg-white shadow-md'>
    <div className='p-4'>
    <ul className='flex flex-col gap-4 text-md'>
        <Link to={"/"} onClick={closeUserMenu}><li className='flex items-center cursor-pointer  gap-2 hover:text-blue-600'><FaArrowRight/>Profile</li></Link>
        <Link to={"/"} onClick={closeUserMenu}><li className='flex items-center  cursor-pointer   gap-2  hover:text-blue-600'><FaClipboard/>Personal Notes</li></Link>
        <Link to={"/"} 
        onClick={() => {
            logout()
            closeUserMenu()
            }}><li className='flex items-center  cursor-pointer   gap-2  hover:text-blue-600'><IoLogOutOutline/>Logout</li>
        </Link> 
    </ul> 
    </div>
</div>
  )
}

export default UserMenu
