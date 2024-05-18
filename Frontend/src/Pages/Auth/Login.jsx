import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header';

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    reset()
  }

  const handleSignUp = () => {
    // console.log("Forgot Password clicked")
    navigate("/account/signup")
  }

  const handleForgetPassword = () => {
    navigate("/account/forgot-password")
  }

  const handleRememberMe = () => {
    // setRememberMe(!rememberMe)
  }

  return (
    <>
      <Header />
      {/* Main TOP */}
      <section className='h-[93.5vh]'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/carlanicieza.webp" alt="Home Page Banner" loading='lazy' />

        <form onSubmit={handleSubmit(onSubmit)} className='bg-white font-montserrat-regular text-sm w-[28vw] flex flex-col gap-5 px-14 py-20 absolute z-0 right-56 top-28 '>
          <h1 className='text-center text-3xl font-montserrat-medium mb-5' >Log in</h1>

          {/* Email */}
          <div>
            <input {...register("email", {
              required: { value: true, message: "Please Enter a valid email" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please Enter a valid email"
              }
            })} className='border w-full p-4 placeholder-black' placeholder='Your email address' />
            {errors.email && <div className=' text-sm flex items-end text-red-500'>{errors.email.message}</div>}
          </div>

          {/* Password */}
          <input type="password"  {...register("password", {
            required: { value: true, message: "Email or password is incorrect" }
          })} className='border w-full p-4 placeholder-black' placeholder='Your password' />

          <div className='flex justify-between font-montserrat-light text-xs'>
            <div className='flex items-center gap-2'>
            <div className='w-2 h-2 border border-gray-400 rounded-full'></div>
            <input type="button" value='REMEMBER ME' onClick={handleRememberMe} className='cursor-pointer ' />
            </div>
            <input type="button" value='FORGOT PASSWORD' onClick={handleForgetPassword} className='cursor-pointer' />
          </div>

          <input disabled={isSubmitting} type="submit" className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          <input type="button" value='Create an account' onClick={handleSignUp} className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          {errors.password && <div className=' mx-auto text-sm flex items-end text-red-500'>{errors.password.message}</div>}
        </form>
      </section>
    </>
  )
}

export default Login
