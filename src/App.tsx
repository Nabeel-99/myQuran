import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import Footer from './components/Footer'
import Surah from './pages/Surah'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

function App() {


  return (
    <>
    <Router>
      <div className='flex flex-col w-screen  h-full font-sans '>
        <Navbar/>
     <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/surah/:id' element={<Surah/>}></Route>
        <Route path='/juz/:juzId' element={<Surah/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<SignIn/>}></Route>
      </Routes>
        <Footer/>
     </div>
    </Router>
    </>
  )
}

export default App
