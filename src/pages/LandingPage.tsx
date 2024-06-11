import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowRight, FaSearch } from 'react-icons/fa'
import { fetchAllJuz, getSurahLists } from '../apis/quranApi'
import ChapterCards from '../components/ChapterCards'
import JuzCards from '../components/JuzCards'
import { FaBarsStaggered, FaSort } from 'react-icons/fa6'
import SeerahImage from "../assets/images/seerah.png"
import DuaImage from "../assets/images/dua.png"
import QuizImage from "../assets/images/quiz.png"

const LandingPage = () => {

    const [surahList, setSurahList] = useState<any[]>([])
    const [surahJuz, setSurahJuz] = useState<any[]>([])
    const [filteredSurahList, setFilteredSurahList] = useState<any[]>([])
    const [filteredJuzList, setFilteredJuzList] = useState<any[]>([])
    const [isSurah, setIsSurah] = useState<boolean>(true)
    const [isJuz, setIsJuz] = useState<boolean>(false)
    const [isSearchBtn, setIsSearchBtn] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    
    const showSurah = () => {
        setIsSurah(true)
        setIsJuz(false)
    }

    const searchSurah = (searchValue: string) => {
        const filteredList = surahList.filter((surah: any) => 
            surah.name_simple.toLowerCase().replace(/[^a-z0-9]/g, '').includes(searchValue.replace(/[^a-z0-9]/g, '').toLowerCase())
        )
        setFilteredSurahList(filteredList)
    }

    const searchJuz = (searchValue: any) => {
        const filteredList = surahJuz.filter((juz: any) => 
            juz.juzNum.toString().includes(searchValue.toString())
        )
         setFilteredJuzList(filteredList)
     }

    const toggleSearch = () => {
        setIsSearchBtn(!isSearchBtn)
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)
        searchSurah(value)
        searchJuz(value)
    }
    const showJuz = () => {
        setIsJuz(true)
        setIsSurah(false)
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
   
    const fetchSurahList = async() => {
        try {
            const surahData = await getSurahLists()
            setSurahList(surahData)
            setFilteredSurahList(surahData)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchSurahJuz = async() => {
        try{
            const juzData = await fetchAllJuz()
            setSurahJuz(juzData)
            setFilteredJuzList(juzData)
        }catch(error){
            console.log("error", error)
        }
    }
    useEffect(() => {
        window.scrollTo({top: 0})
        fetchSurahJuz()
        fetchSurahList()
    }, [])

  return (
    <div className='flex flex-col w-full  pt-24 px-4 xl:px-24 gap-8 '>
        {/*  */}
        <div className='flex items-center w-full justify-center'>
            <h3 className='arabicText text-[5rem] lg:text-[10rem] ' >126</h3>
        </div>
        {/* SEARCH BAR */}
        <div className='flex border  mx-auto items-center justify-center pl-4  dark:bg-[#303233] rounded-full w-full md:w-3/6'>
            <label htmlFor='search' title='search' className='border-r  h-full   flex items-center pr-3'><FaSearch/></label>
            <input 
                type='text' 
                id='search' 
                placeholder='Search Surah e.g Surah Al-fatihah' 
                className='w-full py-3 px-2 rounded-r-full dark:bg-[#303233]'
                value={searchValue}
                onChange={handleSearchChange}
                />
        </div>
        {/* RECENTLY READ */}
       <div className='flex flex-col gap-2'>
            <h2 className='md:text-xl'>Recently Read</h2>
            <div className='grid grid-flow-col xl:grid-cols-5 '>
                <div className='border  rounded-lg flex justify-between items-center'>
                    <div className='flex gap-4 p-2'>
                        <div><h2 className='border p-1 rounded-lg '>1:1</h2></div>
                        <div className='flex flex-col text-sm md:text-base'>
                            <p>Al-Fatihah</p>
                            <p>PG. 1</p>
                        </div>
                    </div>
                    <div className='border-l  border-l-green-800 h-full p-2 rounded-r-lg items-center flex bg-blue-500' >
                        <button className='text-green-200 text-xl pl-3 ' title='view'><FaArrowRight/></button>
                    </div>
                </div>
            </div>
       </div>
       {/* CHAPTER AND JUZ LISTS */}
      <div className='flex flex-col gap-4'>
        <h2 className='md:text-xl'>Chapter Lists</h2>
        <div className='grid grid-cols-2 gap-3 md:gap-12 '>
            <button onClick={showSurah} className='border rounded-full md:text-xl px-2 py-1 md:px-6 md:py-3 flex justify-between items-center'>
                Chapter(114)
                <p className="uthmani-script text-2xl md:text-4xl">سُورَة</p>
            </button>
            <button onClick={showJuz} className='border rounded-full md:text-xl px-2 py-1 md:px-6 md:py-3 flex justify-between items-center'>
                Juz(30)
                <p className="uthmani-script text-2xl md:text-4xl">جُزْء</p>
            </button>
            {/* <button className='border border-green-800  rounded-full text-xl px-6 py-3 flex justify-between'>
                Hizb(60)
                <p className="uthmani-script">حِزْب</p>
            </button> */}
        </div>
        <div className='flex gap-4 items-end justify-end'>
            <p className='text-sm md:text-base'>SORT BY:</p> 
            <button className='flex items-center gap-2 text-sm md:text-base'>ASCENDING <FaSort/></button>
        </div>
      </div>
      {/* SURAH LIST */}
     {isSurah ? 
         <ChapterCards
         toggleSearch={toggleSearch}
         filteredSurahList={filteredSurahList}
         surahList={surahList}
         formattedSurahName={formattedSurahName}
       /> : 
       <JuzCards
       surahJuz={surahJuz}
       filteredJuzList={filteredJuzList}
     />
    }
     
     {filteredSurahList.length === 0 && (
            <div className='flex justify-center pb-10 mb-4'>
                No search Found
            </div>
        )}
    </div>
  )
}

export default LandingPage





