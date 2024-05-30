import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark, FaRegEye } from 'react-icons/fa'
import { IoGameController, IoGameControllerOutline } from 'react-icons/io5'
import { MdQuiz } from 'react-icons/md'
import { TfiWrite } from 'react-icons/tfi'
import { Link } from 'react-router-dom'

interface UserData{
  email: string,
  firstName: string,
  lastName: string,
  password: string
}
const SignUp = () => {
  const API_ROUTE = 'http://localhost:3000'
  const [userData, setUserData] = useState<UserData>({
    email: '',
    firstName: '',
    lastName: '',
    password: ''
  })
  const [error, setError]  = useState<string>('')
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
      } catch (error: any) {
        if(error.response && error.response >= 400 && error.response < 500){
          setError(error.response.data.message)
        }
      }
  }
  return (
    
    <div className='flex  h-screen w-full justify-around items-start mt-32 px-20'>
        <div className='w-1/3'>
            <form className='border border-black p-6 rounded-lg' onSubmit={handleSignUpSubmit}>
              <div className='text-red-500'>{error}</div>
              <div className='mb-8'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='email'>Email</label>
                <input 
                  type='email'
                  value={userData.email}
                  name='email'
                  onChange={handleChange}       
                  className='border border-black rounded-md px-3 py-1 w-full' 
                  id='email' 
                  placeholder='Enter your email'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='firstname'>First Name</label>
                <input 
                  type='text'
                  onChange={handleChange}
                  name='firstName'
                  value={userData.firstName}
                  className='border border-black rounded-md px-3 py-1 w-full' 
                  id='firstname' 
                  placeholder='Enter your First Name'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='lastname'>Last Name</label>
                <input 
                  type='text'
                  name='lastName'
                  onChange={handleChange}
                  value={userData.lastName}
                  className='border border-black rounded-md px-3 w-full py-1' 
                  id='lastname' 
                  placeholder='Enter your Last Name'
                  required/>
              </div>
              <div className='mb-8'>
                <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='password'>Password</label>
                <input 
                  value={userData.password}
                  onChange={handleChange}
                  name='password'
                  type='password'
                  className='border border-black rounded-md px-3 w-full py-1' 
                  id='password' 
                  placeholder='Password'
                  required/>
              </div>
              <div className='flex flex-col gap-3 items-start'>
                  <button className='bg-green-500 hover:bg-green-600 text-white px-3 rounded-md py-1'>Create Account</button>
                  <p>Already have an account? <Link to={'/login'} className='text-blue-700 font-bold'>Login</Link></p>
              </div>
            </form>
        </div>
        <div className='text-xl flex flex-col gap-4'>
            <p className='text-3xl font-bold'>Create Account</p>
            <p className='text-2xl'>Experience a world of benefits by creating an account:</p>
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
