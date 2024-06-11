import React from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { TfiWrite } from 'react-icons/tfi'

interface OptionsProps{
    verseIndex: number
    showNotes: (verseIndex: any) => void
    isNote: boolean
    closeNotes: (verseIndex: any) => void
    toggleBookmark:() => void
    isBookmarked: boolean
    closeOptions:() => void
}
const Options: React.FC<OptionsProps> = ({
      verseIndex, 
      showNotes, 
      isNote, 
      closeNotes, 
      isBookmarked, 
      toggleBookmark,
      closeOptions
    }) => {
  return (
    <span className='z-10 absolute options bg-white dark:bg-[#232528] border shadow-md p-3 rounded-md   text-sm'>
    <div className='flex flex-col gap-3 bg-white dark:bg-[#232528]'>
      <button onClick={() => {
        toggleBookmark()
        closeOptions()
        }} className='flex items-center gap-2 hover:text-blue-700'><FaRegBookmark/>{ isBookmarked ? 'remove from bookmarks' : 'Bookmark Verse' }</button>
      <button onClick={() => showNotes(verseIndex)} className='flex items-center gap-2 hover:text-blue-700'><TfiWrite/>Write Note</button>
      <button className='flex items-center gap-2 hover:text-blue-700'><CiShare2/>Share Verse</button>
    </div>
    {isNote && (
    <div className='z-10 fixed  inset-0 bg-transparent flex items-center justify-center top-0 right-0 left-0 bottom-0 px-2 lg:px-0'>
        <div className='absolute inset-0 h-full w-full bg-black opacity-15'></div>
        <div className='z-10 border-black flex flex-col gap-7 border px-4 lg:px-10 pb-8 w-full   bg-white dark:bg-[#232528] dark:border-white rounded-md items-center justify-center lg:w-3/5 lg:h-3/4'>
          <div className='flex justify-end w-full'>
            <button title='close' className='mt-10 hover:bg-gray-200 hover:rounded-full p-2 dark:hover:bg-white dark:hover:text-black ' onClick={closeNotes} ><FaXmark className='text-2xl'/></button>
          </div>
          <div className='flex flex-col w-full '> 
             <div className=' text-sm flex  items-start'>
              <span className=' rounded-full px-5 py-1 bg-black text-white dark:bg-white dark:text-black '>Al-Fatihah 1:1</span>
            </div>
          </div>
          <div className='w-full'>
            <form className='flex  flex-col gap-2 items-start'>
                <label htmlFor='note' className='text-lg font-bold font-serif'>Notes & Reflections</label>
                <textarea 
                  id='note' 
                  className='border dark:bg-[#1c1d1f] rounded-md px-4 py-3 text-lg w-full min-h-72 flex items-start justify-start '
                  placeholder='write notes or reflection' 
                  name='note'/>
            </form>
          </div>
          <div className='flex justify-end w-full'>
            <button className='rounded-md py-1  text-white bg-black dark:bg-white dark:text-black px-7 font-bold hover:bg-[#232528]'>Save</button>
          </div> 
        </div>
    </div>
    )}
</span>
  )
}

export default Options
