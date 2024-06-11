import React, { useState } from 'react'
import Options from './Options'
import axios from 'axios'
import { API_ROUTE } from '../apis/quranApi'


interface ReadingProps{
    pageIndex: any
    page: any
    formattedVerse:(verse: any) => string
    formattedStyleName:(verse:any) => string
}
const ReadingView:React.FC<ReadingProps> = ({page, pageIndex, formattedStyleName, formattedVerse}) => {

  const [isShowOptions, setIsShowOptions] = useState<number | null>(null)
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({})
  const [isNote, setIsNote] = useState<boolean>(false)
  const showOptions = (verseIndex: any) => {
    setIsShowOptions(isShowOptions === verseIndex ? null : verseIndex)
  }
  const closeOptions = () => {
    setIsShowOptions(null)
  }

  const toggleBookmark = async(verse: any, verseIndex: any) => {
      try {
          const verseId = `${page.suraNumber}:${verse.ayaNumber.split(":")[1]}`
          if(isBookmarked[verseIndex]){
            await axios.delete(`${API_ROUTE}/api/users/delete`, {
              data: {verseId},
              withCredentials: true
            })
            setIsBookmarked((prev) => ({ ...prev, [verseIndex]: false }));
            console.log("removed")
          }else{
            await axios.post(`${API_ROUTE}/api/users/add`, {
              verseId,
              verseText: formattedVerse(verse.aya),
              suraNumber: page.suraNumber,
              pageNumber: page.pageNumber
            }, {withCredentials: true})
            setIsBookmarked((prev) => ({ ...prev, [verseIndex]: true }));
            console.log("added to bookmarks")
          }
      } catch (error) {
        console.log("Bookmar error:", error)
      }
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
                          closeOptions={closeOptions}
                            isBookmarked={isBookmarked[verseIndex]}
                            toggleBookmark={() => toggleBookmark(verse, verseIndex)}
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
                          closeOptions={closeOptions}
                          isBookmarked={isBookmarked[verseIndex]}
                          toggleBookmark={() => toggleBookmark(verse, verseIndex)}
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
                          closeOptions={closeOptions}
                          isBookmarked={isBookmarked[verseIndex]}
                          toggleBookmark={() => toggleBookmark(verse, verseIndex)}
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
