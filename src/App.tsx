import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Surah from './pages/Surah'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import axios from 'axios'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import Notes from './pages/Notes'
import Quiz from './pages/Quiz'

const App = () => {
  const API_ROUTE = 'http://localhost:3000'
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
      <div className='flex flex-col w-screen  h-full font-sans dark:bg-[#232528] dark:text-white '>
        <Navbar
          isDarkMode={isDarkMode}
          lightMode={lightMode}
          darkMode={darkMode}
          systemMode={systemMode}
          user={user} 
          isLoggedIn={isLoggedIn} 
          logout={logout} />
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
      </Routes>
        <Footer/>
     </div>
    </Router>
    </>
  )
}

export default App
