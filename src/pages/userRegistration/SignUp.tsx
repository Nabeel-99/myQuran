import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark, FaRegEye } from 'react-icons/fa'
import { IoGameController, IoGameControllerOutline } from 'react-icons/io5'
import { MdQuiz } from 'react-icons/md'
import { TfiWrite } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
import { API_ROUTE } from '../../apis/quranApi'
import { UserData } from '../../types/types'


const SignUp = () => {

  const [userData, setUserData] = useState<UserData>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  })
  const [error, setError]  = useState<string>('')
  const navigate = useNavigate()
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUserData(prevState => ({...prevState, [name]: value}))
}
  const handleSignUpSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userData.email || !userData.firstName || !userData.lastName || !userData.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if(userData.password.length < 5){
      setError("Password must be atleast 5 characters long")
      return
    }
      try {
          const response = await axios.post(`${API_ROUTE}/api/users/signup`, {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password
          })
          console.log(response.data)
          if(response.status === 201){
            navigate('/login')
          }
      } catch (error: any) {
        if(error.response && error.response >= 400 && error.response < 500){
          setError(error.response.data.message)
        }
      }
  }
  return (
    
    <div className='flex flex-col lg:flex-row   h-full w-full justify-around lg:gap-10 items-start mt-14 lg:mt-32 mb-52  px-4 lg:px-20'>
        <div className='xl:w-1/3 flex flex-col order-1 lg:order-none  gap-4 lg:w-2/4 w-full'>
        <p className='text-2xl font-serif font-bold italic mt-8 lg:mt-0'>Start your journey</p>
            <form className='border w-full border-black p-6 rounded-lg dark:bg-[#303233] dark:text-white' onSubmit={handleSignUpSubmit}>
              <div className='text-red-500'>{error}</div>
              <div className='mb-8'>
                <label className='block text-sm font-medium  mb-2' htmlFor='email'>Email</label>
                <input 
                  type='email'
                  value={userData.email}
                  name='email'
                  onChange={handleChange}       
                  className='border border-black dark:bg-[#232529] rounded-md px-3 py-1 w-full' 
                  id='email' 
                  placeholder='Enter your email'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium  mb-2' htmlFor='firstname'>First Name</label>
                <input 
                  type='text'
                  onChange={handleChange}
                  name='firstName'
                  value={userData.firstName}
                  className='border border-black dark:bg-[#232529] rounded-md px-3 py-1 w-full' 
                  id='firstname' 
                  placeholder='Enter your First Name'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium  mb-2' htmlFor='lastname'>Last Name</label>
                <input 
                  type='text'
                  name='lastName'
                  onChange={handleChange}
                  value={userData.lastName}
                  className='border border-black dark:bg-[#232529] rounded-md px-3 w-full py-1' 
                  id='lastname' 
                  placeholder='Enter your Last Name'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium  mb-2' htmlFor='password'>Password</label>
                <input 
                  value={userData.password}
                  onChange={handleChange}
                  name='password'
                  type='password'
                  className='border border-black dark:bg-[#232529] rounded-md px-3 w-full py-1' 
                  id='password' 
                  placeholder='Password'
                  required/>
              </div>
              <div className='flex flex-col gap-3 items-start'>
                  <button className='bg-green-500 hover:bg-green-600 text-white px-3 rounded-md py-1' type='submit'>Create Account</button>
                  <p>Already have an account? <Link to={'/login'} className='text-blue-700 dark:text-blue-400 hover:text-blue-500 font-bold'>Login</Link></p>
              </div>
            </form>
        </div>
        <div className='lg:text-xl flex flex-col gap-4 mt-10'>
            <p className='text-3xl font-bold'>Create Account</p>
            <p className='lg:text-2xl'>Experience a world of benefits by creating an account:</p>
            <ul className='flex flex-col gap-4'>
              <li className='flex items-center  gap-2'><FaRegBookmark/>Bookmarking Verses</li>
              <li className='flex items-center  gap-2'><TfiWrite/>Personal Notes</li>
              <li className='flex items-center  gap-2'><IoGameControllerOutline/>Developing Quizzes</li>
              <li className='flex items-center  gap-2'><CiShare2/>Share Verses</li>
              <li className='flex items-center  gap-2'><FaRegEye/>Track Recent Activities</li>
            </ul> 
        </div>
    </div>

  )
}

export default SignUp
