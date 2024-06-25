import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Hadiths } from '../../types/types'
import { getHadithChapters } from '../../apis/hadithApi'


interface ChapterHeader {
    chapterNumber: number
    chapterEnglish: string
    chapterArabic: string
}
const HadithView = () => {
    const {id} = useParams<{id: string | undefined}>()
    const [hadiths, setHadiths] = useState<Hadiths[]>([])
    const [chapterHeader, setChapterHeader] = useState<ChapterHeader | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [currentChapter, setCurrentChapter] = useState<number>(0)
    const navigate = useNavigate()
    const fetchHadith = async(id: number) => {
        try {
            setLoading(true)
            const response = await getHadithChapters(id)
            if (response.length > 0){
                const {chapterNumber, chapterArabic, chapterEnglish} = response[0]
                setChapterHeader({chapterArabic, chapterEnglish, chapterNumber})
                setHadiths(response)
            }
        } catch (error) {
            console.log(error)
        } finally{
            setLoading(false)
        }
    }
    const nextChapter = () => {
        const nextChapterNumber = currentChapter + 1
        setCurrentChapter(nextChapterNumber)
        navigate(`/hadith/sahih-bukhari/chapter/${nextChapterNumber}`)
    }

    const previousChapter = () => {
        const previousChapterNumber = currentChapter - 1
        setCurrentChapter(previousChapterNumber)
        navigate(`/hadith/sahih-bukhari/chapter/${previousChapterNumber}`)
    }
    useEffect(() => {
        if(id){
            const idNumber = parseInt(id)
            setCurrentChapter(idNumber)
            fetchHadith(idNumber)
        }
    }, [id])
  return (
    <div className='flex flex-col gap-10 h-full w-full pb-20  items-center mt-32 px-4 lg:px-20 '>
        {loading ? (
            <div className='flex items-center justify-center'><FaSpinner className='spin'/></div>
        ) : (
            <div className='flex flex-col items-center'>
                {chapterHeader && (
                    <div className='flex flex-col items-center gap-6'>
                        <Link className=' hover:text-blue-500 cursor-pointer' to={"/hadith"}>Back to list</Link>
                        <div className='flex flex-col pb-8  gap-2 items-center text-xl font-bold'>
                            <p className=''>Chapter {chapterHeader.chapterNumber}</p>
                            <p className='text-uthmani text-2xl'>{chapterHeader.chapterArabic}</p>
                            <p>{chapterHeader.chapterEnglish}</p>
                        </div>
                    </div>
            )}
            <div className='flex flex-col gap-8 lg:px-20'>
                {hadiths.map((hadith: Hadiths) => (
            <div className='border-container dark:bg-[#141414] bg-[#f2f2f2] shadow-md  border-green-900 rounded-md p-7 flex flex-col gap-8' key={hadith.id}>
                <div className='text-center flex flex-col gap-2'>
                    <p className='underline font-bold'>{hadith.headingEnglish}</p>
                    <p className='font-bold'>{hadith.headingArabic}</p>
                    <p className='text-gray-500 text-sm italic'>REFERENCE: {hadith.book}, Hadith {hadith.hadithNumber}</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='verseText leading-8 text-lg '>{hadith.hadithArabic}</p>
                    <p>{hadith.englishNarrator} {hadith.hadithEnglish}</p>
                </div>
            </div>
        ))}
            </div>
            <div className='flex gap-4 pt-8'>
                {currentChapter !== 1 && (
                     <button onClick={previousChapter} className='flex border hover:bg-gray-800 px-4 py-1 text-white bg-black rounded-lg shadow-sm '>Previous Chapter</button>
                )}
                {currentChapter !== 99 && ( 
                     <button onClick={nextChapter} className='flex border hover:bg-gray-800 px-4 py-1 text-white bg-black rounded-lg shadow-sm '>Next Chapter</button>
                )}
             </div>
            </div>  
        )} 
   
    </div>
  )
}

export default HadithView
