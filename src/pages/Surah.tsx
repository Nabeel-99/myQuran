import React, { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaReadme } from 'react-icons/fa'
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { CgReadme } from "react-icons/cg";
import { RxReader } from "react-icons/rx";
import { fetchPages, getSurahLists, fetchAllJuz,fetchAyat } from '../apis/quranApi';
import Sidemenu from '../components/Sidemenu';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Surah = () => {

    const [surahPage, setSurahPage] = useState<any[]>([])
    const [surahList, setSurahList] = useState<any[]>([])
    const [juzList, setJuzList] = useState<any[]>([])
    const currentSection = useRef(null)
   

    const [selectedSurah, setSelectedSurah] = useState<any[]>([])
    const {id} = useParams()
    
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openSideMenu = () => {
        setIsOpen(!isOpen)
    }
  
    const formattedStyleName = (surahNumber: number) => {
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
   

    const fetchSurahAyat = async(id: number) => {
        try {
            const surahAyat = await fetchAyat(id)
            setSelectedSurah(surahAyat)
        } catch (error) {
            console.log(error)
        }
    }
    const renderSurahAyat = async(id: number) => {
         try {
             await fetchSurahAyat(id)
         } catch (error) {
            console.log(error)
         }
    }
   useEffect(() => {
        window.scrollTo({top: 0})
        if(id){
            renderSurahAyat(parseInt(id))
        }
    
        fetchJuz()
        fetchAllSurahs()
        // fetchAllPages()
   }, [id]) 
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
            <Sidemenu
                juzList={juzList}
                surahList={surahList}
            />
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
        <div className='text-right flex flex-col pb-28  xl:px-96'> 
        {selectedSurah.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <h1 className="arabicText text-center">
              {selectedSurah[0].numberOfSurah }
              <p className='bismillah py-6'>{
                selectedSurah[0].numberOfSurah === 1 || selectedSurah[0].numberOfSurah === 9 
                    ? `` 
                    : `﷽`
                    }
             </p>
            </h1>
            {selectedSurah.map((aya, index) => (
              <div className="flex flex-col text-right  gap-2" key={index}>
                <div className="flex gap-2 text-right  items-center  ">
                  <p className="quran-common text-4xl ">
                    {formattedStyleName(aya.verseNumber)}
                  </p>
                  <p  className=''>
                    { aya.numberOfSurah === 1 
                    ? aya.verseText
                    : aya.numberOfSurah === 27 && aya.verseNumber == 30 
                        ? aya.verseText
                        : aya.verseText.replace('بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ', '')
                    }</p>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Surah

