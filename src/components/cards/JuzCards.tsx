import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'


interface JuzCardsProps{
    filteredJuzList: any[]
    surahJuz: any[]
}


const JuzCards: React.FC<JuzCardsProps> = ({surahJuz, filteredJuzList}) => {
    const longAyat = [14, 15, 17, 18, 26, 28, 29, 30]
    const formattedVerse = (verse: any) => {
        verse = verse.replace(/\u{06DF}/gu, "\u{0652}");
        verse = verse.replace(/\u{06EB}/gu, "\u{06EC}"); 
        return verse;
      }
  return (
    <div className='grid md:grid-cols-3 gap-8 pb-12'>
    {filteredJuzList.map((juz, index) => (
     <Link to={`/juz/${juz.juzNum}`} className='border rounded-lg border-green-800  px-4' key={index}>
        <div className='flex justify-between items-center px-1'>
            <div className='flex flex-col items-start text-left text-sm md:text-base  py-2'>
                    <p className='font-bold'>Juz {juz.juzNum}</p>
                    <p>{juz.text.verse_key}</p> 
            </div>
            <div className='flex flex-col items-end'>
            <p className='arabicText text-2xl text-slate-900 font-bold'>{juz.text.verse_key.split(':')[0]}</p> 
            <p className='text-uthmani text-sm md:text-xl font-bold'>
                {longAyat.includes(juz.text.text_uthmani)
                    ? formattedVerse(juz.text.text_uthmani.slice(40, 80))
                    : juz.text.text_uthmani.length > 20
                        ? formattedVerse(juz.text.text_uthmani.slice(0,40))
                        : formattedVerse(juz.text.text_uthmani)
                }
            </p>
            </div>
        </div>
    </Link>
    ))} 
  </div>
  )
}

export default JuzCards
