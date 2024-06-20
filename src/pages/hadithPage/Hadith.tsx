import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTE } from '../../apis/quranApi'
import { HadithChapter, getHadithLists } from '../../apis/hadithApi'
import { Link } from 'react-router-dom'

const Hadith = () => {
  const [chapters, setChapters] = useState<HadithChapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const fetchSeerah = async () => {
    try {
      setLoading(true); 
      const response = await getHadithLists();
      console.log(response);
      setChapters(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchSeerah();
  }, []);
  return (
    <div className='flex flex-col gap-10 h-full w-full pb-20  items-start mt-32 px-4 lg:px-20 '> 
       <div>
          <h2 className='text-4xl font-bold'>Sahih Al-Bukhari</h2>
          <p className='text-sm'>
            {loading ? 'Loading chapters...' : `${chapters.length} CHAPTERS`}
          </p>
      </div>
      {chapters.map((chapter: HadithChapter) => (
        <Link to={`/hadith/sahih-bukhari/chapter/${chapter.chapterNumber}`} className='flex gap-2 text-lg font-bold hover:text-blue-600 hover:underline'>
            <p>{chapter.chapterNumber}.</p>
            <div className='flex flex-col gap-1'>
              <p>{chapter.chapterEnglish}</p>
              <p>{chapter.chapterArabic}</p>
            </div>
        </Link>
      ))}
    </div>
  )
}

export default Hadith
