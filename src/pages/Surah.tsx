import React, { useEffect, useState } from 'react'
import { FaCaretRight, FaReadme } from 'react-icons/fa'
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { CgReadme } from "react-icons/cg";
import { RxReader } from "react-icons/rx";
import { fetchPages, getSurahLists, fetchAllJuz, getSurahAyat } from '../apis/quranApi';

const Surah = () => {
    const [surahPage, setSurahPage] = useState<any[]>([])
    const [surahList, setSurahList] = useState<any[]>([])
    const [juzList, setJuzList] = useState<any[]>([])
    const [isSurah, setIsSurah] = useState<boolean>(true)
    const [isJuz, setIsJuz] = useState<boolean>(false)
    const showSurah = () => {
        setIsSurah(true)
        setIsJuz(false)
    }
    const showJuz = () => {
        setIsJuz(true)
        setIsSurah(false)
    }
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openSideMenu = () => {
        setIsOpen(!isOpen)
    }
    const renderSurah = (id: any) => {

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
    const fetchJuz = async() => {
        try {
            const juzData = await fetchAllJuz()
            setJuzList(juzData)
        } catch (error) {
            
        }
    }
    const fetchAllSurahs = async() => {
        try {
            const response = await getSurahLists()
            setSurahList(response)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchAllPages = async() => {
        try {
            const pageData = await fetchPages()
            setSurahPage(pageData)
        } catch (error) {
            console.log('error')
        }
    }

    const fetch = async() => {
        try {
            const pageData = await getSurahAyat()
 
        } catch (error) {
            console.log('error')
        }
    }
   useEffect(() => {
        fetch()
        fetchJuz()
        fetchAllSurahs()
        fetchAllPages()
   }, []) 
  return (
    <div className='flex h-full w-full'>
        {/* side navigation */}
      <div className={` bg-white border-t  fixed top-16 rounded-tr transition-all duration-700 ${isOpen ? ' w-72 h-full border-r ' : ''}`} >
        <div className={`flex  ${isOpen ? 'justify-end' : 'justify-start'}`}>
            <button onClick={openSideMenu} title='open-navigation' className=' bg-gray-300 px-3 py-2 rounded-tr border hover:transition hover:duration-700 hover:border-[#646cff] cursor-pointer'>
                {isOpen ? <PiCaretLeftLight /> : <PiCaretRightLight />}
            </button>
        </div>
        {isOpen && (
            <div className='flex flex-col gap-4 w-full h-full pb-20 px-4 pt-2'>
                <p>Chapter and Juz Lists</p>
                <div className='flex gap-8 text-sm'>
                    <button onClick={showSurah} className='border px-2 py-1 rounded-full w-full'>Chapter (114)</button>
                    <button onClick={showJuz} className='border px-2 py-1 rounded-full w-full'>Juz (30)</button>
                </div>
                <div className='text-sm flex flex-col gap-2'>
                    <p>Navigate with Text</p>
                    <input className='border px-3 rounded-full py-1' placeholder='e.g Al-fatihah, pg 49 ...'/>
                </div>
                {/* surah List */}
                {isJuz ? (
                    <div className='grid grid-flow-row gap-4 h-screen overflow-scroll pb-20'>
                    {juzList.map((juz, index) => (
                        <button className='bg-white hover:bg-gray-100 border rounded-lg border-transparent px-4 flex w-full  justify-between' key={index}>
                        <div className='flex gap-2 items-center'>
                            <p className=''>Juz {juz.text.juz}</p>
                            <p className='text-sm pl-2'>{juz.text.surah.englishName}</p> 
                        </div>
                        <div className='flex flex-col'>
                        <p className='arabicFont text-xl'>
                           {formattedSurahName(juz.text.surah.number)}
                       </p>
                         </div>
                        </button>
               ))}
               </div>
                ) : 
                <div className='grid grid-flow-row gap-4 h-screen overflow-scroll pb-20'>
                    {surahList.map((sura, index) => (
                    <button onClick={() => renderSurah(sura.number)} className='bg-white hover:bg-gray-100 border rounded-lg border-transparent px-4 flex w-full justify-between' key={index}>
                    <div className='flex gap-2'>
                        <p className=''>{sura.number}</p> 
                        <p className='pl-2'>{sura.englishName}</p>
                        </div>
                    <div className='flex flex-col'>
                        <p className='arabicFont text-xl'>{formattedSurahName(sura.number)}</p>
                     </div>
                    </button>
                    ))}
                </div>
                }
                
            </div>
        )}
      </div>
      {/* main content */}
      <div className='flex flex-col gap-10 items-center w-full pt-28'>
        {/* toggle page layout */}
            <div className='shadow-sm border border-gray-100 p-1 rounded-full flex flex-col gap-3 items-center justify-between w-96 bg-gray-50'>
                <p className='text-sm'>Page Layout</p>
               <div className='flex justify-between w-full px-14'>
                    <button className='flex items-center gap-2 border px-6 py-1 bg-white rounded-full'><CgReadme /> Reading</button>
                    <button className='flex items-center gap-2 px-6 py-1 hover:border rounded-full'><RxReader />Translation</button>
               </div>
            </div>
        {/* Surah Name */}
        <h1 className='arabicText'>1</h1>
        <div className='text-right flex flex-col h-screen xl:px-96'> 
         {surahPage.map((page, index) => (
                <div key={index} className='flex gap-2 text-right items-center'>
                    <p className='quran-common text-4xl'>
                        {page.verseNumber > 99 
                            ? `${page.verseNumber}`
                            : page.verseNumber > 9 
                            ? `0${page.verseNumber}`
                            : `00${page.verseNumber}`
                        }
                    </p>
                    <p>{page.verseText}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Surah
