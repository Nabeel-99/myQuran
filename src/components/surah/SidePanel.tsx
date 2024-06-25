import React, { useEffect, useState } from 'react'
import {  FaCheck } from 'react-icons/fa'
import { FaRadio } from 'react-icons/fa6'
import { Reciters } from '../../types/types'
import { getAllReciters } from '../../apis/quranApi'

interface SidePanelProps {
  currentReciter: string
  changeReciter: (reciterId: any, reciterName: any) => void
}
const SidePanel:React.FC<SidePanelProps> = ({currentReciter, changeReciter}) => {
  const [reciters, setReciters] = useState<Reciters[]>([])
  const [isDisplaying, setIsDisplaying] = useState<boolean>(false)
  const fetchAllReciters = async() => {
    try {
      const response = await getAllReciters()
      console.log(response)
      setReciters(response)
    } catch (error) {
      console.log(error)
    }
  }
  const displayReciters = () => {
    setIsDisplaying(!isDisplaying)
  }
  useEffect(() => {
    fetchAllReciters()
  }, [])
  return (
    <div className=' md:flex flex-col gap-2 dark:bg-[#232528]  h-full p-5'>
        <div className='flex flex-col '>
            <p className='text-blue-500'>Current Reciter:</p>
            <p>{currentReciter}</p>
        </div>
        <div className='flex flex-col pb-8'>
            <p className='text-blue-500'>Translation By:</p>
            <p className='text-sm'>Dr. Mustafa Khattab, the Clear Quran</p> 
        </div>
        <div className='flex flex-col gap-4'>
         <button onClick={displayReciters}  className='flex items-center gap-3'><FaRadio/>Change Reciter</button>

         {isDisplaying && (
          <div className=''>
            {reciters.map((reciter: Reciters) => {
              const reciterDisplayName = reciter.style ? `${reciter.reciter_name} (${reciter.style})` : reciter.reciter_name;
              return (
                <div className='flex flex-col gap-2 pb-2 ' key={reciter.id}>
                  <button onClick={() => changeReciter(reciter.id, reciterDisplayName)} className='text-left flex items-center text-sm'>
                    {reciterDisplayName} {currentReciter === reciterDisplayName && <FaCheck className='ml-2 text-green-500' />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
        </div>
       
    </div> 
  )
}

export default SidePanel
