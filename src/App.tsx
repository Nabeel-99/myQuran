import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import LandingPage from './pages/LandingPage';
import Footer from './components/Footer';
import Surah from './pages/Surah';
import SignUp from './pages/userRegistration/SignUp';
import axios from 'axios';
import Bookmarks from './pages/profilePage/Bookmarks';
import Profile from './pages/profilePage/Profile';
import Notes from './pages/profilePage/Notes';
import Quiz from './pages/quizPage/Quiz';
import StartQuiz from './pages/quizPage/StartQuiz';
import MaybeShowNavbar from './components/navbar/MaybeShowComponent';
import MaybeShowComponent from './components/navbar/MaybeShowComponent';
import CreateQuiz from './pages/quizPage/CreateQuiz';
import SignIn from './pages/userRegistration/SignIn';
import ScrollToTop from './components/ScrollToTop';
import MyQuestions from './pages/profilePage/MyQuestions';
import Questions from './pages/quizPage/Questions';
import Hadith from './pages/hadithPage/Hadith';
import HadithView from './pages/hadithPage/HadithView';

const App = () => {
  const API_ROUTE = 'http://localhost:3000';
  const [user, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const autheticateUser = async () => {
    try {
      const response = await axios.get(`${API_ROUTE}/api/users/auth`, {
        withCredentials: true,
      });
      console.log(response.data);
      setUser(response.data.fullName);
      setEmail(response.data.email);
      setIsLoggedIn(true);
    } catch (error) {
      console.log('authErr:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${API_ROUTE}/api/users/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUser('');
        window.location.href = '/login';
      }
    } catch (error) {
      console.log(error);
    }
  };

  const applyTheme = (theme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const lightMode = () => {
    setIsDarkMode(false);
    applyTheme('light');
  };

  const darkMode = () => {
    setIsDarkMode(true);
    applyTheme('dark');
  };

  const systemMode = () => {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isSystemDark);
    localStorage.removeItem('theme');
    applyTheme(isSystemDark ? 'dark' : 'light');
  };

  useEffect(() => {
    applyTheme(isDarkMode ? 'dark' : 'light');
    autheticateUser();
  }, [isDarkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <>
      <Router>
        <ScrollToTop />
        <div className='flex flex-col w-screen h-full font-sans dark:bg-[#1f2125] dark:text-white'>
          <MaybeShowNavbar>
            <Navbar
              isDarkMode={isDarkMode}
              lightMode={lightMode}
              darkMode={darkMode}
              systemMode={systemMode}
              user={user}
              isLoggedIn={isLoggedIn}
              logout={logout}
            />
          </MaybeShowNavbar>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/surah/:id' element={<Surah />} />
            <Route path='/juz/:juzId' element={<Surah />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<SignIn authenticateUser={autheticateUser} />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/hadith' element={<Hadith />} />
            <Route path='/hadith/sahih-bukhari/chapter/:id' element={<HadithView />} />
            <Route path='/profile' element={<Profile user={user} email={email} />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/quiz-cards' element={<Questions />} />
            <Route path='/get-started/:id' element={<StartQuiz />} />
            <Route path='/my-questions' element={<MyQuestions />} />
            <Route path='/create-quiz' element={<CreateQuiz user={user} />} />
          </Routes>
          <MaybeShowComponent>
            <Footer />
          </MaybeShowComponent>
        </div>
      </Router>
    </>
  );
};

export default App;
