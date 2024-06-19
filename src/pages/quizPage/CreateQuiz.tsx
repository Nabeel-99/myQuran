import React, { useState } from 'react';
import QuestionCard from '../../components/cards/QuestionCard';
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_ROUTE } from '../../apis/quranApi';
import { Link } from 'react-router-dom';

interface Question {
    id: number;
    question: string;
    options: { [key: string]: string };
    correct_answer: string;
}

interface CreateQuizProps {
    user: any;
}

const CreateQuiz: React.FC<CreateQuizProps> = ({ user }) => {
    const [viewMyQuestions, setViewMyQuestions] = useState<boolean>(false)
    const [questions, setQuestions] = useState<Question[]>([{ id: 1, question: '', options: { A: '', B: '', C: '', D: '' }, correct_answer: '' }]);
    const { ref: questionRef, inView: inViewRef } = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    const addAnotherQuestion = () => {
        const newQuestion: Question = { id: questions.length + 1, question: '', options: { A: '', B: '', C: '', D: '' }, correct_answer: '' };
        setQuestions([...questions, newQuestion]);
    };

    const removeQuestion = () => {
        if (questions.length > 1) {
            const updatedQuestions: Question[] = questions.slice(0, -1);
            setQuestions(updatedQuestions);
        }
    };

    const handleInputChange = (questionId: number, field: string, value: string) => {
        const updatedQuestions = questions.map(q => {
            if (q.id === questionId) {
                if (field.startsWith('options.')) {
                    const optionKey = field.split('.')[1];
                    q.options[optionKey] = value;
                } else if (field in q) {
                    (q as any)[field] = value;
                }
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${API_ROUTE}/api/users/post-questions`, { questions }, { withCredentials: true });
            if(response.status === 201){
                console.log("created")
                setQuestions([]);
                setViewMyQuestions(true)
        
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='flex flex-col lg:justify-center lg:items-center gap-10 h-full w-full px-4 pb-20 mt-32'>
            <div className='flex flex-col justify-start items-start w-full lg:px-52 gap leading-tight'>
                <h2 className='text-[2.5rem] lg:text-[3rem] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-800 to-orange-500'>Salaam, {user.split(' ')[0]}</h2>
                <h3 className='text-[2rem] lg:text-[3rem] font-semibold tracking-tight text-gray-400'>Ready to create some Quran quiz challenges?</h3>
            </div>
            <div id='questions' className={`flex flex-col items-center justify-center shadow-lg border lg:w-3/4 rounded-lg ${inViewRef ? 'active' : ''}`} ref={questionRef}>
                {questions.map(question => (
                    <QuestionCard key={question.id} questionId={question.id} handleInputChange={handleInputChange} />
                ))}
                <div className='flex gap-2 items-center rounded-b-md pt-8 justify-end w-full px-4 lg:px-16 pb-8 dark:bg-[#17171c]'>
                    {questions.length > 1 && (
                        <button onClick={removeQuestion} className='border bg-black w-full text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-700'>Remove Question</button>
                    )}
                    <button onClick={addAnotherQuestion} className='border bg-black w-full text-white rounded-lg px-4 py-2 font-bold hover:bg-gray-700'>Add Question</button>
                    <button onClick={handleSubmit} className='border bg-black text-white rounded-lg px-4 py-2 w-full font-bold hover:bg-gray-700'>
                        {questions.length > 1 ? 'Submit All' : 'Submit'}
                    </button>
                </div>
                <div>
                    {viewMyQuestions && (
                        <Link to={"/my-questions"} className='cursor-pointer '>View Questions</Link>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateQuiz;
