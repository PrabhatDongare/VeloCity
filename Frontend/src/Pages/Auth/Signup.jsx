import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header';

const Signup = () => {
  const [rememberMe, setRememberMe] = useState(false)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    console.log(data)
    reset()
  }

  const handleBtn = () => {
    console.log("Forgot Password clicked")
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
      <section className='h-[140vh] '>
        <img className="absolute top-0 h-[150vh] w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/carlanicieza.webp" alt="Home Page Banner" loading='lazy' />

        <form onSubmit={handleSubmit(onSubmit)} className='bg-white font-montserrat-regular text-sm w-[30vw] flex flex-col gap-6 px-14 py-14 absolute z-0 right-56 top-28 '>
          <h1 className='text-center text-3xl font-montserrat-medium mb-5' >Sign up</h1>

          {/* First Name */}
          <div >
            <input {...register("firstName", {
              required: { value: true, message: "Please Enter First Name" },
              minLength: { value: 3, message: "min 3 character required" },
              maxLength: { value: 20, message: "max 20 character allowed" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "* invalid entry"
              }
            })} className='border w-full p-4 placeholder-black' placeholder='First name' width={21} />
            {errors.firstName && <span className='text-sm flex items-end text-red-500'>{errors.firstName.message}</span>}
          </div>

          {/* Last Name */}
          <div >
            <input {...register("lastName", {
              required: { value: true, message: "Please Enter Last Name" },
              minLength: { value: 3, message: "min 3 character required" },
              maxLength: { value: 20, message: "max 20 character allowed" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "* invalid entry"
              }
            })} className='border w-full p-4 placeholder-black' placeholder='Last name' width={21} />
            {errors.lastName && <span className='text-sm flex items-end text-red-500'>{errors.lastName.message}</span>}
          </div>

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
          <div>
            <input type="password"  {...register("password", {
              required: { value: true, message: 'Password is required' }
            })} className='border w-full p-4 placeholder-black' placeholder='Your password' />
            {errors.password && <div className=' text-sm flex items-end text-red-500'>{errors.password.message}</div>}
          </div>

          {/* Confirm Password */}
          <input type="password"  {...register("password", {
            required: { value: true, message: "This field is required" }
          })} className='border w-full p-4 placeholder-black' placeholder='Your password' />

          <div className='flex justify-between font-montserrat-light text-xs'>
            <div className='flex items-center gap-2'>
              <div className='w-2 h-2 border border-gray-400 rounded-full'></div>
              <input type="button" value='SUBSCRIBE TO THE NEWSLETTER' onClick={handleRememberMe} className='cursor-pointer font-montserrat-regular' />
            </div>
          </div>

          <input disabled={isSubmitting} type="submit" value='Create' className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          <input type="button" value='I already have an account' onClick={handleBtn} className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          <p className='text-xs font-montserrat-light text-center'>BY SIGNING UP YOU AGREE TO OUR <span className='font-montserrat-regular underline cursor-pointer '>PRIVACY POLICY</span></p>
        </form>
      </section>
    </>
  )
}

export default Signup
