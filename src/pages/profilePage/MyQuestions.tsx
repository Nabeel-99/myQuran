import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_ROUTE } from '../../apis/quranApi';
import { FaXmark } from 'react-icons/fa6';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface UserQuestions {
    _id: string;
    question: string;
    options: { [key: string]: string };
    correct_answer: string;
}

const MyQuestions: React.FC = () => {
    const [userQuestions, setUserQuestions] = useState<UserQuestions[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<UserQuestions | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const fetchUserQuestions = async () => {
        try {
            const response = await axios.get<UserQuestions[]>(`${API_ROUTE}/api/users/user-questions`, { withCredentials: true });
            setUserQuestions(response.data);
        } catch (error) {
            console.error('Error fetching user questions:', error);
        }
    };

    const editQuestion = (question: UserQuestions) => {
        setSelectedQuestion({ ...question });
        setIsEditing(true);
    };

    const closeContainer = () => {
        setSelectedQuestion(null);
        setIsEditing(false);
    };

    const updateQuestion = async () => {
        try {
            if (!selectedQuestion) return;

            const { _id, question, options, correct_answer } = selectedQuestion;
            const updatedQuestion = await axios.put<UserQuestions>(
                `${API_ROUTE}/api/users/update-questions/${_id}`,
                { question, options, correct_answer },
                { withCredentials: true }
            );

            const updatedQuestions = userQuestions.map(q =>
                q._id === _id ? updatedQuestion.data : q
            );

            setUserQuestions(updatedQuestions);
            setIsEditing(false);
            setSelectedQuestion(null);
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    const deleteQuestion = async (id: string) => {
        try {
            await axios.delete(`${API_ROUTE}/api/users/delete-question/${id}`, { withCredentials: true });
            const updatedQuestions = userQuestions.filter(q => q._id !== id);
            setUserQuestions(updatedQuestions);
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    useEffect(() => {
        fetchUserQuestions();
    }, []);

    return (
        <div className='flex flex-col gap-10 h-full pb-20 items-start mt-32 px-4 lg:px-20'>
            <h2 className='lg:text-3xl border-b-4 border-b-black dark:border-b-white'>My Questions</h2>
            {userQuestions.length === 0 && <div className='italic'>No Questions posted yet.</div>}
            <div className='grid lg:grid-cols-2 grid-flow-rows gap-4 w-full'>
                {userQuestions.length > 0 && userQuestions.map((question: UserQuestions) => (
                    <div className='bg-gray-50 dark:bg-[#1f2020] border dark:border-gray-600 dark:hover:border-gray-50 rounded-lg cursor-pointer hover:border-blue-700 flex flex-col gap-4 px-4 p-4' key={question._id}>
                        <div className='flex justify-between w-full'>
                            <p>{question.question}</p>
                            <div className="flex gap-3 items-center justify-end w-full pr-6 pt-4 lg:pr-0 lg:pt-0">
                                <button onClick={() => editQuestion(question)} title='edit' className='hover:text-blue-500'><FaEdit /></button>
                                <button onClick={() => deleteQuestion(question._id)} title='delete' className='hover:text-red-500'><FaTrash /></button>
                            </div>
                        </div>
                        {Object.entries(question.options).map(([key, value]) => (
                            <ul key={key}>
                                <li>{key}. {value}</li>
                            </ul>
                        ))}
                        <p className='text-green-500'>Correct Option: {question.correct_answer.toUpperCase()}</p>
                    </div>
                ))}
            </div>
            {selectedQuestion && (
                <div className='z-10 fixed inset-0 bg-transparent flex items-center justify-center top-0 right-0 left-0 bottom-0 px-2 lg:px-0'>
                    <div className='absolute inset-0 h-full w-full bg-black opacity-15'></div>
                    <div className='z-10 border-black flex  mt-8 flex-col gap-7 border px-4 lg:px-10 pb-8 bg-white dark:bg-[#232528] dark:border-white rounded-md items-center justify-center lg:w-3/5'>
                        {isEditing && (
                            <form className='flex flex-col xl:flex-row justify-around w-full rounded-md pb-8 p-4 border-b-2 dark:bg-[#17171c]'>
                                <div className='flex flex-col gap-2 pb-10'>
                                    <label htmlFor={`question-${selectedQuestion._id}`}>Enter Question:</label>
                                    <textarea
                                        id={`question-${selectedQuestion._id}`}
                                        name={`question-${selectedQuestion._id}`}
                                        className='border w-full xl:w-96 h-24 px-4 py-1 dark:bg-[#0f0f11] rounded-md'
                                        value={selectedQuestion.question}
                                        onChange={(e) => setSelectedQuestion(prev => ({ ...prev!, question: e.target.value }))}
                                        required
                                    />
                                </div>
                                <div className='flex flex-col gap-4'>
                                    {['A', 'B', 'C', 'D'].map(option => (
                                        <div className='flex flex-col' key={option}>
                                            <label htmlFor={`option${option}-${selectedQuestion._id}`}>Option {option}:</label>
                                            <div className='flex gap-3 items-center border py-2 px-3 rounded-full'>
                                                <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>{option}</p>
                                                <input
                                                    type='text'
                                                    id={`option${option}-${selectedQuestion._id}`}
                                                    name={`option${option}-${selectedQuestion._id}`}
                                                    className='border w-full xl:w-72 py-1 h-full dark:bg-[#0f0f11] rounded-full px-3'
                                                    value={selectedQuestion.options[option]}
                                                    onChange={(e) => setSelectedQuestion(prev => ({ ...prev!, options: { ...prev!.options, [option]: e.target.value } }))}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <div className='flex gap-3 items-center'>
                                        <label htmlFor={`correct_answer-${selectedQuestion._id}`}>Correct Option:</label>
                                        <input
                                            maxLength={1}
                                            type='text'
                                            id={`correct_answer-${selectedQuestion._id}`}
                                            name={`correct_answer-${selectedQuestion._id}`}
                                            className='border text-center dark:bg-[#0f0f11] rounded-full h-8 w-8 flex items-center justify-center'
                                            value={selectedQuestion.correct_answer}
                                            onChange={(e) => setSelectedQuestion(prev => ({ ...prev!, correct_answer: e.target.value }))}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-center mt-4'>
                                    <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2' onClick={updateQuestion}>Update</button>
                                    <button type='button' className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600' onClick={closeContainer}>Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyQuestions;
