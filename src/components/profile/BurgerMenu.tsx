import React from 'react'
import { FaArrowRight, FaBook, FaClipboard, FaHome, FaRegBookmark } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { IoLogOut } from 'react-icons/io5'
import { MdQuiz } from 'react-icons/md'
import { Link } from 'react-router-dom'


interface BurgerMenuProps{
    isLoggedIn: boolean
    user: string | null
    toggleBurgerMenu:() => void
    closeMenu:() => void
    logout:() => void
}
const BurgerMenu:React.FC<BurgerMenuProps> = ({isLoggedIn, user, toggleBurgerMenu,closeMenu, logout}) => {
  return (
    <div className='top-0 left-0  h-screen z-40 w-screen fixed bg-white right-0 dark:bg-[#0a0a0a]'>
                <div className='flex flex-col mt-2 w-screen'>
                    <div className='flex justify-between items-center mt-1'>
                        <p className='arabicText text-4xl ml-8'>121</p>
                        <button onClick={toggleBurgerMenu} title='menu' className='mr-5'><FaXmark className='text-4xl'/></button>
                    </div>
                    <div className='mt-10  flex flex-col gap-4 px-8'>
                       {isLoggedIn ? (
                            <div className='flex flex-col gap-3'>
                                <div className='flex items-center gap-2'>
                                    <p className='w-10 h-10 rounded-full flex items-center font-bold justify-center bg-slate-800 text-white'>{user?.slice(0,1)}</p>
                                    <p className='text-xl'>{user}</p>
                                </div>
                                <div>
                                    <ul>
                                    <li className='border-b-2  py-3 border-t-2'><Link to={"/profile"} onClick={closeMenu} className='flex items-center gap-3'><FaArrowRight/>Profile</Link></li>
                                    <li className='border-b-2 py-3'><Link to={"/bookmarks"} onClick={closeMenu} className='flex items-center gap-3'><FaRegBookmark/>Bookmarks</Link></li>
                                    <li className='border-b-2 py-3'><Link to={"/notes"} onClick={closeMenu} className='flex items-center gap-3'><FaClipboard/>Personal Notes</Link></li>
                                    </ul>
                                </div>
                            </div>
                       ): (
                     
                         <div className='flex flex-col gap-2 border p-4 rounded-lg bg-gray-100 dark:bg-[#0a0a0a]'>
                            <Link to={"/login"} onClick={closeMenu} className='py-2 px-2 bg-white border-black border rounded-md w-44 font-bold dark:bg-[#0a0a0a] dark:border-gray-500 '>Start Your Journey</Link>
                            <p>Experience a world of benefits by creating an account:</p>
                            <ul className='list-disc ml-6'>
                                <li>Bookmarking Verses</li>
                                <li>Personal Notes</li>
                                <li>Developing Quizzes</li>
                                <li>Verse Sharing</li>
                             </ul>
                        </div>
                        
                       )}
                       
                       <p className='text-sm font-bold'>MENU</p>
                    <ul>
                        <li className='border-b-2  py-3 border-t-2'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaHome/>Home</Link></li>
                        <li className='border-b-2 py-3'><Link to={"/hadith"} onClick={closeMenu} className='flex items-center gap-3'><FaBook/>Hadith</Link></li>
                        <li className='border-b-2 py-3'><Link to={"/quiz"} onClick={closeMenu} className='flex items-center gap-3'><MdQuiz/>Quiz</Link></li>

                    </ul>
                    {isLoggedIn && (
                        <div className='mt-20'>
                            <Link to={"/"} 
                                onClick={() => {
                                logout()
                                closeMenu()
                                }}><p className='flex items-center  cursor-pointer py-3   gap-2  hover:text-blue-600'><IoLogOut/>Logout</p>
                            </Link> 
                        </div>
                    )}  
                    </div>
                </div>
            </div>
  )
}

export default BurgerMenu
