import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'
import { API_ROUTE } from '../../apis/quranApi'
import chapters from "../../apis/chapters.json"

interface Note {
    _id: string;
    note: string;
    suraNumber: number;
    createdAt: string;
    verseId: string
    verseText: string
    verseTranslation: string
   
}
const Notes = () => {
const [selectedNote, setSelectedNote] = useState<Note | null>(null);
const [isEditing, setIsEditing] = useState<boolean>(false)
const [notes, setNotes] = useState<Note[]>([]);
const [noteText, setNoteText] = useState<string>("");
const handleNoteTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNoteText(e.target.value);
};
  const fetchUserNotes = async() => {
    try {
        const response = await axios.get(`${API_ROUTE}/api/users/notes`, {withCredentials: true})
        setNotes(response.data)
    } catch (error) {
        console.log(error)
    }
  }
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate: string = date.toLocaleDateString('en-US', options);

    return formattedDate;
}
  const updateNote = async(id: string, noteText: string) => {
    try {
      const response = await axios.put(`${API_ROUTE}/api/users/update-notes/${id}`, {
         note: noteText
       }, {withCredentials: true})
       if(response.status === 200){
         console.log("updated")
         fetchUserNotes()
         setSelectedNote(null)
       }
    } catch (error) {
       console.log(error)
    }
 }
 const handleUpdate = () => {
    if(selectedNote){
        updateNote(selectedNote._id, noteText)
        setSelectedNote(null)
    }
    
 }
 const deleteNote = async(id: string) => {
   try {
       const response = await axios.delete(`${API_ROUTE}/api/users/delete-notes/${id}`, {withCredentials: true})
       if(response.status === 200){
            fetchUserNotes()
       }
       setSelectedNote(null)
   } catch (error) {
     console.log(error)
   }
 }
 const getSurahEnglishName = (suraNumber: any) => {
    const chapter = chapters.find((chapter: any) => chapter.chapter === suraNumber)
    return chapter ? chapter.name : `unknown `
 }
 useEffect(() => {
    fetchUserNotes()
 }, [])
  const showFullNote = (note: any) => {
    setSelectedNote(note)
  }
  const closeFullNote = () => {
    setSelectedNote(null)
    setIsEditing(false)
  }
  const editNote = () => {
    setIsEditing(true)
    if(selectedNote){
        setNoteText(selectedNote.note)
    }
  }
  const closeEditNote = () => {
    setIsEditing(false)
  }
  return (
     <div className='flex flex-col gap-10 h-full pb-20   items-start mt-32 px-4 lg:px-20 '> 
        <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>My Notes</h2>
        {notes.length === 0 && (<div className='italic'>No Notes Yet</div>)}
        <div className='grid lg:grid-cols-2 grid-flow-rows gap-4 w-full'>
            {notes.length > 0 && notes.map((note : Note) => (
          
            <div className='bg-gray-50 dark:bg-[#1f2020] border dark:border-gray-600 dark:hover:border-gray-50 rounded-lg cursor-pointer hover:border-blue-700  flex flex-col gap-4  px-4 p-4' onClick={() => showFullNote(note)} key={note._id}>
                <div className=' text-sm flex justify-between items-start'>
                   <span className=' rounded-full p-2 bg-black text-white dark:bg-white dark:text-black'>{getSurahEnglishName(note.suraNumber)} {note.verseId}</span>
                </div>
                <div className='flex flex-col'>
                    <p>{note.note}</p>
                    <p className='text-sm mt-4 text-gray-400'>{formatDate(note.createdAt)}</p>
                </div>
              
            </div>
                
            ))}
        </div>
        {selectedNote && (
            <div className='z-10 fixed  inset-0 bg-transparent flex items-center justify-center top-0 right-0 left-0 bottom-0 px-2 lg:px-0'>
                <div className='absolute inset-0 h-full w-full bg-black opacity-15'></div>
                <div className='z-10 border-black flex flex-col gap-7 border px-4 lg:px-10 pb-8   bg-white dark:bg-[#232528] dark:border-white rounded-md items-center justify-center lg:w-3/5 '>
                    <button title='close' className=' hover:bg-gray-200 hover:rounded-full dark:hover:bg-gray-700 p-2' onClick={closeFullNote} ><FaXmark className='text-2xl'/></button>
                    <div className=' text-sm '>
                        <span className=' rounded-full p-2 bg-black text-white dark:bg-white dark:text-black'>{getSurahEnglishName(selectedNote.suraNumber)} {selectedNote.verseId}</span>
                    </div>
                    <div className='flex flex-col gap-8 w-full'> 
                        <p className='text-uthmani verseText text-xl'>{selectedNote.verseText.length > 500 ? selectedNote.verseText.slice(0,490).concat('...') : selectedNote.verseText}</p>
                        <p className=''>{selectedNote.verseTranslation.length > 500 ? selectedNote.verseTranslation.slice(0,490).concat("...") : selectedNote.verseTranslation}</p>
                    </div> 
                    {isEditing ? (
                      <div className='border border-black dark:border-white flex flex-col gap-8 rounded-lg w-full lg:px-10 lg:py-8'>
                         <div className="flex flex-col gap-3 px-8 w-full pr-6 pt-4 lg:pr-0 lg:pt-0">
                             <label htmlFor='note'>update note:</label>
                             <textarea
                                 id='note'
                                 value={noteText}
                                 onChange={handleNoteTextChange}
                                 name='note'
                                 className='w-full px-4 py-2 border dark:bg-[#18191a]'
                             />
                         </div>
                         <div className='flex gap-3 justify-end pb-8 pr-3 lg:pb-0 lg:pr-0 lg:mt-8'>
                             <button onClick={closeEditNote} className='rounded-md py-1  text-white bg-black px-4 hover:bg-[#232528] dark:bg-white dark:text-black dark:hover:bg-[#f1f1f5]'>Cancel</button>
                             <button onClick={handleUpdate} className='rounded-md py-1  text-white bg-black px-4 hover:bg-[#232528] dark:bg-white dark:text-black dark:hover:bg-[#f1f1f5]'>Update</button>
                         </div>   
                     </div> 
                    ) : (
                    <div className='border border-black dark:border-white flex flex-col gap-8 rounded-lg w-full lg:px-10 lg:py-8'>
                        <div className="flex gap-3 items-center justify-end w-full pr-6 pt-4 lg:pr-0 lg:pt-0">
                            <button onClick={editNote} title='edit' className=' hover:text-blue-500'><FaEdit/></button>
                            <button onClick={() => deleteNote(selectedNote._id)} title='delete' className='hover:text-red-500'><FaTrash/></button>
                        </div>
                        <p className='px-4 lg:px-0'>{selectedNote.note}</p> 
                        <div className='flex justify-end pb-8 pr-3 lg:pb-0 lg:pr-0 lg:mt-8'>
                            <button className='rounded-md py-1  text-white bg-black px-4 hover:bg-[#232528] dark:bg-white dark:text-black dark:hover:bg-[#f1f1f5]'>Share Verse</button>
                        </div>   
                    </div>
                    )}
                  
                     
                </div>
            </div>
        )}
    </div>
  )
}

export default Notes
