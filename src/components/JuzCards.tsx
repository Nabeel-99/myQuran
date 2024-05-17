import React from 'react'


interface JuzCardsProps{
    surahJuz: any[],
    longAyat: any[]
}
const JuzCards: React.FC<JuzCardsProps> = ({surahJuz, longAyat}) => {
  return (
    <div className='grid md:grid-cols-3 gap-8 pb-12'>
    {surahJuz.map((juz, index) => (
        <button className='border rounded-lg border-green-800  px-4' key={index}>
        <div className='flex justify-between items-center px-1'>
            <div className='flex flex-col items-start text-left text-sm md:text-base  py-2'>
                    <p className='font-bold'>Juz {juz.text.juz}</p>
                    <p>{juz.text.surah.englishName} - {juz.text.surah.number}:{juz.text.numberInSurah}</p>
            </div>
            <p className='uthman-script text-sm md:text-base'>
                {longAyat.includes(juz.text.juz)
                    ? juz.text.text.slice(40, 80)
                    : juz.text.text.length > 20
                        ? juz.text.text.slice(0,40)
                        : juz.text.text
                }
            </p>
        </div>
    </button>
    ))} 
  </div>
  )
}

export default JuzCards
