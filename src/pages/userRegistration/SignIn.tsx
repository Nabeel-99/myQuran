import axios from 'axios'
import React, { FormEvent, useState } from 'react'
import dotAnimation from "../../assets/icons/dot.json";
import { Link, useNavigate } from 'react-router-dom'
import { API_ROUTE } from '../../apis/quranApi'
import Lottie from 'lottie-react'
import { FaSpinner } from 'react-icons/fa';


interface LoginCredentials{
  email: string,
  password: string
}
interface SignInProps{
  authenticateUser:() => void
}
const SignIn: React.FC<SignInProps> = ({authenticateUser}) => {
  const [loading, setLoading] = useState<boolean>(false)
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
      // add timer
      setError('Please fill in all fields')
      setTimeout(() => {
        setError('')
        }, 3000)
        
    }
    try {
      const response = await axios.post(`${API_ROUTE}/api/users/login`, {
        email: userData.email,
        password: userData.password
      }, {withCredentials: true})
      if(response.status === 200){
        authenticateUser()
        setLoading(true)
         setTimeout(() => {
          navigate('/')
          setLoading(false)
        }, 3000);
     
      }
      if(response.status === 400){
        setError("User not found")
        setTimeout(() => {
            setError('')
        }, 2000);
       
      }
    } catch (error: any) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  }
  return (
    <div className='flex flex-col lg:flex-row   h-full w-full justify-center items-start mt-14 lg:mt-32 mb-52 px-4 lg:px-20'>
      {loading ? <div className='flex flex-col gap-10 items-center justify-center h-full'>
          <p className='italic'>Authenticating User...</p>
          <FaSpinner className='spin text-xl'/>
        </div> : (
         <div className='lg:w-2/3  flex flex-col items-center justify-center order-1 gap-4 w-full  '>
         <p className='text-2xl font-serif font-bold italic mt-8 lg:mt-0'>Start your journey</p>
             <form className='border w-full  border-black p-6 rounded-lg dark:bg-[#303233] dark:text-white' onSubmit={handleLoginSubmit}>
               <p className='text-3xl font-bold'>Login</p>
               <div className='text-red-500 pt-2'>{error}</div>
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
                   <p>Don't have an account? <Link to={'/signup'} className='dark:text-blue-300 text-blue-700 hover:text-blue-600 font-bold'>Register</Link></p>
               </div>
             </form>
         </div>
      )}
   
</div>
  )
}

export default SignIn
