import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import { CiShare2 } from 'react-icons/ci'
import { FaRegBookmark, FaRegEye } from 'react-icons/fa'
import { IoGameControllerOutline } from 'react-icons/io5'
import { TfiWrite } from 'react-icons/tfi'
import { Link, useNavigate } from 'react-router-dom'
import { API_ROUTE } from '../apis/quranApi'

interface LoginCredentials{
  email: string,
  password: string
}
interface SignInProps{
  authenticateUser:() => void
}
const SignIn: React.FC<SignInProps> = ({authenticateUser}) => {
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
    <div className='flex flex-col lg:flex-row   h-full w-full justify-center items-start mt-14 lg:mt-32 mb-52 px-4 lg:px-20'> 
    <div className='lg:w-2/3  flex flex-col items-center justify-center order-1 gap-4 w-full  '>
    <p className='text-2xl font-serif font-bold italic mt-8 lg:mt-0'>Start your journey</p>
        <form className='border w-full  border-black p-6 rounded-lg dark:bg-[#303233] dark:text-white' onSubmit={handleLoginSubmit}>
          <p className='text-3xl font-bold'>Login</p>
          <div className='text-red-500'>{error}</div>
          <div className='mb-8 mt-11'>
            <label className='block text-sm font-medium  mb-2' htmlFor='email'>Email</label>
            <input 
              value={userData.email}
              onChange={handleChange}
              name='email'
              className='border border-black rounded-md dark:bg-[#232529] px-3 py-1 w-full' 
              id='email' 
              placeholder='Enter your email'/>
          </div>
        
          <div className='mb-8'>
            <label className='block text-sm font-medium  mb-2' htmlFor='password'>Password</label>
            <input 
              value={userData.password}
              onChange={handleChange}
              className='border border-black dark:bg-[#232529] rounded-md px-3 w-full py-1' 
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
</div>
  )
}

export default SignIn
