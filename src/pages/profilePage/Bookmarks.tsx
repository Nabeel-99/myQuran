import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_ROUTE } from '../../apis/quranApi';
import { FaTimes } from 'react-icons/fa'; // Assuming FaTimes is the X mark icon

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState<any[]>([]); // Adjust the type based on your actual bookmark object structure

  // Function to fetch user's bookmarks from the server
  const fetchUserBookmarks = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/api/users/bookmarks`, { withCredentials: true });
      setBookmarks(response.data);
    } catch (error) {
      console.log('Error fetching bookmarks:', error);
      // Handle error state or show error message
    }
  };

  // Function to remove a bookmark
  const removeFromBookmarks = async (verseId: string) => {
    try {
      await axios.delete(`${API_ROUTE}/api/users/delete`, {
        data: { verseId },
        withCredentials: true
      });
      // Remove the bookmark from state after successful deletion
      setBookmarks(bookmarks.filter(bookmark => bookmark.verseId !== verseId));
    } catch (error) {
      console.log('Error removing bookmark:', error);
      // Handle error state or show error message
    }
  };

  // Fetch bookmarks on component mount
  useEffect(() => {
    fetchUserBookmarks();
  }, []);

  return (
    <div className='flex flex-col gap-10 h-full pb-20 items-start mt-32 px-4 lg:px-20'>
      <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>Bookmarks</h2>
      {bookmarks.length === 0 && (<div className='italic'>No Bookmarks Yet.</div>)}
      <div className='grid lg:grid-cols-5 gap-4 w-full'>
        {bookmarks.length > 0 && bookmarks.map((bookmark: any) => (
          <div className='relative rounded-md cursor-pointer hover:border-blue-700 hover:transition-all border dark:bg-[#161616] flex flex-col gap-4 shadow-md px-4 p-4' key={bookmark._id}>
            <div className='flex justify-end items-center w-full'>
              <button title='remove' onClick={() => removeFromBookmarks(bookmark.verseId)}><FaTimes className='text-xl' /></button>
            </div>
            <div className='border bg-gray-100 dark:bg-[#161717] rounded-md flex flex-col items-center justify-center'>
              <p className='arabicText text-2xl'>{bookmark.suraNumber}</p>
              <p className='text-uthmani verseText px-3'>{bookmark.verseText.length > 80 ? bookmark.verseText.slice(0, 60).concat("...") : bookmark.verseText}</p>
              <p>Verse {bookmark.verseId.split(":")[1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookmarks;
