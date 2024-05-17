import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'

function App() {


  return (
    <>
    <Router>
      <div className='flex flex-col w-screen gap-8 h-screen bg-[#242424] text-white'>
        <Navbar/>
     <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
     </div>
    </Router>
    </>
  )
}

export default App
