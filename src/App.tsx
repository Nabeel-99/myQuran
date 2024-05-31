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

const App = () => {
  const API_ROUTE = 'http://localhost:3000'
  const [user, setUser] = useState<string>('')
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === "dark" || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  const autheticateUser = async() => {
    try {
       const response = await axios.get(`${API_ROUTE}/api/users/auth`, {
        withCredentials: true
       })
       setUser(response.data.fullName)
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
  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' :  'dark'
    setIsDarkMode(!isDarkMode)
    localStorage.setItem('theme', newTheme)

  }
  useEffect(() => {
    if(!isDarkMode){
      document.documentElement.classList.add('dark')
    }else{
      document.documentElement.classList.remove('dark')
    }
    autheticateUser()
  }, [isDarkMode])
  return (
    <>
    <Router>
      <div className='flex flex-col w-screen  h-full font-sans '>
        <Navbar user={user} isLoggedIn={isLoggedIn} logout={logout} toggleDarkMode={toggleDarkMode}/>
     <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/surah/:id' element={<Surah/>}></Route>
        <Route path='/juz/:juzId' element={<Surah/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn authenticateUser={autheticateUser}/>}></Route>
      </Routes>
        <Footer/>
     </div>
    </Router>
    </>
  )
}

export default App
