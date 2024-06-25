import React, { FormEvent, useState } from 'react'
import Options from '../cards/OptionsCard'
import axios from 'axios'
import { API_ROUTE } from '../../apis/quranApi'


interface ReadingProps{
    pageIndex: any
    page: any
    formattedVerse:(verse: any) => string
    formattedStyleName:(verse:any) => string
    formattedTranslation:(verse: any) => string
}
const ReadingView:React.FC<ReadingProps> = ({page, pageIndex, formattedStyleName, formattedVerse, formattedTranslation}) => {

  const [isShowOptions, setIsShowOptions] = useState<number | null>(null)
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({})
  const [isNote, setIsNote] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [noteTexts, setNoteTexts] = useState<Record<number, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const showOptions = (verseIndex: any) => {
    setIsShowOptions(isShowOptions === verseIndex ? null : verseIndex)
  }
  const closeOptions = () => {
    setIsShowOptions(null)
  }

  const toggleBookmark = async (verse: any, verseIndex: any) => {
    try {
      const verseId = `${page.suraNumber}:${verse.ayaNumber.split(":")[1]}`;
      if (isBookmarked[verseIndex]) {
        // Unbookmark the verse
        await axios.delete(`${API_ROUTE}/api/users/delete`, {
          data: { verseId },
          withCredentials: true,
        });
        setIsBookmarked((prev) => ({ ...prev, [verseIndex]: false }));
        setSuccessMessage("Removed from bookmarks");
      } else {
        // Bookmark the verse
        await axios.post(
          `${API_ROUTE}/api/users/add`,
          {
            verseId,
            verseText: formattedVerse(verse.aya),
            suraNumber: page.suraNumber,
            pageNumber: page.pageNumber,
          },
          { withCredentials: true }
        );
        setIsBookmarked((prev) => ({ ...prev, [verseIndex]: true }));
        setSuccessMessage("Added to bookmarks");
      }
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.log("Bookmark error:", error);
    }
  };

  const setNoteText = (verseIndex: number, text: string) => {
    setNoteTexts({ ...noteTexts, [verseIndex]: text });
  };

  const saveNote = async (verse: any, verseIndex: any, noteText: string) => {
    const verseId = `${page.suraNumber}:${verse.ayaNumber.split(":")[1]}`;
    try {
      const response = await axios.post(
        `${API_ROUTE}/api/users/add-notes`,
        {
          verseId,
          verseText: formattedVerse(verse.aya),
          verseTranslation: formattedTranslation(verse.translation),
          suraNumber: page.suraNumber,
          note: noteText,
        },
        { withCredentials: true }
      );
      if (response.status === 201) {
        setNotes({ ...notes, [verseIndex]: response.data._id });
        setIsNote({ ...isNote, [verseIndex]: false });
        setSuccessMessage("Note saved");
      }
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.log(error);
      setIsNote({ ...isNote, [verseIndex]: true });
    }
  };

  const showNotes = (verseIndex: any) => {
    setIsNote({...isNote, [verseIndex]: true})
    
  }
  const closeNotes = (verseIndex: any) => {
    setIsNote({...isNote, [verseIndex]: false})
   
  }
  
  return (
    <div translate='no' lang='ar' className='text-center md:max-w-[60.5vh]   lg:max-w-[57.5vh] '>
          <div key={pageIndex} className=' border-gray-300 mb-8  verseText dark:text-white '>
              {page.pageData.map((verse: any, verseIndex: number) => (
                  page.suraNumber === 1 
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[4vh] cursor-pointer  text-uthmani inline-flex leading-relaxed verseText'>
                      {formattedVerse(verse.aya)}
                      <span onClick={() => showOptions(verseIndex)} className=' quran-common hover:text-blue-700'>
                        {formattedStyleName(verse.ayaNumber.split(":")[1])}
                      </span>
                      {isShowOptions === verseIndex &&  (
                            <Options
                            closeOptions={closeOptions}
                            noteText={noteTexts[verseIndex] || ''}
                            setNoteText={(text: string) => setNoteText(verseIndex, text)}
                              isBookmarked={isBookmarked[verseIndex]}
                              toggleBookmark={() => toggleBookmark(verse, verseIndex)}
                              verseIndex={verseIndex}
                              showNotes={showNotes}
                              isNote={isNote[verseIndex]}
                              closeNotes={closeNotes}
                              saveNote={(noteText: string) => saveNote(verse, verseIndex, noteText)}
                            />
                        )}
                    </span>
                  : page.suraNumber === 2 && page.pageNumber === 2
                  ? <span key={verseIndex} className='text-[5.9vw] md:text-[3.9vw] lg:text-[4vh] text-uthmani cursor-pointer  leading-relaxed  '>
                      {formattedVerse(verse.aya)}  
                    <span onClick={() => showOptions(verseIndex)} className=' quran-common hover:text-blue-700'>
                      {formattedStyleName(verse.ayaNumber.split(":")[1])}
                      </span>
                      {isShowOptions === verseIndex &&  (
                           <Options
                           closeOptions={closeOptions}
                           noteText={noteTexts[verseIndex] || ''}
                           setNoteText={(text: string) => setNoteText(verseIndex, text)}
                             isBookmarked={isBookmarked[verseIndex]}
                             toggleBookmark={() => toggleBookmark(verse, verseIndex)}
                             verseIndex={verseIndex}
                             showNotes={showNotes}
                             isNote={isNote[verseIndex]}
                             closeNotes={closeNotes}
                             saveNote={(noteText: string) => saveNote(verse, verseIndex, noteText)}
                           />
                        )}
                    </span>
                  : <span key={verseIndex} className='text-[5.6vw]  md:text-[3.2vh] text-uthmani  leading-loose cursor-pointer   '>
                      {formattedVerse(verse.aya)}   
                      <span onClick={() => showOptions(verseIndex)} className=' quran-common hover:text-blue-700'>
                        {formattedStyleName(verse.ayaNumber.split(":")[1])}
                        </span>
                        {isShowOptions === verseIndex &&  (
                           <Options
                           closeOptions={closeOptions}
                           noteText={noteTexts[verseIndex] || ''}
                           setNoteText={(text: string) => setNoteText(verseIndex, text)}
                             isBookmarked={isBookmarked[verseIndex]}
                             toggleBookmark={() => toggleBookmark(verse, verseIndex)}
                             verseIndex={verseIndex}
                             showNotes={showNotes}
                             isNote={isNote[verseIndex]}
                             closeNotes={closeNotes}
                             saveNote={(noteText: string) => saveNote(verse, verseIndex, noteText)}
                           />
                        )}
                    </span>
  
              ))}
             <p key={`page-${pageIndex}`} className='border-b text-center border-w text-sm py-4'>{page.pageNumber}</p>
             {successMessage && (
        <div className='bg-green-500 text-white p-2 rounded'>
          {successMessage}
        </div>
      )}
          </div>
    </div>
  )
}

export default ReadingView
