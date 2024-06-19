import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation} from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Surah from './pages/Surah'
import SignUp from './pages/userRegistration/SignUp'
import axios from 'axios'
import Bookmarks from './pages/profilePage/Bookmarks'
import Profile from './pages/profilePage/Profile'
import Notes from './pages/profilePage/Notes'
import Quiz from './pages/quizPage/Quiz'
import StartQuiz from './pages/quizPage/StartQuiz'
import MaybeShowNavbar from './components/navbar/MaybeShowComponent'
import MaybeShowComponent from './components/navbar/MaybeShowComponent'
import CreateQuiz from './pages/quizPage/CreateQuiz'
import SignIn from './pages/userRegistration/SignIn'
import ScrollToTop from './components/ScrollToTop'
import MyQuestions from './pages/profilePage/MyQuestions'
import Questions from './pages/quizPage/Questions'

const App = () => {
  const API_ROUTE = 'http://localhost:3000'
  // const location = useLocation()
  const [user, setUser] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === "light" || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })
 
  const autheticateUser = async() => {
    try {
       const response = await axios.get(`${API_ROUTE}/api/users/auth`, {
        withCredentials: true
       })
       console.log(response.data)
       setUser(response.data.fullName)
       setEmail(response.data.email)
       setIsLoggedIn(true)
    } catch (error) {
      console.log('authErr:', error)
    }
}
  const logout = async() => {
    try {
      const response = await axios.post(`${API_ROUTE}/api/users/logout`, {}, {
          withCredentials: true
      })
      if(response.status === 200){
          setIsLoggedIn(false)
          setUser('')
          window.location.href = "/login"      
        }
   
  } catch (error) {
      console.log(error)
  }
  }
  
  const lightMode = () => {
    setIsDarkMode(false)
    localStorage.setItem('theme', 'light')
  }
  const darkMode = () => {
    setIsDarkMode(true)
    localStorage.setItem('theme', 'dark')
  }

  const systemMode = () => {
    setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    localStorage.removeItem('theme')
  }

  useEffect(() => {
    
    if(isDarkMode){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
    autheticateUser()
  }, [isDarkMode])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handlechange = (e: MediaQueryListEvent) => {
      if(!localStorage.getItem('theme')){
        setIsDarkMode(e.matches)
      }
    }
    mediaQuery.addEventListener('change', handlechange)

    return (() => {
      mediaQuery.removeEventListener('change', handlechange)
    })
  }, [])
  
  return (
    <>
    <Router>
      <ScrollToTop/>
      <div className='flex flex-col w-screen  h-full font-sans dark:bg-[#0a0a0a] dark:text-white '>
      <MaybeShowNavbar>
        <Navbar
          isDarkMode={isDarkMode}
          lightMode={lightMode}
          darkMode={darkMode}
          systemMode={systemMode}
          user={user} 
          isLoggedIn={isLoggedIn} 
          logout={logout} />
      </MaybeShowNavbar>
        
     <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/surah/:id' element={<Surah/>}></Route>
        <Route path='/juz/:juzId' element={<Surah/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn authenticateUser={autheticateUser}/>}></Route>
        <Route path='/bookmarks' element={<Bookmarks/>}></Route>
        <Route path='/profile' element={<Profile user={user} email={email}/>}></Route>
        <Route path='/notes' element={<Notes/>}></Route>
        <Route path='/quiz' element={<Quiz/>}></Route>
        <Route path='/quiz-cards' element={<Questions/>}></Route>
        <Route path='/get-started/:id' element={<StartQuiz/>}></Route>
        <Route path='/my-questions' element={<MyQuestions/>}></Route>
        <Route path='/create-quiz' element={<CreateQuiz user={user}/>}></Route>
      </Routes>
      
      <MaybeShowComponent>
        <Footer/>
      </MaybeShowComponent>
        
     </div>
    </Router>
    </>
  )
}

export default App
