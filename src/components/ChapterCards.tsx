import React from 'react'
import { Link } from 'react-router-dom'

interface ChapterCardsProps{
    surahList: any[],
    formattedSurahName:(number: number) => string
    filteredSurahList: any[]
    toggleSearch:() => void
}
const ChapterCards: React.FC<ChapterCardsProps> = ({surahList, formattedSurahName, filteredSurahList, toggleSearch}) => {


  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12 dark:text-white'>
        {filteredSurahList.map((sura, index) => (
            <Link to={`/surah/${sura.sura_number}`} onClick={toggleSearch} className='border text-black rounded-xl  shadow-md  px-4' key={index}>
            <div className='flex justify-between items-center px-1 dark:text-white'>
                <div className='flex items-center gap-6'>
                    <div className='border border-black dark:border-white w-8  h-8 transform rotate-45 flex items-center justify-center'>
                        <div className="transform -rotate-45 flex items-center justify-center text-[0.8rem] xl:text-md">
                            {sura.sura_number}
                        </div>
                    </div>
                    <div className='flex flex-col items-start text-left py-1 text-[0.8rem] lg:text-sm'>
                        <p className='font-bold '>{sura.name_simple}</p>
                        <span className='italic '>{sura.english_name}</span>
                        <p>{sura.verses_count} Verses</p>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='arabicFont text-2xl lg:text-4xl'>
                        {formattedSurahName(sura.sura_number)}
                    </p>
                    <p className='arabicText text-xl md:text-4xl'>{sura.revelationPlace === "makkah" ? `135` : `136` }</p>
                </div>
            </div>
        </Link>
        ))}
        
      </div>
  )
}

export default ChapterCards
