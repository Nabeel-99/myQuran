import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import QuranImage from "../assets/images/handquiz.png";
import ChallengeImage from "../assets/images/challenge.png";
import InteractiveImage1 from "../assets/images/interactive1.png";
import InteractiveImage2 from "../assets/images/interactive2.png";
import arrowAnimation from "../assets/icons/arrow.json";
import Lottie from 'lottie-react';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaCheckCircle, FaEye } from 'react-icons/fa';

const Quiz = () => {
  const [isImage1, setIsImage1] = useState(true);

  const { ref: sectionRef1, inView: inView1 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: sectionRef2, inView: inView2 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: sectionRef3, inView: inView3 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: sectionRef4, inView: inView4 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });


  const { ref: pointsRef1, inView: inPointsRef1 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: pointsRef2, inView: inPointsRef2 } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  

  useEffect(() => {
    // window.scrollTo({top: 0})
    const imageToggle = setInterval(() => {
      setIsImage1((prev) => !prev);
    }, 5000);

    // Clean up interval
    return () => clearInterval(imageToggle);
  }, []);

  return (
    <div className='flex flex-col gap-10 h-full w-full pb-20 mt-32'>
      <section className={`flex justify-between w-full px-4 lg:px-28 reveal-animation ${inView1 ? 'active opacity-100' : 'opacity-0'}`} ref={sectionRef1}>
        <div className='flex flex-col gap-5 w-2/3'>
          <p className='text-[4.5rem]  font-serif text-transparent bg-clip-text bg-gradient-to-br from-blue-800 via-blue-500 to-blue-900 leading-tight tracking-tight'>
            An Interactive way
            <span className='block'> to Perfect your</span>
            <span className='block'> Quran Hifz</span>
          </p>
          <p className='text-lg leading-2'>
            Embark on a journey with our Quran quiz journey to enhance your
            <span className='block'> memorization strength. Whether you're a hafiz or novice, our quiz offers </span>
            <span className='block'>an immersive way to strengthen your hifz.</span>
          </p>
          <div className='flex gap-2'>
            <button className='border rounded-md py-2 shadow-md px-6 bg-black text-white'>Start Quiz</button>
            <button className='border rounded-md py-2 shadow-md px-6 bg-black text-white'>Create Quiz</button>
          </div>
        </div>
        <div className={`flex pl-20 transform transition-transform duration-1000 ease-in-out ${inView1 ? 'translate-y-0' : 'translate-y-32'}`}>
          <img src={QuranImage} alt='quiz-image' className='w-4/4' />
        </div>
      </section>

      <section className={`flex flex-col gap-10 items-center justify-center w-full px-4 reveal-animation lg:px-20 ${inView2 ?  'active opacity-100' : 'opacity-0'}`} ref={sectionRef2}>
        <p className='text-[4.5rem] font-serif text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-900'>Participate in the Quiz</p>
        <div className='flex justify-around w-full h-2/3'>
          <div className='border w-2/4 flex flex-col items-center overflow-hidden rounded-2xl shadow-md gap-5'>
            <div className='flex items-center justify-center flex-col gap-2 py-4'>
              <p className='font-bold text-4xl'>Challenge your Knowledge</p>
              <p className='text-center text-xl'>Test your Quranic memorization skills with our carefully <span className='block'> selected questions.</span> </p>
            </div>
            <img src={ChallengeImage} alt='quizImage' className='w-2/4 mt-7' />
          </div>
          <div className='w-2/5 border rounded-2xl shadow-md flex flex-col items-center gap-5 py-4 overflow-hidden'>
            <div className='flex items-center justify-center flex-col gap-2 px-4'>
              <p className='font-bold text-4xl'>Interactive Learning</p>
              <p className='text-center text-xl'>Get instant feedback on your answers and learn from any mistakes.</p>
            </div>
            <div className='relative flex items-center justify-center'>
              <img
                src={InteractiveImage1}
                alt='quizAnswer'
                className={`absolute mt-12 w-2/3 transition-opacity duration-1000 ${isImage1 ? 'opacity-100' : 'opacity-0'}`}
              />
              <img
                src={InteractiveImage2}
                alt='quizAnswer2'
                className={`mt-12 w-2/3 transition-opacity duration-1000 ${isImage1 ? 'opacity-0' : 'opacity-100'}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={`flex flex-col items-center justify-center w-full reveal-animation gap-3 px-4 lg:px-20 transform transition-transform duration-1000 ease-in-out ${inView3 ? 'active opacity-100' : 'opacity-0'}`} ref={sectionRef3}>
        <p className='text-[4rem] tracking-tight bg-clip-text text-transparent bg-gradient-to-l from-blue-400 to-blue-700'>How it works</p>
        <div className='grid grid-cols-3 gap-14'>
          <div className='border shadow-lg h-72 rounded-2xl py-4 flex flex-col items-center gap-10'>
            <div className='border-black w-full flex items-center justify-center'>
              <BsFillPatchQuestionFill className='text-[6rem]' />
            </div>
            <div className='flex flex-col items-center gap-3 h-44'>
              <p className='text-xl font-bold'>Answer Questions</p>
              <p className='px-6 text-center text-[18px]'>You will be presented with multiple-choice questions. Select the correct answer from the options.</p>
            </div>
          </div>
          <div className='border shadow-lg h-72 rounded-2xl py-4 flex flex-col items-center gap-10'>
            <div className='border-black w-full flex items-center justify-center'>
              <FaCheckCircle className='text-[6rem]' />
            </div>
            <div className='flex flex-col items-center gap-3 h-44'>
              <p className='text-[20px] font-bold'>Get Results</p>
              <p className='px-6 text-center text-[18px]'>After completing the quiz, you will see your score and the correct answers for each question.</p>
            </div>
          </div>
          <div className='border shadow-lg h-72 rounded-2xl py-4 flex flex-col items-center justify-center gap-10'>
            <div className='border-black w-full flex items-center justify-center'>
              <FaEye className='text-[6rem]' />
            </div>
            <div className='flex flex-col items-center gap-3 h-44'>
              <p className='text-[20px] font-bold'>Review and Learn</p>
              <p className='px-6 text-center text-[18px]'>Review your answers to understand any mistakes and improve your memorization.</p>
            </div>
          </div>
        </div>
      </section>

      <section 
  className={`flex flex-col bg-black text-white w-full reveal-animation px-4 py-4 lg:px-20 lg:py-10 transform transition-transform duration-1000 ease-in-out ${inView4 ? 'active' : ''}`} 
  ref={sectionRef4}
>
  <div className='flex  gap-10 w-full'>
    {/* Left column */}
    <div className=''>
      <div className='text-[4rem] flex flex-col gap-3 pt-10 leading-tight font-serif lg:sticky lg:top-10'>
        Create and Share <span className='block'>Your Own</span> Quiz
        <span className='text-lg px-2 block'>
        Think you can create a challenging quiz? Share your knowledge with others by creating your own quiz.
      </span>
      </div>
    </div>
    
    {/* Right column */}
    <div className='flex  flex-col  pt-[40rem]' >
      <div className={`pb-60 bg-black fade-in reveal-animation  ${inPointsRef1 ? 'active': ''}`} ref={pointsRef1}>
        <div className='flex items-center gap-4'>
          <div className='w-10'>
            <Lottie animationData={arrowAnimation} style={{ filter: 'invert(100%)' }} />
          </div>
          <p className='text-[2rem] font-bold'>Develop a Quiz</p>
        </div>
        <p className='text-lg text-center'>
          Design engaging questions, choose from a variety of formats, and tailor your quiz to suit your audience.
        </p>
      </div>
      <div className={`pb-60 bg-black fade-in reveal-animation  ${inPointsRef2 ? 'active': ''}`} ref={pointsRef2}>
        <div className='flex items-center gap-4'>
          <div className='w-10'>
            <Lottie animationData={arrowAnimation} style={{ filter: 'invert(100%)' }} />
          </div>
          <p className='text-[2rem] font-bold'>Post for Others</p>
        </div>
        <p className='text-lg text-center'>
          Share your quiz to engage others and foster learning. Spark discussions and collaboration within the community.
        </p>
      </div>
      <div className={`lg:sticky lg:bottom-0 -z-10 pb-20 reveal-animation ${inView4 ? 'active' : ''}`}>
        <button className='rounded-lg bg-white text-black shadow-md py-2 px-6 font-bold'>
          Create Quiz
        </button>
      </div>
    </div>
  </div>
</section>


      <section className={`flex flex-col gap-2 items-center justify-center reveal-animation w-full pb-32 transform transition-transform duration-1000 ease-in-out ${inView4 ? 'active translate-y-0' : 'translate-y-32'}`}>
        <div className=''>
          <h2 className='text-[3rem] font-serif dark:text-white'>
            Boost Your Memorization with Our <span className='text-transparent bg-clip-text bg-gradient-to-tr from-[#090e99] via-[#052862] to-[#0843e5]'>Interactive Quiz</span>
          </h2>
        </div>
        <div className='flex gap-2'>
          <button className='bg-black rounded-md py-2 font-bold text-white shadow-md px-8'>Start Quiz</button>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
