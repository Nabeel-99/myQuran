import React from 'react'
import QuranImage from "../assets/images/handquiz.png"
import QuizImage from "../assets/images/phonequiz.png"
import TestImage from "../assets/images/Test.png"
import QuizImg from "../assets/images/quiz.png"
import { BsFillPatchQuestionFill } from 'react-icons/bs'
import { FaCheckCircle, FaEye } from 'react-icons/fa'
const Quiz = () => {
  return (
    <div className='flex flex-col gap-10 h-full pb-20 items-start mt-32 px-4 lg:px-20'>
        <div className='flex justify-between w-full'>
            <div className='flex flex-col gap-5'>
                <p className='text-[4.5rem] font-serif  text-transparent bg-clip-text bg-gradient-to-br from-[#2717b7] via-[#2b748f] to-[#086343] leading-tight tracking-tight'>An Interactive way to 
                    <span className='block'> Perfect your</span>
                    <span className='block'> Quran Hifz</span>
                </p>
                <p className='text-lg leading-2'>Embark on a journey with our Quran quiz journey to enhance your
                <span className='block'> memorization strength. Whether you're a hafiz or novice, our quiz offers  </span><span className='block'>an immersive way to strengthen your hifz.</span>
                </p>
            </div>
            <div className=''>
                <img src={QuranImage} alt='quiz-image' className=''/>
            </div>
        </div>
        <div className='flex flex-col gap-10 items-center justify-center w-full '>
          <p className='text-[4.5rem] font-serif bg-clip-text text-transparent bg-gradient-to-tr from-[#0c4c2e] to-[#51d195]'>Particpate in the Quiz</p>
          <div className='flex justify-between w-full'>
              <div className=' w-2/4 flex flex-col gap-5'>
                  <div className='flex items-center justify-center flex-col gap-2'>
                      <p className='font-bold text-4xl'>Challenge your Knowledge</p>  
                      <p className='text-center text-xl'>Test your Quranic memorization skills with our carefully <span className='block'> selected questions.</span> </p>                  
                  </div>
                  <img src={TestImage} alt='quizImage' className='w-[30rem] mt-7'/>
              </div>
              <div className=' w-1/3 flex flex-col gap-5 mr-20'>
                  <div className='flex items-center justify-center flex-col gap-2'>
                      <p className='font-bold text-4xl'>Interactive Learning</p>  
                      <p className='text-center text-xl'>Get instant feedback on your answers and learn from any mistakes.</p>                  
                  </div>
                  <img src={QuizImage} alt='quizAnswer' className='mt-7' />
              </div>
          </div>
        </div>
        <div className='flex flex-col items-center justify-center w-full gap-3'>
          <p className='text-[4rem] tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-blue-700'>How it works</p>
          <div className='grid grid-cols-3 gap-14'>
            <div className='border shadow-lg h-72 rounded-2xl py-4 flex flex-col items-center gap-10 '>
                <div className=' border-black w-full flex items-center justify-center '>
                  <BsFillPatchQuestionFill className='text-[6rem]'/>
                </div>
                <div className='flex flex-col items-center gap-3 h-44'>
                  <p className='text-xl font-bold'>Answer Questions</p>
                  <p className='px-6 text-center text-[18px]'>You will be presented with multiple-choice questions. Select the correct answer from the options.</p>
                </div>
            </div>
            <div className='border shadow-lg  h-72  rounded-2xl py-4 flex flex-col items-center gap-10  '>
              <div className=' border-black w-full flex items-center justify-center '>
                <FaCheckCircle className='text-[6rem]' />
              </div>
              <div className='flex flex-col items-center gap-3 h-44'>
                <p className='text-[20px] font-bold'>Get Results</p>
                <p className='px-6 text-center text-[18px]'>After completing the quiz, you will see your score and the correct answers for each question.</p>
              </div>
            </div>
            <div className='border shadow-lg  h-72  rounded-2xl py-4 flex flex-col items-center justify-center gap-10 '>
              <div className=' border-black w-full flex items-center justify-center'>
                <FaEye className='text-[6rem]' />
              </div>
              <div className='flex flex-col items-center gap-3 h-44'> 
                <p className='text-[20px] font-bold'>Review and Learn</p>
                <p className='px-6 text-center text-[18px]'>Review your answers to understand any mistakes and improve your memorization.</p>
              </div>
            </div>
         </div>
        </div>
        <div className='flex flex-col'>

        </div>
    </div>
  )
}

export default Quiz
