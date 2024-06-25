import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import timerAnimation from "../../assets/icons/timer.json";
import dotAnimation from "../../assets/icons/dot.json";
import correctAnimation from "../../assets/icons/correct.json";
import { useInView } from 'react-intersection-observer';
import axios from 'axios';
import { API_ROUTE } from '../../apis/quranApi';
import { Question } from '../../types/types';



const StartQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsLength, setQuestionsLength] = useState()
  const [showQuestions, setShowQuestions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [showCongrats, setShowCongrats] = useState<boolean>(false);
  const [reviewMode, setReviewMode] = useState<boolean>(false);
  const { id} = useParams<{id: string | undefined}>()
  const [timer, setTimer] = useState<number>(3);
  const [text, setText] = useState<string>('');
  const [ready, setReady] = useState<boolean>(false); 
  const { ref: questionRef, inView: inQuestionRef } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  const { ref: readyRef, inView: inReadyRef } = useInView({
    threshold: 0.4,
    triggerOnce: true
  });

  // Fetch questions from API
  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/api/users/questions/${id}`);
      setQuestions(response.data);
      setQuestionsLength(response.data.length)
    } catch (error) {
      console.log(error);
    }
  };

  // Check user's answer
 // Check user's answer
const checkAnswer = (selectedOption: string, correctAnswer: string) => {
  if (!showFeedback) {
    // Normalize both answers to lowercase for case-insensitive comparison
    const normalizedSelectedOption = selectedOption.toLowerCase();
    const normalizedCorrectAnswer = correctAnswer.toLowerCase();

    setSelectedOption(selectedOption);
    setShowFeedback(true);
    normalizedSelectedOption === normalizedCorrectAnswer ? setText('Correct!') : setText('Incorrect!');

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedOption(null);
        setText('');
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 5000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setShowCongrats(true);
        setText('');
      }, 3000);
    }
  }
};


  // Timer effect for countdown
  useEffect(() => {
    let countdown: ReturnType<typeof setTimeout>;
    if (showQuestions && timer > 0 && !showCongrats) {
      countdown = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearTimeout(countdown);
  }, [timer, showQuestions, showCongrats]);

  // Show questions after initial delay when ready is true
  useEffect(() => {
    if (ready) {
      const timer = setTimeout(() => {
        setShowQuestions(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [ready]);

  // Fetch questions on component mount
  useEffect(() => {
    if (ready) {
      fetchQuestions();
    }
  }, [ready, id]); 

  useEffect(() => {
      fetchQuestions()
  }, [id])


  // Review answers
  const reviewAnswers = () => {
    setReviewMode(true);
    setShowCongrats(false);
  };

  return (
    <div className='flex flex-col dark:text-black gap-10 h-full w-full pb-20 bg-gradient-to-br from-gray-500 via-gray-500 to-gray-400'>
      <div className='flex flex-col gap-5 mt-20 items-center justify-center w-full pb-10'>
        <div className='pb-7 grid grid-cols-3 items-center w-full px-20'>
          <Link to="/quiz-cards" className='border rounded-lg shadow-md bg-white w-52 text-black px-4 py-1'>Go Back to Quiz Page</Link>
          <p className='text-center text-white text-4xl font-bold'>{questionsLength} {questionsLength === 1 ? 'Question' : 'Questions'}</p>
        </div>
        {!ready && (
          <div className='pb-20 flex flex-col items-center justify-center gap-6'>
            <p id='ready-text' className={`block text-4xl text-white leading-tight reveal-animation  ${inReadyRef ? 'active' : ''}`} ref={readyRef}>Are you ready for the quiz challenge?😃</p>
          
            <div className='flex gap-3'>
              <button
                className='px-6 py-2 bg-green-500 hover:bg-green-600 text-white shadow-md font-bold border rounded-lg'
                onClick={() => setReady(true)} // Set ready to true when user clicks Yes
              >
                Yes
              </button>
              <Link
                className='px-6 py-2 bg-red-500 hover:bg-red-600 shadow-md text-white font-bold border rounded-lg'
                to={"/quiz-cards"}
              >
                No
              </Link>
            </div>
          </div>
        )}
        {ready && !showQuestions && !showCongrats && !reviewMode && (
          <div className='pb-20 flex flex-col items-center justify-center gap-6'>
            <p className='block text-4xl text-white leading-tight'>Get Ready to Start!😃</p>
            <Lottie
              animationData={timerAnimation}
              className='w-32 h-32 flex items-center justify-center'
            />
          </div>
        )}
         {showQuestions && questions.length > 0 && !showCongrats && !reviewMode && (
          <>
            <div className='text-white text-lg'>
              Question {currentQuestionIndex + 1} / {questions.length}
            </div>
            <div id='question-card' className={`w-3/5 border bg-white p-8 rounded-2xl reveal-animation ${inQuestionRef ? 'active' : ''}`} ref={questionRef}>
              <div className='flex items-center justify-between w-full pb-8'>
                <h2 className='text-xl'>{questions[currentQuestionIndex].question}</h2>
                {text === 'Correct!' ? (
                  <div className='flex items-center'>
                    <p className='text-green-500'>Correct!</p>
                    <Lottie animationData={correctAnimation} className='w-32' />
                  </div>
                ) : text === "Incorrect!" && (
                  <p className='text-red-700 font-bold'>Incorrect!</p>
                )}
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {Object.entries(questions[currentQuestionIndex].options).map(([key, value]) => (
                  <div className={`flex gap-2 items-center py-1 border rounded-full cursor-pointer ${showFeedback &&
                    ((key === selectedOption && key === questions[currentQuestionIndex].correct_answer) ? 'bg-green-500 text-white' :
                      (key === selectedOption && key !== questions[currentQuestionIndex].correct_answer) ? 'bg-red-500 text-white' :
                        (key === questions[currentQuestionIndex].correct_answer) ? 'bg-green-500 text-white' : '')}`} key={key}
                    onClick={() => checkAnswer(key, questions[currentQuestionIndex].correct_answer)}>
                    <p className='ml-2 border rounded-full h-8 w-8 flex items-center justify-center'>{key}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {showFeedback && (
          <div className='mt-4 flex items-center '>
            {timer > 0 && currentQuestionIndex < questions.length - 1 ? (
              <p className='text-white text-2xl'>Next question in {timer}...</p>
            ) : (
              currentQuestionIndex < questions.length - 1 && (
                <div className='flex flex-col items-center'>
                  <p className='text-2xl text-white font-bold'>Loading next question</p>
                  <Lottie animationData={dotAnimation} className='w-96' />
                </div>
              )
            )}
          </div>
        )}
        {showCongrats && (
          <div className='mt-4 text-center text-white'>
            <h2 className='text-3xl mb-4'>Congratulations! You have completed the quiz!</h2>
            <div>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2' onClick={reviewAnswers}>Review Answers</button>
              <Link to={"/quiz-cards"}  className='bg-green-500 text-white px-4 py-2 rounded-md'>Explore Quiz</Link>
            </div>
          </div>
        )}
        {reviewMode && (
          <div className='w-3/5 border bg-white p-8 rounded-2xl'>
            <h2 className='font-bold text-xl pb-8'>Review</h2>
            {questions.map((question, index) => (
              <div key={question._id} className='mb-4'>
                <h3 className='text-lg'>{index + 1}. {question.question}</h3>
                <div className='ml-4'>
                  {Object.entries(question.options).map(([key, value]) => (
                    <p key={key} className={key === question.correct_answer ? 'text-green-500' : ''}>{key}: {value}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartQuiz;

