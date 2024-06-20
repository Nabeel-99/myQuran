import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_ROUTE } from '../../apis/quranApi'
import { Link } from 'react-router-dom'
import quizImage from '../../assets/images/image.png'

const Questions = () => {
    const [allQuestions, setAllQuestions] = useState<[]>([])
    const fetchAllQuestions = async () => {
        try {
            const response = await axios.get(`${API_ROUTE}/api/users/all-questions`)
            console.log(response.data)
            setAllQuestions(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAllQuestions()
    }, [])
  return (
    <div className='flex flex-col gap-10 h-full pb-20   mt-32 px-4 lg:px-20 '>
        <h2 className='text-center text-3xl lg:text-[2.5rem]'>Choose any random card below to begin your challenge 😃</h2> 
        <div className='grid grid-flow-row md:grid-cols-2 lg:grid-cols-3 w-full gap-10'>
            {allQuestions.length > 0 && allQuestions.map((card: any) => (
                <Link to={`/get-started/${card._id}`} key={card._id} className='bg-white dark:bg-black dark:shadow-gray-800 border transition duration-300 ease-in-out hover:scale-105  hover:border-blue-600 rounded-md flex flex-col gap-4 items-center  justify-center pb-4  shadow-md '>
                    <img src={quizImage} alt='quiz' className='rounded-t-lg w-full h-64 object-cover border-b dark:border-b-gray-800' />
                    <div className='flex flex-col gap-2'>
                        <p>Created By</p>
                        <p>{card.firstName} {card.lastName}</p>
                    </div>
                </Link>    
            ))}
        </div>
    </div>
  )
}

export default Questions

