import React, { useEffect } from 'react';

interface QuestionCardProps {
    questionId: number;
    handleInputChange: (questionId: number, field: string, value: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId, handleInputChange }) => {
    return (
        <form className='flex flex-col xl:flex-row justify-around w-full rounded-md pb-8 p-4 border-b-2 dark:bg-[#17171c]'>
            <div className='flex flex-col gap-2 pb-10'>
                <label htmlFor={`question-${questionId}`}>Enter Question:</label>
                <textarea id={`question-${questionId}`} name={`question-${questionId}`} className='border w-full xl:w-96 h-24 px-4 py-1 dark:bg-[#0f0f11] rounded-md'  onChange={(e) => handleInputChange(questionId, 'question', e.target.value)} required/>
            </div>
            <div className='flex flex-col gap-4'>
                {['A', 'B', 'C', 'D'].map(option => (
                    <div className='flex flex-col' key={option}>
                        <label htmlFor={`option${option}-${questionId}`}>Option {option}:</label>
                        <div className='flex gap-3 items-center border py-2 px-3 rounded-full'>
                            <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>{option}</p>
                            <input type='text' id={`option${option}-${questionId}`} name={`option${option}-${questionId}`} className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3'  onChange={(e) => handleInputChange(questionId, `options.${option}`, e.target.value)} required />
                        </div>
                    </div>
                ))}
                <div className='flex gap-3 items-center'>
                    <label htmlFor={`answer-${questionId}`}>Correct Option:</label>
                    <input maxLength={1} type='text' id={`answer-${questionId}`} name={`answer-${questionId}`} className='border text-center dark:bg-[#0f0f11] rounded-full h-8 w-8 flex items-center justify-center'  onChange={(e) => handleInputChange(questionId, 'correct_answer', e.target.value)} required />
                </div>
            </div>
            
        </form>
    );
}

export default QuestionCard;
