import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaXmark } from 'react-icons/fa6'
import { API_ROUTE } from '../apis/quranApi'

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState<[]>([])
    const fetchUserBookmarks = async() => {
        try {
            const response = await axios.get(`${API_ROUTE}/api/users/bookmarks`, {withCredentials: true})
            console.log(response.data)
            setBookmarks(response.data)
        } catch (error) {
            console.log(error) 
        }
    }
    useEffect(() => {
        fetchUserBookmarks()
    }, [])
  return (
    <div className='flex flex-col gap-10 h-full pb-20  items-start mt-32 px-4 lg:px-20 '> 
        <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>Bookmarks</h2>
        <div className='grid lg:grid-cols-5 gap-4 w-full'>
            {bookmarks.length > 0 && bookmarks.map((bookmark: any) => (
            <div className='relative rounded-md cursor-pointer hover:border-blue-700  hover:transition-all border dark:bg-[#161616] flex flex-col gap-4 shadow-md px-4 p-4' key={bookmark._id}>
                <div className='flex justify-end items-center w-full'>
                    <button title='remove'><FaXmark className='text-xl'/></button>
                </div>
                <div className='border bg-gray-100 dark:bg-[#161717] rounded-md flex flex-col items-center justify-center'>
                    <p className='arabicText text-2xl'>{bookmark.suraNumber}</p>
                    <p className='text-uthmani'>{bookmark.verseText}</p>
                    <p>Verse {bookmark.verseId.split(":")[1]}</p>
                </div>
            </div>
            ))}
            
        
        </div>
    </div>
  )
}

export default Bookmarks
