import React, { useEffect } from 'react'


interface JuzCardsProps{
    surahJuz: any[],
    longAyat: any[],
    formattedSurahName:(surahNumber: number) => string
}

const JuzCards: React.FC<JuzCardsProps> = ({surahJuz, longAyat, formattedSurahName}) => {

  return (
    <div className='grid md:grid-cols-3 gap-8 pb-12'>
    {surahJuz.map((juz, index) => (
        <button className='border rounded-lg border-green-800  px-4' key={index}>
        <div className='flex justify-between items-center px-1'>
            <div className='flex flex-col items-start text-left text-sm md:text-base  py-2'>
                    <p className='font-bold'>Juz {juz.juzNum}</p>
                    <p>{juz.text.verse_key}</p> 
            </div>
            <div className='flex flex-col items-end'>
            <p className='arabicText text-lg'>{juz.text.verse_key.split(':')[0]}</p> 
            <p className='uthman-script text-sm md:text-base'>
                {longAyat.includes(juz.text.text_uthmani_simple)
                    ? juz.text.text_uthmani_simple.slice(40, 80)
                    : juz.text.text_uthmani_simple.length > 20
                        ? juz.text.text_uthmani_simple.slice(0,40)
                        : juz.text.text_uthmani_simple
                }
            </p>
            </div>
        </div>
    </button>
    ))} 
  </div>
  )
}

export default JuzCards
