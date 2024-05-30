import React, { useEffect, useState } from 'react'
import { FaBars, FaBook, FaBookOpen, FaGlobe, FaHandHoldingWater, FaHome, FaMoon, FaSearch, FaUser } from 'react-icons/fa'
import { FaGear, FaHand, FaM, FaPerson, FaRadio, FaXmark } from 'react-icons/fa6'
import { IoHomeOutline, IoMoon, IoMoonOutline, IoPersonOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { getSurahLists } from '../apis/quranApi'
import ChapterCards from './ChapterCards'

const Navbar = () => {
    const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
    const [isSearchBtn, setIsSearchBtn] = useState<boolean>(false)
    const [filteredSurahList, setFilteredSurahList] = useState<any[]>([])
    const [surahList, setSurahList] = useState<any[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [isSearching, setIsSearching] = useState<boolean>(false)

    const searchSurah = (searchValue: string) => {
        const filteredList = surahList.filter((surah: any) => 
            surah.name_simple.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchValue.replace(/[^a-z0-9]/g, '').toLowerCase())
        )
        setIsSearching(true)
        setFilteredSurahList(filteredList)
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
    <div className='flex z-10 bg-white fixed w-full justify-between md:px-16 py-3 md:py-3 items-center border-b '>
        <div className='hidden md:flex gap-2 items-center justify-center'>
            {/* <button title='menu' className='border px-3 rounded-md text-lg py-2 hover:bg-gray-200'><FaBars/></button> */}
            <Link to={"/"} className='text-4xl text-slate-950 arabicText'>121</Link>
        </div>
        <div className='hidden md:flex gap-5 '>
            <ul className='flex gap-2 items-center'>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/"}>Settings</Link></li>
            </ul>
            <div className='border border-black opacity-35'></div>
            <ul className='flex gap-2 items-center text-lg'>
                <li><button title='darkmode' className='flex'><IoMoonOutline/></button></li>
                <li><Link to={"/login"}><IoPersonOutline/></Link></li>
            </ul>
        </div>
        {/* mobile */}
        <div className='flex md:hidden gap-2 px-8 items-center'>
            {/* <button title='menu' className='border px-3 rounded-md text-sm py-2 hover:bg-gray-200'><FaBars/></button> */}
            <Link to={"/"} className='text-4xl text-slate-950 arabicText'>121</Link>
        </div>
        <div className='md:hidden flex items-center justify-center'>
        <button title='menu' className='px-3 m py-2 rounded-lg '><FaMoon className='text-xl'/></button>
            <button onClick={toggleSearch} title='menu' className='px-3 mr-2 py-2 rounded-lg '><FaSearch className='text-xl'/></button>
            <button onClick={toggleBurgerMenu} title='menu' className='px-3 mr-4 py-2 rounded-lg border '><FaBars className='text-xl'/></button>
        </div>
        {isBurgerMenu && (
            <div className='top-0 left-0  h-screen z-40 w-screen fixed bg-white right-0'>
                <div className='flex flex-col mt-2 w-screen'>
                    <div className='flex justify-between items-center mt-1'>
                        <p className='arabicText text-4xl ml-8'>121</p>
                        <button onClick={toggleBurgerMenu} title='menu' className='mr-5'><FaXmark className='text-4xl'/></button>
                    </div>
                    <div className='mt-10  flex flex-col gap-4 px-8'>
                        <div className='flex flex-col gap-2 border p-4 rounded-lg bg-gray-100'>
                            <button className='py-2 bg-white border-black border rounded-md w-44 font-bold'>Start Your Journey</button>
                            <p>Experience a world of benefits by creating an account:</p>
                            <ul className='list-disc ml-6'>
                                <li>Bookmarking Verses</li>
                                <li>Personal Notes</li>
                                <li>Developing Quizzes</li>
                                <li>Verse Sharing</li>
                            </ul>
                        </div>
                        <p className='text-sm font-bold'>MENU</p>
                        <ul>
                            <li className='border-b-2  py-3 border-t-2'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaHome/>Home</Link></li>
                            <li className='border-b-2 py-3'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaRadio/>Reciters</Link></li>
                            <li className='border-b-2 py-3'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaBook/>Seerah</Link></li>
                            <li className='border-b-2 py-3'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaBookOpen/>Duas and Supplications</Link></li>
                            <li className='border-b-2 py-3'><Link to={"/"} onClick={closeMenu} className='flex items-center gap-3'><FaGear/>Settings</Link></li>
                        </ul>
             
                    </div>
                </div>
            </div>
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
 