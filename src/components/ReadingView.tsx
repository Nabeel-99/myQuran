import React from 'react'

interface ReadingProps{
    pageIndex: any
    page: any
    formattedVerse:(verse: any) => string
    formattedStyleName:(verse:any) => string
}
const ReadingView:React.FC<ReadingProps> = ({page, pageIndex, formattedStyleName, formattedVerse}) => {
  return (
    <div className='text-center md:max-w-[60.5vh]   lg:max-w-[57.5vh] '>
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
    </div>
  )
}

export default ReadingView
