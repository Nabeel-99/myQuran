import React from 'react'

interface TranslationProps{
    verse: any
    verseIndex: any
    formattedVerse:(verse: any) => string
    formattedStyleName:(verse: any) => string
    formattedTranslation:(verse: any) => string
}
const TranslationView:React.FC<TranslationProps> = ({
        verse, 
        verseIndex, 
        formattedStyleName,
        formattedVerse,
        formattedTranslation
    }) => {
  return (
        <div key={verseIndex} className='border-b py-4 text-uthmani flex gap-4 leading-relaxed'>
            <div className='hidden md:flex flex-col gap-4'>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
            </div>
            <div className='flex flex-col gap-4 w-full justify-center'>
                <div className='flex md:hidden  gap-4'>
                    <button>2</button>
                    <button>3</button>
                    <button>4</button>
                    <button>5</button>
            </div>
                    <div className='flex items-end start verseText text-[5.9vw] md:text-[4vh]'>
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
        </div>
  )
}

export default TranslationView
