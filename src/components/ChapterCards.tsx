import React from 'react'

interface ChapterCardsProps{
    surahList: any[],
    formattedSurahName:(number: number) => string
}
const ChapterCards: React.FC<ChapterCardsProps> = ({surahList, formattedSurahName}) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
        {surahList.map((sura) => (
            <button className='border rounded-lg border-green-800 bg-[#0a1510] px-4'>
            <div className='flex justify-between items-center px-1'>
                <div className='flex items-center gap-6'>
                    <div className='border w-10 h-10 transform rotate-45 flex items-center justify-center'>
                        <div className="transform -rotate-45 flex items-center justify-center text-xl">
                            {sura.number}
                        </div>
                    </div>
                    <div className='flex flex-col items-start  py-2'>
                        <p className='font-bold'>{sura.englishName}</p>
                        <span className='italic text-sm'>({sura.englishNameTranslation})</span>
                        <p>{sura.numberOfAyahs} Verses</p>
                        <p>{sura.revelationType}</p>
                    </div>
                </div>
                <div className='flex flex-col items-end'>
                    <p className='arabicFont text-4xl'>
                        {formattedSurahName(sura.number)}
                    </p>
                    <p className='arabicText text-4xl'>135</p>
                </div>
            </div>
        </button>
        ))} 
      </div>
  )
}

export default ChapterCards
