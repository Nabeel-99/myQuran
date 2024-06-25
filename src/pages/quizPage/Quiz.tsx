import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import QuranImage from "../../assets/images/handquiz.png";
import ChallengeImage from "../../assets/images/challenge.png";
import InteractiveImage1 from "../../assets/images/interactive1.png";
import InteractiveImage2 from "../../assets/images/interactive2.png";
import arrowAnimation from "../../assets/icons/arrow.json";
import Lottie from 'lottie-react';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaCheckCircle, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';


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


  // const { ref: pointsRef1, inView: inPointsRef1 } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.2,
  // });

  // const { ref: pointsRef2, inView: inPointsRef2 } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.2,
  // });
  


  useEffect(() => {
    const imageToggle = setInterval(() => {
      setIsImage1((prev) => !prev);
    }, 5000);

    // Clean up interval
    return () => clearInterval(imageToggle);

  }, []);

  return (
    <div className='flex flex-col  h-full w-full pb-20 mt-32'>
     
      <section className={`flex flex-col xl:flex-row xl:justify-between w-full gap-10 xl:gap-0   px-4 lg:px-28 reveal-animation ${inView1 ? 'active opacity-100' : 'opacity-0'}`} ref={sectionRef1}>
        <div className='flex flex-col lg:px-20 xl:px-0 md:px-10 gap-5 xl:w-2/3'>
          <p className=' text-[3rem] md:text-[3.5rem] lg:text-[4.5rem]  font-serif dark:text-white  leading-tight tracking-tight'>
            An Interactive way
            <span className='xl:block'> to Perfect your</span>
            <span className='xl:block'> Quran Hifz</span>
          </p>
          <p className='text-lg leading-2'>
            Embark on a journey with our Quran quiz journey to enhance your
            <span className='block'> memorization strength. Whether you're a hafiz or novice, our quiz offers </span>
            <span className='block'>an immersive way to strengthen your hifz.</span>
          </p>
          <p className='text-sm italic font-semibold tracking-tight text-gray-400'>Please log in or create an account to create a quiz.</p>
          <div className='flex flex-col   xl:items-center xl:flex-row gap-2'>
            <Link to={"/quiz-cards"} className='border  rounded-md py-3 shadow-md px-6 bg-black text-white text-center dark:bg-white dark:text-black dark:border-none hover:dark:bg-black hover:dark:text-white'>Start Quiz</Link>
            <Link to={"/create-quiz"} className='border  rounded-md py-3 shadow-md px-6 bg-black text-white text-center dark:bg-white dark:text-black dark:border-none hover:dark:bg-black hover:dark:text-white'>Create Quiz</Link>
          </div>
        </div>
        <div className={`flex items-center justify-center lg:pl-20 transform transition-transform duration-1000 ease-in-out ${inView1 ? 'translate-y-0' : 'translate-y-32'}`}>
          <img src={QuranImage} alt='quiz-image' className='w-4/4' />
        </div>
      </section>

      <section id="participate" className={`flex  flex-col gap-10 items-center justify-center w-full px-4 reveal-animation lg:px-20 ${inView2 ?  'active opacity-100' : 'opacity-0'}`} ref={sectionRef2}>
        <p className='text-[2rem] md:text-[3rem] xl:text-[4.5rem] font-serif dark:text-white'>Participate in the Quiz</p>
        <div className='flex flex-col md:px-10 lg:px-20 xl:px-0 xl:flex-row xl:justify-around w-full gap-10 xl:gap-0 h-2/3'>
          <div id='smooth-transition-cards' className={`border xl:w-2/4 flex flex-col items-center overflow-hidden dark:bg-[#232425] dark:border-none dark:shadow-lg   rounded-2xl shadow-md gap-5 ${inView2 ? 'active' : ''} ` }>
            <div className='flex items-center justify-center flex-col gap-2 py-4'>
              <p className='font-bold text-2xl md:text-4xl'>Challenge your Knowledge</p>
              <p className='text-center px-1 md:px-0 text-xl'>Test your Quranic memorization skills with our carefully <span className='block'> selected questions.</span> </p>
            </div>
            <img src={ChallengeImage} alt='quizImage' className='w-2/4 mt-7' />
          </div>
          <div id='smooth-transition-cards' className={`border xl:w-2/5 py-4 flex flex-col items-center overflow-hidden dark:bg-[#232425] dark:border-none dark:shadow-lg  rounded-2xl shadow-md gap-5 ${inView2 ? 'active' : ''} ` }>
            <div className='flex items-center justify-center flex-col gap-2 px-4'>
              <p className='font-bold text-2xl md:text-4xl'>Interactive Learning</p>
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

      <section id='how-it-works' className={`flex flex-col pb-20 items-center justify-center w-full reveal-animation gap-3 px-4 lg:px-20 transform transition-transform duration-1000 ease-in-out ${inView3 ? 'active opacity-100' : 'opacity-0'}`} ref={sectionRef3}>
        <p className='text-[2.5rem] md:text-[3rem] xl:text-[4rem] tracking-tight dark:text-white'>How it works</p>
        <div className='grid grid-flow-row lg:grid-cols-3  md:px-40 lg:px-0 gap-14'>
          <div className='dark:bg-[#232425] dark:border-none dark:shadow-2xl dark:drop-shadow-lg rounded-2xl shadow-md border    py-4 flex flex-col items-center gap-10'>
            <div className='border-black w-full flex items-center justify-center'>
              <BsFillPatchQuestionFill className='text-[6rem]' />
            </div>
            <div className='flex flex-col items-center gap-3 h-44'>
              <p className='text-xl font-bold'>Answer Questions</p>
              <p className='px-6 text-center text-[18px]'>You will be presented with multiple-choice questions. Select the correct answer from the options.</p>
            </div>
          </div>
          <div className='dark:bg-[#232425] dark:border-none dark:shadow-2xl dark:drop-shadow-lg rounded-2xl shadow-md border    py-4 flex flex-col items-center gap-10'>
            <div className='border-black w-full flex items-center justify-center'>
              <FaCheckCircle className='text-[6rem]' />
            </div>
            <div className='flex flex-col items-center gap-3 h-44'>
              <p className='text-[20px] font-bold'>Get Results</p>
              <p className='px-6 text-center text-[18px]'>After completing the quiz, you will see your score and the correct answers for each question.</p>
            </div>
          </div>
          <div className='dark:bg-[#232425] dark:border-none dark:shadow-2xl dark:drop-shadow-lg rounded-2xl shadow-md border    py-4 flex flex-col items-center gap-10'>
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

      <section id='' className={`flex flex-col  text-white w-full reveal-animation px-4 py-4 lg:px-20 lg:py-10  ${inView4 ? 'active bg-black transform transition-transform duration-1000 ease-in-out' : ''}`} ref={sectionRef4}>
  <div className='flex flex-col lg:flex-row md:px-20 lg:px-0 gap-10 w-full'>
    {/* Left column */}
    <div className=''>
      <div className=' flex flex-col gap-3 pt-10 leading-tight font-serif lg:sticky lg:top-10'>
        <p className='text-[2.5rem] md:text-[3rem] lg:text-[4rem]'>Create and Share <span className='lg:block'>Your Own</span> Quiz</p>  
        <span className='text-lg px-2 lg:block'>
        Think you can create a challenging quiz? Share your knowledge with others by creating your own quiz.
        </span>
      </div>
    </div>
    
    {/* Right column */}
    <div className='flex  flex-col   lg:pt-[40rem]' >
      <div className={`pb-8 lg:pb-60 z-10 bg-black  `} >
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
      <div className={`pb-8 lg:pb-40 z-10 bg-black   `} >
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
      <div className={` pb-20 items-center flex justify-center lg:justify-normal `}>
        <Link to={"/create-quiz"} className=' cursor-pointer rounded-lg bg-white hover:shadow-md hover:shadow-[#d5d5d5] text-black shadow-md py-2 px-6 w-full md:w-2/4 lg:w-auto font-bold'>
          Create Quiz
        </Link >
      </div>
    </div>
  </div>
</section>


      <section className={`flex flex-col gap-2 pt-10 items-center justify-center reveal-animation w-full pb-32 transform transition-transform duration-1000 ease-in-out ${inView4 ? 'active translate-y-0' : 'translate-y-32'}`}>
        <div className='px-4 md:px-20'>
          <h2 className='text-[2rem] text-center md:text-[3rem] font-serif dark:text-white'>
            Boost Your Memorization with Our <span className=''>Interactive Quiz</span>
          </h2>
        </div>
        <div className='flex items-center justify-center gap-2 w-full px-4 md:px-20'>
          <Link to={"/quiz-cards"} className='border rounded-md py-3 text-center font-bold shadow-md px-6 w-full md:w-2/4 lg:w-44  bg-black text-white dark:bg-white dark:text-black dark:border-none hover:dark:bg-black hover:dark:text-white'>Start Quiz</Link>
        </div> 
      </section>
    </div>
  );
};

export default Quiz;
