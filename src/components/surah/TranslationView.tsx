import React, { useState, useEffect } from 'react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { TfiWrite } from 'react-icons/tfi';
import axios from 'axios';
import { API_ROUTE } from '../../apis/quranApi';
import OptionsCard from '../cards/OptionsCard';

interface TranslationProps {
  verse: any;
  verseIndex: number;
  formattedVerse: (verse: any) => string;
  formattedStyleName: (verse: any) => string;
  formattedTranslation: (verse: any) => string;
  page: any;
}

const TranslationView: React.FC<TranslationProps> = ({
  verse,
  verseIndex,
  formattedStyleName,
  formattedVerse,
  formattedTranslation,
  page,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<Record<number, boolean>>({});
  const [noteTexts, setNoteTexts] = useState<Record<number, string>>({});
  const [isNote, setIsNote] = useState<Record<number, boolean>>({});
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [showOptions, setShowOptions] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

 const fetchUserBookmarks = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/api/users/bookmarks`, { withCredentials: true });
      const bookmarks = response.data;
      const initialBookmarksState: Record<number, boolean> = {};
      bookmarks.forEach((bookmark: any) => {
        const verseIndex = bookmark.suraNumber * 1000 + bookmark.pageNumber;/* Calculate your verseIndex based on bookmark */;
        initialBookmarksState[verseIndex] = true;
      });
      setIsBookmarked(initialBookmarksState);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
    }
  };

  useEffect(() => {
    fetchUserBookmarks();
  }, []);

  const toggleBookmark = async (verse: any, verseIndex: number) => {
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
        await axios.post(`${API_ROUTE}/api/users/add`, {
          verseId,
          verseText: formattedVerse(verse.aya),
          suraNumber: page.suraNumber,
          pageNumber: page.pageNumber,
        }, { withCredentials: true });
        setIsBookmarked((prev) => ({ ...prev, [verseIndex]: true }));
        setSuccessMessage("Added to bookmarks");
      }
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Bookmark error:", error);
    }
  };

  const setNoteText = (verseIndex: number, text: string) => {
    setNoteTexts({ ...noteTexts, [verseIndex]: text });
  };

  const saveNote = async (noteText: string) => {
    const verseId = `${page.suraNumber}:${verse.ayaNumber.split(":")[1]}`;
    try {
      const response = await axios.post(`${API_ROUTE}/api/users/add-notes`, {
        verseId,
        verseText: formattedVerse(verse.aya),
        verseTranslation: formattedTranslation(verse.translation),
        suraNumber: page.suraNumber,
        note: noteText,
      }, { withCredentials: true });
      if (response.status === 201) {
        setNotes({ ...notes, [verseIndex]: response.data._id });
        setIsNote({ ...isNote, [verseIndex]: false });
        setSuccessMessage("Note saved");
      }
      setTimeout(() => setSuccessMessage(null), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Save note error:", error);
      setIsNote({ ...isNote, [verseIndex]: true });
    }
  };

  const showNotes = (verseIndex: number) => {
    setIsNote({ ...isNote, [verseIndex]: true });
  };

  const closeNotes = (verseIndex: number) => {
    setIsNote({ ...isNote, [verseIndex]: false });
  };

  return (
    <div translate='no' lang='ar' key={verseIndex} className='border-b py-4 text-uthmani flex gap-4 leading-relaxed '>
      <div className='hidden md:flex flex-col gap-4'>
        <button className='hover:text-blue-500' title='bookmark' onClick={() => toggleBookmark(verse, verseIndex)}>
          {isBookmarked[verseIndex] ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        <button className='hover:text-blue-500' title='note' onClick={() => setShowOptions(verseIndex)}>
          <TfiWrite />
        </button>
      </div>
      <div className='flex flex-col gap-4 w-full justify-center'>
        <div className='flex md:hidden gap-4'>
          <button className='hover:text-blue-500' title='bookmark' onClick={() => toggleBookmark(verse, verseIndex)}>
            {isBookmarked[verseIndex] ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <button className='hover:text-blue-500' title='note' onClick={() => setShowOptions(verseIndex)}>
            <TfiWrite />
          </button>
        </div>
        <div className='flex items-end start dark:text-white verseText text-[5.9vw] md:text-[4vh]'>
          <span className='xl:pl-8 text-uthmani'>
            {formattedVerse(verse.aya)}
            <span className='quran-common hover:text-blue-700'>
              {formattedStyleName(verse.ayaNumber.split(":")[1])}
            </span>
          </span>
        </div>
        <div className='xl:text-2xl flex text-left xl:ml-10 py-4'>
          <p>{formattedTranslation(verse.translation)}</p>
        </div>
      </div>
      {showOptions === verseIndex && (
        <OptionsCard
          verseIndex={verseIndex}
          noteText={noteTexts[verseIndex] || ''}
          setNoteText={(text: any) => setNoteText(verseIndex, text)}
          showNotes={showNotes}
          isNote={isNote[verseIndex] || false}
          closeNotes={closeNotes}
          toggleBookmark={() => toggleBookmark(verse, verseIndex)}
          isBookmarked={isBookmarked[verseIndex] || false}
          closeOptions={() => setShowOptions(null)}
          saveNote={(noteText : any) => saveNote(noteText)}
        />
      )}
      {successMessage && <div className='absolute top-0 right-0 bg-green-500 text-white p-2 rounded'>{successMessage}</div>}
    </div>
  );
};

export default TranslationView;
