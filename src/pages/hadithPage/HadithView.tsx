import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Hadiths, getHadithChapters } from '../../apis/hadithApi'

const HadithView = () => {
    const {id} = useParams<{id: string | undefined}>()
    const [hadith, setHadith] = useState<Hadiths[]>([])
    
    const fetchHadith = async(id: number) => {
        try {
            const response = await getHadithChapters(id)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(id){
            fetchHadith(parseInt(id))
        }
    }, [id])
  return (
    <div className='flex flex-col gap-10 h-full w-full pb-20  items-start mt-32 px-4 lg:px-20 '> 
      
    </div>
  )
}

export default HadithView
