import React, { useState } from 'react'
import Options from './Options'

interface ReadingProps{
    pageIndex: any
    page: any
    formattedVerse:(verse: any) => string
    formattedStyleName:(verse:any) => string
}
const ReadingView:React.FC<ReadingProps> = ({page, pageIndex, formattedStyleName, formattedVerse}) => {
  const [isShowOptions, setIsShowOptions] = useState<number | null>(null)
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false)
  const [isNote, setIsNote] = useState<boolean>(false)
  const showOptions = (verseIndex: any) => {
    setIsShowOptions(isShowOptions === verseIndex ? null : verseIndex)
  }

  const showNotes = (verseIndex: any) => {
    setIsNote(true)
    
  }
  const closeNotes = (verseIndex: any) => {
    setIsNote(false)
  }
  
  return (
    <div className='text-center md:max-w-[60.5vh]   lg:max-w-[57.5vh] '>
          <div key={pageIndex} className=' border-gray-300 mb-8  verseText '>
              {page.pageData.map((verse: any, verseIndex: number) => (
                  page.suraNumber === 1 
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[4vh] cursor-pointer  text-uthmani inline-flex leading-relaxed verseText'>
                      {formattedVerse(verse.aya)}
                      <span onClick={() => showOptions(verseIndex)} className='relative quran-common hover:text-blue-700'>
                        {formattedStyleName(verse.ayaNumber.split(":")[1])}
                      </span>
                      {isShowOptions === verseIndex &&  (
                          <Options
                            verseIndex={verseIndex}
                            showNotes={showNotes}
                            isNote={isNote}
                            closeNotes={closeNotes}
                          />
                        )}
                    </span>
                  : page.suraNumber === 2 && page.pageNumber === 2
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[3.9vw] lg:text-[4vh] text-uthmani cursor-pointer  leading-relaxed  '>
                      {formattedVerse(verse.aya)}  
                    <span onClick={() => showOptions(verseIndex)} className='relative quran-common hover:text-blue-700'>
                      {formattedStyleName(verse.ayaNumber.split(":")[1])}
                      </span>
                      {isShowOptions === verseIndex &&  (
                          <Options
                            verseIndex={verseIndex}
                            showNotes={showNotes}
                            isNote={isNote}
                            closeNotes={closeNotes}
                          />
                        )}
                    </span>
                  : <span key={verseIndex} className='text-[5.6vw]  md:text-[3.2vh] text-uthmani  leading-loose cursor-pointer   '>
                      {formattedVerse(verse.aya)}   
                      <span onClick={() => showOptions(verseIndex)} className='relative quran-common hover:text-blue-700'>
                        {formattedStyleName(verse.ayaNumber.split(":")[1])}
                        </span>
                        {isShowOptions === verseIndex &&  (
                          <Options
                            verseIndex={verseIndex}
                            showNotes={showNotes}
                            isNote={isNote}
                            closeNotes={closeNotes}
                          />
                        )}
                    </span>
  
              ))}
             <p key={`page-${pageIndex}`} className='border-b text-center border-w text-sm py-4'>{page.pageNumber}</p>
          </div>
    </div>
  )
}

export default ReadingView
