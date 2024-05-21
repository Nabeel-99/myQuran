import React from 'react'
import { FaGlobe, FaSort } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='flex flex-col gap-16 w-full px-8 md:px-24 pb-24'>
        <div className='flex flex-col gap-10 lg:flex-row lg:justify-between lg:w-full'>
            <div className='flex flex-col gap-3 xl:w-96'>
                <p className='font-bold'>My Quran</p>
                <p>This website is provided as a Sadaqah Jariyah, an ongoing charity, in hopes of making it easy for everyone to read and understand.</p>
                <span className='font-bold'>Hadith:</span> <p className='italic'>"The one who recites the Quran and struggles with it, due to its difficulty, will receive double the reward." (Sahih al-Bukhari 1437, Sahih Muslim 798)</p>
                <p>This Website uses the Quran.com API for accessing Quranic text and translations.</p>
            </div>
            <div className='flex flex-col gap-2'>
                Frequently Read Surahs:
                <ul className='list-disc flex flex-col gap-2 px-4'>
                    <li><Link to={''} className='text-blue-500'>Surah Al-Kahf:</Link> Recited on Fridays for blessings and protection.</li>
                    <li><Link to={''} className='text-blue-500'>Surah Al-Mulk:</Link> Recited before sleep as protection from the punishment of the grave.</li>
                    <li><Link to={''} className='text-blue-500'>Surah Al-Fatihah:</Link> Known as Ummul Kitab (the Mother of the Book), it is essential in daily prayers.</li>
                    <li><Link to={''} className='text-blue-500'>Surah Yaseen:</Link> Known as the heart of the Quran, often recited for various needs and supplications.</li>
                    <li><Link to={''} className='text-blue-500'>Surah Ar-Rahman:</Link> Recited for its profound messages of mercy and blessings.</li>
                </ul>
            </div>
        </div>  
        <div className='flex justify-between items-center w-full'>
           <p className='text-[0.7rem] md:text-base'>&copy; 2024 MyQuran. All Rights Reserved.</p> 
            <div className='flex items-center'>
                <button className='flex gap-2 items-center border rounded-md py-1 px-2'>
                    <FaGlobe/>
                     English
                    <FaSort/>
                </button>
            </div>
        </div> 
       
    </footer>
  )
}

export default Footer
