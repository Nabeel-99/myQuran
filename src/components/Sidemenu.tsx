import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface SideMenuProps{
    juzList: any[]
    surahList: any[]
    closeSideMenu:() => void
}

const Sidemenu: React.FC<SideMenuProps> = ({juzList, surahList, closeSideMenu}) => {
      const [isSurah, setIsSurah] = useState<boolean>(true)
      const [isJuz, setIsJuz] = useState<boolean>(false)
      
    const formattedSurahName = (surahNumber: number) => {
        if(surahNumber > 99){
            return `${surahNumber}`
        }else if (surahNumber > 9){
            return `0${surahNumber}`
        }else{
            return `00${surahNumber}`
        }
    }
    const showSurah = () => {
        setIsSurah(true)
        setIsJuz(false)
    }
    const showJuz = () => {
        setIsJuz(true)
        setIsSurah(false)
    }
   

  return (
    <div className='flex flex-col gap-4 w-full h-full pb-20 px-4 pt-2'>
                <p>Chapter and Juz Lists</p>
                <div className='text-sm flex flex-col gap-2'>
                    <p>Navigate with Text</p>
                    <input className='border px-3 rounded-full py-1' placeholder='e.g Al-fatihah, pg 49 ...'/>
                </div>
                <div className='flex gap-8 text-sm'>
                    <button onClick={showSurah} className='border px-2 py-1 rounded-full w-full'>Chapter (114)</button>
                    <button onClick={showJuz} className='border px-2 py-1 rounded-full w-full'>Juz (30)</button>
                </div>
             
                {/* surah List */}
                {isJuz ? (
                    <div className='grid grid-flow-row gap-4 h-screen overflow-scroll pb-20'>
                    {juzList.map((juz, index) => (
                        <button className='bg-white hover:bg-gray-100 border rounded-lg border-transparent px-4 flex w-full  justify-between' key={index}>
                            <p className=''>Juz {juz.juzNum}</p>
                            <p className='text-md  arabicText'>{juz.text.verse_key.split(":")[0]}</p> 
                        </button>
               ))}
               </div>
                ) : 
                <div className='grid grid-flow-row gap-4 h-screen overflow-scroll pb-20'>
                    {surahList.map((sura, index) => (
                    <Link to={`/surah/${sura.sura_number}`} onClick={closeSideMenu} className='bg-white hover:bg-gray-100 border rounded-lg border-transparent px-4 flex w-full justify-between' key={index}>
                    <div className='flex gap-2'>
                        <p className=''>{sura.sura_number}</p> 
                        <p className='pl-2'>{sura.name_simple}</p>
                        </div>
                    <div className='flex flex-col'>
                        <p className='arabicFont text-xl'>{formattedSurahName(sura.sura_number)}</p>
                     </div>
                    </Link>
                    ))}
                </div>
                }
                
            </div>
  )
}

export default Sidemenu
