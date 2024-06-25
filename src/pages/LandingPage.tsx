import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowRight, FaSearch } from 'react-icons/fa'
import { fetchAllJuz, getSurahLists } from '../apis/quranApi'
import ChapterCards from '../components/cards/ChapterCards'


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
        <div className='flex border  mx-auto items-center justify-center pl-4 border-black dark:border-white  dark:bg-[#303233] rounded-full w-full md:w-3/6'>
            <label htmlFor='search' title='search' className='border-r  border-r-black dark:border-r-white h-full   flex items-center pr-3'><FaSearch/></label>
            <input 
                type='text' 
                id='search' 
                placeholder='Search Surah e.g Surah Al-fatihah' 
                className='w-full py-3 px-2 rounded-r-full dark:bg-[#303233]'
                value={searchValue}
                onChange={handleSearchChange}
                />
        </div>
         <ChapterCards
         toggleSearch={toggleSearch}
         filteredSurahList={filteredSurahList}
         surahList={surahList}
         formattedSurahName={formattedSurahName}
       /> 
     
     {filteredSurahList.length === 0 && (
            <div className='flex justify-center pb-10 mb-4'>
                No search Found
            </div>
        )}
    </div>
  )
}

export default LandingPage





