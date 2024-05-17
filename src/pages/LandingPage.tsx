import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import { fetchAllJuz, getSurahLists } from '../apis/quranApi'
import ChapterCards from '../components/ChapterCards'

const LandingPage = () => {

    const [surahList, setSurahList] = useState<any[]>([])
    const [surahJuz, setSurahJuz] = useState<any[]>([])

    const formattedSurahName = (surahNumber: number) => {
        if(surahNumber > 99){
            return `${surahNumber}`
        }else if (surahNumber > 9){
            return `0${surahNumber}`
        }else{
            return `00${surahNumber}`
        }
    }
   
    const fetchSurahList = async() => {
        try {
            const surahData = await getSurahLists()
            setSurahList(surahData)
        } catch (error) {
            console.log(error)
        }
    }
    const longAyat = [14, 15, 17, 18, 26, 28, 29, 30]
    const fetchSurahJuz = async() => {
        try{
            const juzData = await fetchAllJuz()
            setSurahJuz(juzData)
            console.log(`juzData: `, juzData)
        }catch(error){
            console.log("error", error)
        }
    }
    useEffect(() => {
        fetchSurahJuz()
        // fetchSurahList()
    }, [])

  return (
    <div className='flex flex-col w-full px-24 gap-8 '>
        {/* SEARCH BAR */}
        <div className='flex border border-black mx-auto items-center justify-center pl-4  rounded-full w-3/6'>
            <label htmlFor='search' title='search' className='border-r border-r-black h-full  flex items-center pr-3'><FaSearch/></label>
            <input type='text' id='search' placeholder='Search Surah e.g Surah Al-fatihah' className='w-full py-3 px-2 rounded-r-full'/>
        </div>
        {/* RECENTLY READ */}
       <div className='flex flex-col gap-2'>
            <h2 className='text-2xl'>Recently Read</h2>
            <div className='grid grid-flow-col grid-cols-5'>
            <div className='border border-green-300 rounded-lg flex justify-between items-center'>
                <div className='flex gap-4 p-2'>
                    <div><h2 className='border p-1 rounded-lg border-green-300'>1:1</h2></div>
                    <div className='flex flex-col'>
                        <p>Al-Fatihah</p>
                        <p>PG. 1</p>
                    </div>
                </div>
                <div className='border-l  border-l-green-800 h-full p-2 rounded-r-lg items-center flex bg-green-800' >
                    <button className='text-green-200 text-xl pl-3 ' title='view'><FaArrowRight/></button>
                </div>
            </div>
            </div>
       </div>
       {/* CHAPTER AND JUZ LISTS */}
      <div className='flex flex-col gap-4'>
        <h2 className='text-2xl'>Chapter Lists</h2>
        <div className='grid grid-cols-3 gap-12 '>
            <button className='border border-green-800   bg-[#151515] rounded-full text-xl px-6 py-3 flex justify-between'>
                Chapter(114)
                <p className="uthmani-script">سُورَة</p>
            </button>
            <button className='border border-green-800   bg-[#151515] rounded-full text-xl px-6 py-3 flex justify-between'>
                Juz(30)
                <p className="uthmani-script">جُزْء</p>
            </button>
            <button className='border border-green-800   bg-[#151515] rounded-full text-xl px-6 py-3 flex justify-between'>
                Hizb(60)
                <p className="uthmani-script">حِزْب</p>
            </button>
        </div>
      </div>
      {/* SURAH LIST */}
      <div className='grid grid-cols-3 gap-8'>
        {surahJuz.map((juz => (
            <button className='border rounded-lg border-green-800 bg-[#0a1510] px-4'>
            <div className='flex justify-between items-center px-1'>
                <div className='flex flex-col items-start  py-2'>
                        <p className='font-bold'>Juz {juz.text.juz}</p>
                        <p>{juz.text.surah.englishName} - {juz.text.surah.number}:{juz.text.numberInSurah}</p>
                </div>
                <p className='uthman-script'>
                    {longAyat.includes(juz.text.juz)
                        ? juz.text.text.slice(40, 80)
                        : juz.text.text.length > 20
                            ? juz.text.text.slice(0,40)
                            : juz.text.text
                    }
                </p>
            </div>
        </button>
        )))} 
      </div>
      {/* <ChapterCards
        surahList={surahList}
        formattedSurahName={formattedSurahName}
      /> */}
    </div>
  )
}

export default LandingPage





