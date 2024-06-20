import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaBars, FaBook, FaBookOpen, FaClipboard, FaGlobe, FaHandHoldingWater, FaHome, FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { FaGear, FaHand, FaM, FaPerson, FaRadio, FaXmark } from 'react-icons/fa6'
import { IoHomeOutline, IoLogOut, IoLogOutOutline, IoMoon, IoMoonOutline, IoPersonOutline, IoSunnyOutline } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { getSurahLists } from '../../apis/quranApi'
import ChapterCards from '../cards/ChapterCards'
import axios from 'axios'
import UserMenu from '../profile/UserMenu'
import BurgerMenu from '../profile/BurgerMenu'
import { GoDeviceDesktop } from 'react-icons/go'
import ToggleModes from './ToggleModes'

interface NavbarProps{
    user: string | null
    isLoggedIn: boolean
    logout:() => void
    lightMode:() => void
    darkMode:() => void
    systemMode:() => void
    isDarkMode:boolean 
}
const Navbar: React.FC<NavbarProps> = ({user, isLoggedIn, logout, lightMode, darkMode, systemMode, isDarkMode}) => {
    const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false)
    const [isSearchBtn, setIsSearchBtn] = useState<boolean>(false)
    const [filteredSurahList, setFilteredSurahList] = useState<any[]>([])
    const [surahList, setSurahList] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [showUserMenu, setShowUserMenu] = useState<boolean>(false)
    const [isShowModes, setIsShowModes] = useState<boolean>(false)
    const navigate = useNavigate()
    const searchSurah = (searchValue: string) => {
        const filteredList = surahList.filter((surah: any) => 
            surah.name_simple.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchValue.replace(/[^a-z0-9]/g, '').toLowerCase())
        )
        setIsSearching(true)
        setFilteredSurahList(filteredList)
    }
    const showModes = () => {
        setIsShowModes(!isShowModes)
    }
    const closeModesModal = () => {
        setIsShowModes(false)
    }
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)
        searchSurah(value)
    }
    const toggleBurgerMenu = () => {
        setIsBurgerMenu(!isBurgerMenu)
    }
    const toggleSearch = () => {
        setIsSearchBtn(!isSearchBtn)
    }
    const closeMenu = () => {
        setIsBurgerMenu(false)
    }
    const formattedSurahName = (surahNumber: number) => {
        if(surahNumber > 99){
            return `${surahNumber}`
        }else if (surahNumber > 9){
            return `0${surahNumber}`
        }else{
            return `00${surahNumber}`
        }
    }
    const showMenu = () => {
        setShowUserMenu(!showUserMenu)
    }
    const closeUserMenu = () => {
        setShowUserMenu(false)
    }
    useEffect(() => {
        const fetchSurahList = async() => {
            try {
                const surahData = await getSurahLists()
                setSurahList(surahData)
                setFilteredSurahList(surahData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSurahList()
    }, [])
  return (
    <>
    <div className='flex z-20 bg-white fixed w-full justify-between dark:bg-[#232528] dark:border-[#414346]  md:px-16 py-3 md:py-3 items-center border-b  '>
        <div className='hidden md:flex gap-2 items-center justify-center'>
            {/* <button title='menu' className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200'><FaBars/></button> */}
            <Link to={"/"} className='text-4xl text-slate-950 arabicText dark:text-white '>121</Link>
        </div>
        <div className='hidden md:flex gap-5 '>
            <ul className='flex gap-5 items-center'>
                <li className='hover:border-b-2 hover:border-blue-800 transition-all hover:text-blue-700'><Link to={"/"}>Home</Link></li>
                <li className='hover:border-b-2 hover:border-blue-800 transition-all hover:text-blue-700'><Link to={"/settings"}>Settings</Link></li>
                <li className='hover:border-b-2 hover:border-blue-800 transition-all hover:text-blue-700'><Link to={"/quiz"}>Quiz</Link></li>
                <li className='hover:border-b-2 hover:border-blue-800 transition-all hover:text-blue-700'><Link to={"/hadith"}>Hadith</Link></li>
                <li className='hover:border-b-2 hover:border-blue-800 transition-all hover:text-blue-700'><Link to={"/supplications"}>Supplications</Link></li>
            </ul>
            <div className='border border-black opacity-35'></div>
            <div className='relative flex gap-2 items-center text-lg'>
                <div><button onClick={showModes} title='darkmode'  className='flex'>{isDarkMode ? <IoMoonOutline/> : <IoSunnyOutline/> }</button></div>
                {isLoggedIn ? (
                    <button onClick={showMenu} className='border w-10 h-10 rounded-full flex items-center justify-center cursor-pointer bg-slate-800 dark:bg-white dark:text-black dark:border-black text-white font-bold'>
                        {user?.slice(0,1).toUpperCase()}
                    </button>
                ) : (
                   <div><Link to={"/login"}><IoPersonOutline/></Link></div> 
                )}
                {showUserMenu && (
                   <UserMenu
                        closeUserMenu={closeUserMenu}
                        logout={logout}
                   />
                )}
                {isShowModes && (
                    <ToggleModes
                        lightMode={lightMode}
                        darkMode={darkMode}
                        systemMode={systemMode}
                        closeModesModal={closeModesModal}
                    />
                )}
            </div>
        </div>
        {/* mobile */}
        <div className='flex md:hidden gap-2 px-8 items-center'>
            {/* <button title='menu' className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200'><FaBars/></button> */}
            <Link to={"/"} className='text-4xl text-slate-950 arabicText dark:text-white'>121</Link>
        </div>
        <div className='md:hidden flex items-center justify-center'>
            <button onClick={showModes} title='menu' className='px-3 m py-2 rounded-lg '><FaMoon className='text-xl'/></button>
            {isShowModes && (
                     <ToggleModes
                     lightMode={lightMode}
                     darkMode={darkMode}
                     systemMode={systemMode}
                     closeModesModal={closeModesModal}
                 />
                )}
            <button onClick={toggleSearch} title='menu' className='px-3 mr-2 py-2 rounded-lg '><FaSearch className='text-xl'/></button>
            <button onClick={toggleBurgerMenu} title='menu' className='px-3 mr-4 py-2 rounded-lg border '><FaBars className='text-xl'/></button>
        </div>
        {isBurgerMenu && (
            <BurgerMenu
                toggleBurgerMenu={toggleBurgerMenu}
                isLoggedIn={isLoggedIn}
                user={user}
                closeMenu={closeMenu}
                logout={logout}
            />
        )}
        {isSearchBtn && (
           <>
           <div className='fixed top-0 right-0 left-0 bottom-0 bg-black opacity-50 z-10'></div>
           <div className='absolute top-64 right-0 left-0 bottom-0  flex justify-center items-center z-20'>
               <div className='flex flex-col bg-white shadow-md rounded-lg h-80 w-96 p-5'>
                   <div className='flex justify-between items-center'>
                       <div className='flex gap-2 items-center py-1'>
                           <label htmlFor='search'><FaSearch/></label>
                           <input 
                                value={searchValue}
                                onChange={handleSearchChange}
                                className='w-72 border-b px-3' 
                                placeholder='Navigate with text e.g al-fatihah, pg24...' 
                                id='search'/>
                       </div>
                       <button onClick={toggleSearch} className='' title='close'><FaXmark className='text-2xl'/></button>
                   </div>
                   <div className='overflow-y-scroll pt-5'>
                    {isSearching && (
                         <ChapterCards
                         filteredSurahList={filteredSurahList}
                         surahList={surahList}
                         formattedSurahName={formattedSurahName}
                         toggleSearch={toggleSearch}
                         />
                    )}
                    </div>
               </div>
              
             
           </div>
       </>
        )}
    </div>
   
    </>
  )
}

export default Navbar
 