import React, { useEffect, useState } from 'react'
import { renderPages } from '../apis/quranApi'
import { useParams } from 'react-router-dom'

const Page = () => {
  const [pages, setPages] = useState<any[]>([])
  const {id} = useParams()
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
    return verse.replace(/\u{06DF}/gu, "\u{0652}");
  }
  const renderByPage = async(id: any) => {
    try {
      const response = await renderPages(id)
      console.log(`Fetching pages for Surah number: ${id}`);
      setPages(response)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (id) {
      renderByPage(parseInt(id));
    }
  }, [id])
  return (
    <div className='text-center'>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className=' border-gray-300 mb-8 max-w-[57.5vh] verseText '>
            {page.pageData.map((verse: any, verseIndex: number) => (
                page.suraNumber === 1 
                ? <span key={verseIndex} className='text-[4vh] cursor-pointer hover:text-blue-700 text-uthmani inline-flex leading-relaxed verseText'>{formattedVerse(verse.aya)}   <span className='quran-common pl-1'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>
                : page.suraNumber === 2 && page.pageNumber === 2
                ? <span key={verseIndex} className='text-[4vh] text-uthmani cursor-pointer hover:text-blue-700 leading-relaxed  '>{formattedVerse(verse.aya)}  <span className='quran-common'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>
                : <span key={verseIndex} className='text-[3.2vh] text-uthmani inline leading-loose cursor-pointer hover:text-blue-700 '>{formattedVerse(verse.aya)}   <span className='quran-common'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span>

            ))}
           <p key={`page-${pageIndex}`} className='border-b text-center border-w text-sm py-4'>{page.pageNumber}</p>
        </div>
      ))}
    </div>
  )
}

export default Page
{/* <span key={verseIndex} className='text-[4vh] textUthmani '>{verse.aya}  <span className='quran-common'>{formattedStyleName(verse.ayaNumber.split(":")[1])}</span></span> */}