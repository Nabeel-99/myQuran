import React, { useEffect, useState } from 'react'
import { fetchSurahTranslation, renderPages } from '../apis/quranApi'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import TranslationView from './TranslationView'
import ReadingView from './ReadingView'

interface PageProps{
  isReadingView: boolean,
  isTranslationView: boolean
}
const Page:React.FC<PageProps> = ({isReadingView, isTranslationView}) => {
  const [pages, setPages] = useState<any[]>([])
  const { id: idParam } = useParams<{id: string | undefined}>()
  const id = idParam || ''
  const [currentSurah, setCurrentSurah] = useState<number>(parseInt(id, 10))
  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState<boolean>(false)
  const [translations, setTranslations] = useState<any[]>([])
  const formattedStyleName = (surahNumber: number) => {
    if(surahNumber > 99){
        return `${surahNumber}`
    }else if (surahNumber > 9){
        return `0${surahNumber}`
    }else{
        return `00${surahNumber}`
    }
}


const formattedVerse = (verse: any) => {
  verse = verse.replace(/\u{06DF}/gu, "\u{0652}");
  verse = verse.replace(/\u{06EB}/gu, "\u{06EC}"); 
  return verse;
}


  const formattedTranslation = (translation: any) => {
    return translation.replace(/<sup foot_note=\d+>(\d+)<\/sup>?/g, "")
  }
  const renderByPage = async(id: any) => {
    try {
      setisLoading(true)
      const response = await renderPages(id)
      setPages(response)
      setTranslations(response)
    } catch (error) {
      console.log(error)
    } finally{
      setisLoading(false)
    }
  }
  
  const nextSurah = async() => {
      const nextSurahNumber = currentSurah + 1
      setCurrentSurah(nextSurahNumber)
      navigate(`/surah/${nextSurahNumber}`)
      renderByPage(nextSurahNumber)
  }

  const prevSurah = async() => {
    const prevSurahNumber = currentSurah - 1
    setCurrentSurah(prevSurahNumber)
    navigate(`/surah/${prevSurahNumber}`)
    renderByPage(prevSurahNumber)
  }
  useEffect(() => {
    const surahNumber = parseInt(id, 10)
    renderByPage(surahNumber)
    setCurrentSurah(surahNumber)
    // fetchTranslations(surahNumber)
  }, [id])
  return (
    <div className='flex flex-col items-center w-full   md:  '>
      {isLoading ? (
          <div className='flex items-center justify-center'><FaSpinner className='spin'/></div>
      ) : (
        <>
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className={`border-gray-300 mb-8 flex flex-col w-full $ `}>
              {page.pageData.map((verse: any, verseIndex: number) => (
               <div key={verseIndex}>
                  {isTranslationView && (
                     <TranslationView
                     verse={verse}
                     verseIndex={verseIndex}
                     formattedVerse={formattedVerse}
                     formattedStyleName={formattedStyleName}
                     formattedTranslation={formattedTranslation}
                   />
                  )}
               </div>
               
              ))}
              <div key={pageIndex} className='flex items-center w-full justify-center'>
                {isReadingView && (
                    <ReadingView
                      pageIndex={pageIndex}
                      page={page}
                      formattedVerse={formattedVerse}
                      formattedStyleName={formattedStyleName}
                    />
                )}
              </div>
          </div>
        ))}
        <div className='flex items-center justify-center gap-4'>
          {currentSurah === 1 ? '' : (
             <button onClick={prevSurah} className='bg-gray-200 border px-3 py-1 rounded-md'>Previous Surah</button>
          )}
           {currentSurah === 114 ? '' : (
              <button onClick={nextSurah} className='bg-gray-200 border px-3 py-1 rounded-md'>Next Surah</button>
           )}
        </div>
        </>
      )}
    </div>
  )
}

export default Page
{/* <span key={verseIndex} className='text-[4vh] textUthmani '>{verse.aya}  <span className='quran-common'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span> */}

/*  <div className='text-center md:max-w-[60.5vh]   lg:max-w-[57.5vh] '>
      {isLoading ? (
          <div><FaSpinner className='spin'/></div>
      ) : (
        <>
        {pages.map((page, pageIndex) => (
          <div key={pageIndex} className=' border-gray-300 mb-8  verseText '>
              {page.pageData.map((verse: any, verseIndex: number) => (
                  page.suraNumber === 1 
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[4vh] cursor-pointer  text-uthmani inline-flex leading-relaxed verseText'>{formattedVerse(verse.aya)}   <span className='quran-common hover:text-blue-700'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>
                  : page.suraNumber === 2 && page.pageNumber === 2
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[3.9vw] lg:text-[4vh] text-uthmani cursor-pointer  leading-relaxed  '>{formattedVerse(verse.aya)}  <span className='quran-common hover:text-blue-700'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>
                  : <span key={verseIndex} className='text-[5.6vw]  md:text-[3.2vh] text-uthmani  leading-loose cursor-pointer   '>{formattedVerse(verse.aya)}   <span className='quran-common hover:text-blue-700'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>
  
              ))}
             <p key={`page-${pageIndex}`} className='border-b text-center border-w text-sm py-4'>{page.pageNumber}</p>
          </div>
        ))}
        <div className='flex items-center justify-center gap-4'>
          {currentSurah === 1 ? '' : (
             <button onClick={prevSurah} className='bg-gray-200 border px-3 py-1 rounded-md'>Previous Surah</button>
          )}
           {currentSurah === 114 ? '' : (
                  <button onClick={nextSurah} className='bg-gray-200 border px-3 py-1 rounded-md'>Next Surah</button>
           )}
        </div>
        </>
      )}
     
    </div>*/