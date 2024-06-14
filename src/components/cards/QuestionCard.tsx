import React, { useEffect } from 'react';

interface QuestionCardProps {
    questionId: number;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ questionId }) => {
    
    return (
        <form className='flex flex-col xl:flex-row justify-around w-full rounded-md pb-8 p-4 border-b-2 dark:bg-[#17171c]'>
            <div className='flex flex-col gap-2 pb-10'>
                <label htmlFor={`question-${questionId}`}>Enter Question:</label>
                <textarea id={`question-${questionId}`} name={`question-${questionId}`} className='border w-full xl:w-96 h-24 px-4 py-1 dark:bg-[#0f0f11] rounded-md' required />
            </div>
            <div className='flex flex-col gap-4  '>
                <div className='flex flex-col'>
                    <label htmlFor={`optionA-${questionId}`}>Option A:</label>
                    <div className='flex gap-3  items-center border py-2 px-3 rounded-full   '>
                        <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>A</p>
                        <input type='text' id={`optionA-${questionId}`} name={`optionA-${questionId}`} className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3' required />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor={`optionB-${questionId}`}>Option B:</label>
                    <div className='flex gap-3  items-center border py-2 px-3 rounded-full   '>
                        <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>B</p>
                        <input type='text' id={`optionB-${questionId}`} name={`optionB-${questionId}`} className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3' required />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor={`optionC-${questionId}`}>Option C:</label>
                    <div className='flex gap-3  items-center border py-2 px-3 rounded-full   '>
                        <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>C</p>
                        <input type='text' id={`optionC-${questionId}`} name={`optionC-${questionId}`} className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3' required />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor={`optionD-${questionId}`}>Option D:</label>
                    <div className='flex gap-3  items-center border py-2 px-3 rounded-full   '>
                        <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>D</p>
                        <input type='text' id={`optionD-${questionId}`} name={`optionD-${questionId}`} className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3' required />
                    </div>
                </div>
                <div className='flex gap-3 items-center'>
                    <label htmlFor={`answer-${questionId}`}>Correct Option:</label>
                    <input maxLength={1} type='text' id={`answer-${questionId}`} name={`answer-${questionId}`} className='border text-center dark:bg-[#0f0f11]  rounded-full h-8 w-8 flex items-center justify-center' required />
                </div>
            </div>
        </form>
    );
}

export default QuestionCard;
