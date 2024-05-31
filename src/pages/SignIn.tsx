import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark, FaRegEye } from 'react-icons/fa'
import { IoGameControllerOutline } from 'react-icons/io5'
import { TfiWrite } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'

interface LoginCredentials{
  email: string,
  password: string
}
interface SignInProps{
  authenticateUser:() => void
}
const SignIn: React.FC<SignInProps> = ({authenticateUser}) => {
  const API_ROUTE = 'http://localhost:3000'
  const [userData, setUserData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const [error, setError] = useState<string>('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setUserData(prevState => ({...prevState, [name]: value}))
  }
  const handleLoginSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!userData.email || !userData.password){
      setError('Please fill all the fields')
    }
    try {
      const response = await axios.post(`${API_ROUTE}/api/users/login`, {
        email: userData.email,
        password: userData.password
      }, {withCredentials: true})
      if(response.status === 200){
        authenticateUser()
        navigate('/')
      }
    } catch (error: any) {
      if(error.response && error.response >= 400 && error.response < 500){
        setError(error.response.data.message)
      }
    }
  }
  return (
    <div className='flex  h-full w-full justify-around items-start mt-32 mb-52 px-20'> 
    <div className='w-1/3 flex flex-col gap-4  '>
    <p className='text-2xl font-serif font-bold italic'>Start your journey</p>
        <form className='border border-black p-6 rounded-lg' onSubmit={handleLoginSubmit}>
          <p className='text-3xl font-bold'>Login</p>
          <div className='text-red-500'>{error}</div>
          <div className='mb-8 mt-11'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='email'>Email</label>
            <input 
              value={userData.email}
              onChange={handleChange}
              name='email'
              className='border border-black rounded-md px-3 py-1 w-full' 
              id='email' 
              placeholder='Enter your email'/>
          </div>
        
          <div className='mb-8'>
            <label className='block text-sm font-medium text-gray-700 mb-2' htmlFor='password'>Password</label>
            <input 
              value={userData.password}
              onChange={handleChange}
              className='border border-black rounded-md px-3 w-full py-1' 
              id='password'
              name='password' 
              placeholder='Password'/>
          </div>
          <div className='flex flex-col gap-3 items-start'>
              <button className='bg-green-500 hover:bg-green-600 text-white px-5 rounded-md py-1' type='submit'>Login</button>
              <p>Don't have an account? <Link to={'/signup'} className='text-blue-700 font-bold'>Register</Link></p>
          </div>
        </form>
    </div>
    <div className='text-xl flex flex-col gap-4 w-2/6 mt-10 '>


   <p>Experience a world of benefits by creating an account:</p>
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

export default SignIn
