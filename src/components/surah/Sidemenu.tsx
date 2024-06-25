import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface SideMenuProps{
    surahList: any[]
    closeSideMenu:() => void
}

const Sidemenu: React.FC<SideMenuProps> = ({surahList, closeSideMenu}) => {

      const [searchValue, setSearchValue] = useState<string>('')
      const [filteredSurahList, setFilteredSurahList] = useState<any[]>(surahList)
    const formattedSurahName = (surahNumber: number) => {
        if(surahNumber > 99){
            return `${surahNumber}`
        }else if (surahNumber > 9){
            return `0${surahNumber}`
        }else{
            return `00${surahNumber}`
        }
    }
    const searchSurah = (searchValue: any) => {
       const chapters = surahList.filter((sura: any) => 
            sura.name_simple.toLowerCase().replace(/[^a-z0-9]/g, '')
                .includes(searchValue.replace(/[^a-z0-9]/g, '').toLowerCase())
        )
        setFilteredSurahList(chapters)
    }


    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearchValue(value)
        searchSurah(value)
    }
 
   

  return (
    <div className='flex flex-col gap-4 w-full h-full   pb-20 px-4  bg-white   dark:bg-[#232528]'>
                <div className='text-sm flex flex-col gap-2 font-sans'>
                    <p className=''>Navigate with Text</p>
                    <input 
                        value={searchValue}
                        onChange={handleSearchInput}
                        className='border px-3 rounded-full py-1 dark:bg-[#303233]' 
                        placeholder={`Search surah e.g Al-fatihah...`}/>
                </div>
                <p className='text-sm font-sans text-gray-500'>Chapters</p>
                <div className=' flex flex-col gap-4 h-screen overflow-scroll pb-20'>
                    {filteredSurahList.map((sura, index) => (
                    <Link to={`/surah/${sura.sura_number}`} onClick={closeSideMenu} className=' hover:bg-gray-100 dark:hover:bg-gray-800 border rounded-lg border-transparent px-4 flex w-full justify-between' key={index}>
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
                
                
            </div>
  )
}

export default Sidemenu
