import React, { useRef, useEffect } from 'react'
import { FaArrowRight, FaRegBookmark } from 'react-icons/fa'
import { IoLogOutOutline } from 'react-icons/io5'
import { TfiWrite } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

interface UserMenuProps {
  closeUserMenu: () => void
  logout: () => void
}

const UserMenu: React.FC<UserMenuProps> = ({ closeUserMenu, logout }) => {
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeUserMenu()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [closeUserMenu])

  return (
    <div ref={menuRef} className='absolute border rounded-md top-10 right-0 w-60 bg-white dark:bg-[#303233] shadow-md'>
      <div className='p-4'>
        <ul className='flex flex-col gap-4 text-md'>
          <Link to={"/profile"} onClick={closeUserMenu}><li className='flex items-center cursor-pointer gap-2 hover:text-blue-600'><FaArrowRight />Profile</li></Link>
          <Link to={"/bookmarks"} onClick={closeUserMenu}><li className='flex items-center cursor-pointer gap-2 hover:text-blue-600'><FaRegBookmark />Bookmarks</li></Link>
          <Link to={"/notes"} onClick={closeUserMenu}><li className='flex items-center cursor-pointer gap-2 hover:text-blue-600'><TfiWrite />Personal Notes</li></Link>
          <Link to={"/"}
            onClick={() => {
              logout()
              closeUserMenu()
            }}><li className='flex items-center cursor-pointer gap-2 hover:text-blue-600'><IoLogOutOutline />Logout</li>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default UserMenu
