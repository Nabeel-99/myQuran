import React, { useEffect, useRef, useState } from 'react'
import { FaCaretRight, FaPlay, FaReadme } from 'react-icons/fa'
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import { CgReadme } from "react-icons/cg";
import { RxReader } from "react-icons/rx";
import {  getSurahLists, fetchAllJuz,fetchAyat, fetchSurahTranslation, playChapter } from '../apis/quranApi';
import Sidemenu from '../components/surah/Sidemenu';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Page from '../components/surah/Page';
import { BsThreeDots } from 'react-icons/bs';
import { FaXmark } from 'react-icons/fa6';
import SidePanel from '../components/surah/SidePanel';

const Surah = () => {

    const [surahList, setSurahList] = useState<any[]>([])
    const [juzList, setJuzList] = useState<any[]>([])
    const [selectedSurah, setSelectedSurah] = useState<any[]>([])
    const { id } = useParams<{id: string | undefined}>()
    const { juzId } = useParams<{juzId: string | undefined}>()
    const [isReadingView, setIsReadingView] = useState<boolean>(true)
    const [isTranslationView, setIsTranslationView] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isSidePanel, setIsSidePanel] = useState<boolean>(false)
    const [audioUrl, setAudioUrl] = useState<string>('')
    const [reciterId, setReciterId] = useState<number>(2)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    
    const handlePlayAudio = async () => {
        try{
            const surahId = selectedSurah[0].verseNumber.split(":")[0]
            const audioFile = await playChapter(reciterId, surahId)
            setAudioUrl(audioFile)
            setIsPlaying(true)
        }catch(error){
            console.log(error)
        }
    }

    const clearAudioUrl = () => {
        setAudioUrl('');
        setIsPlaying(false);
    };
    const toggleTranslationView = () => {
        setIsTranslationView(true)
        setIsReadingView(false)
    }
    const toggleReadingView = () => {
        setIsReadingView(true)
        setIsTranslationView(false)
    }

    const openSideMenu = () => {
        setIsOpen(!isOpen)
    }

    const closeSideMenu = () => {
        setIsOpen(false)
    }
    const openSidePanel = () => {
        setIsSidePanel(!isSidePanel)
    }
    const closeSidePanel = () => {
        setIsSidePanel(false)
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

    const fetchJuzData = async(juzId: number) => {
        try {
            const response = await fetchAllJuz()
            const juzData = response.find((juz) => juz.juzNum === juzId)
            if(juzData){
                const surahId = parseInt(juzData.text.verse_key.split(":")[0])
                const ayahId = parseInt(juzData.text.verse_key.split(":")[1])
                await renderSurahAyat(surahId)

              
            }
        } catch (error) {
            console.log(error)
        }
    }
   useEffect(() => {
        if(id){
            renderSurahAyat(parseInt(id))
        }
        if(juzId){
            fetchJuzData(parseInt(juzId))
        }
        fetchJuz()
        fetchAllSurahs()
        // fetchAllPages()
   }, [id, juzId]) 

 
  return (
    <div className='flex h-full w-full'>
        {/* side navigation */}
      <div className={` bg-white dark:bg-[#232528] border-t  fixed top-16 rounded-tr transition-all duration-700 ${isOpen ? ' w-72 h-full border-r ' : ''}`} >
        <div className={`flex  ${isOpen ? 'justify-end' : 'justify-start'}`}>
            <button onClick={openSideMenu} title='open-navigation' className=' bg-gray-300 dark:bg-[#232528] px-3 py-2 rounded-tr border hover:transition hover:duration-700 hover:border-[#646cff] cursor-pointer'>
                {isOpen ? <PiCaretLeftLight /> : <PiCaretRightLight />}
            </button>
        </div>
        {isOpen && (
            <Sidemenu
                juzList={juzList}
                surahList={surahList}
                closeSideMenu={closeSideMenu}
            />
        )}
      </div>
      {/* extra side MEnu */}
      <div className={`hidden md:block bg-white dark:bg-[#232528] border-t fixed top-16 right-0 rounded-tr transition-all duration-700 ${isSidePanel ? ' w-72 h-full border-l ' : ''}`} >
        <div className={`hidden md:flex  ${isSidePanel ? 'justify-start' : 'justify-start'}`}>
            <button onClick={openSidePanel} title='open-navigation' className=' bg-gray-300 dark:bg-[#232528] px-3 py-2 rounded-tr border hover:transition hover:duration-700 hover:border-[#646cff] cursor-pointer'>
                {isSidePanel ? <FaXmark /> : <BsThreeDots />}
            </button>
        </div>
        {isSidePanel && (
            <SidePanel/>
        )}
      </div>
      {/* main content */}
      <div className='flex flex-col gap-10 items-center w-screen mx-auto pt-28'>
        {/* toggle page layout */}
            <div className='shadow-sm border py-2  p-1 rounded-full flex flex-col gap-3 items-center justify-between w-96 bg-gray-50 dark:bg-[#1e1f20]'>
                <p className='text-sm'>Page Layout</p>
               <div className='flex justify-between w-full px-14 gap-2'>
                    <button onClick={toggleReadingView} className='flex items-center gap-2 border px-6 py-1 bg-white dark:bg-[#222222] rounded-full'><CgReadme /> Reading</button>
                    <button onClick={toggleTranslationView} className='flex items-center border gap-2 px-6 py-1 hover:border dark:bg-[#222222] rounded-full'><RxReader />Translation</button>
               </div>
            </div>
        {/* Surah Name */}
        <div className='text-right flex flex-col w-full pb-28 px-8 xl:px-44 '> 
        {selectedSurah.length > 0 && (
          <div className="flex flex-col items-center gap-4">
            <button onClick={handlePlayAudio} className='flex gap-2 items-center px-2 rounded-sm py-1 text-blue-600 hover:bg-blue-300'>
                <FaPlay/>
                <p>Play Audio</p>
            </button>
            {audioUrl && (
                <div className='fixed w-full z-10 bottom-0 '>
                     <audio autoPlay controls className='w-full'>
                        <source src={audioUrl} type='audio/mp3'/>
                    </audio>
                </div>
            )}
            <h1 className="arabicText text-center">
               {selectedSurah[0].verseNumber.split(":")[0]}
              <p className='bismillah py-6'>{
                selectedSurah[0].verseNumber.split(":")[0] === "1" || selectedSurah[0].verseNumber.split(":")[0] === "9" 
                    ? `` 
                    : `﷽`
                    }
             </p>
            </h1>
        
            <Page
                clearAudioUrl={clearAudioUrl}
                isReadingView={isReadingView}
                isTranslationView={isTranslationView}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  )
}

export default Surah

