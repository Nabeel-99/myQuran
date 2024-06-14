import React, { useState } from 'react'
import QuestionCard from '../../components/cards/QuestionCard'
import { useInView } from 'react-intersection-observer';

interface Question {
    id: number;
  }

interface CreateQuizProps{
    user: any
}
const CreateQuiz:React.FC<CreateQuizProps> = ({user}) => {
    const [questions, setQuestions] = useState<Question[]>([{ id: 1 }]);
    const {ref: questionRef, inView: inViewRef} = useInView({
        threshold: 0.2,
        triggerOnce: true
    })
    const addAnotherQuestion = () => {
        const newQuestion: Question = { id: questions.length + 1 };
        setQuestions([...questions, newQuestion]);
    }

    const removeQuestion = () => {
        if(questions.length > 1){
            const updatedQuestions: Question[] = questions.slice(0, -1)
            setQuestions(updatedQuestions)
        }
       
    }
  return (
    <div className='flex flex-col lg:justify-center lg:items-center gap-10 h-full w-full px-4 pb-20 mt-32'>
        <div className='flex flex-col justify-start items-start w-full lg:px-52  gap leading-tight'>
            <h2 className='text-[2.5rem] lg:text-[3rem] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-800 to-orange-500'>Salaam, {user.split(' ')[0]}</h2>
            <h3 className='text-[2rem] lg:text-[3rem] font-semibold tracking-tight text-gray-400'>Ready to create some quran quiz challenges?</h3>
        </div>  
        <div id='question-card' className={`flex flex-col items-center justify-center  shadow-lg border lg:w-3/4  rounded-lg ${inViewRef ? 'active' : ''}`} ref={questionRef}>
           {questions.map(question => (
                <QuestionCard key={question.id} questionId={question.id}/>
           ))}
            <div className='flex gap-2 items-center rounded-b-md pt-8 justify-end w-full px-4 lg:px-16 pb-8 dark:bg-[#17171c]'>
                {questions.length > 1 && (
                    <button onClick={removeQuestion} className='border bg-black w-full text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-700'>Remove Question</button>
                )}
                <button onClick={addAnotherQuestion} className='border bg-black w-full text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-700'>Add Question</button>
                <button className='border bg-black text-white rounded-lg px-4 py-2 w-full font-bold hover:bg-gray-700'>
                    {questions.length > 1 ? 'Submit All' : 'Submit'}
                </button>
            </div>
        </div>
    </div>
  )
}

export default CreateQuiz
