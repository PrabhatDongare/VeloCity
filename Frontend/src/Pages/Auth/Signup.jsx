import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchUserSignIn } from '../../redux/user/userSlice'
import Header from '../../Components/Header';

const Signup = () => {
  const [addToNewsletter, setAddToNewsletter] = useState(false);
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { first_name, last_name, email, password } = data
    await dispatch(fetchUserSignIn({ first_name, last_name, email, password }))
    reset()

    let token = await localStorage.getItem('token')
      if (token) {
        navigate('/account')
        toast.success('Sign Up Success')
      }
  }

  const handleAddToNewsletter = () => {
    setAddToNewsletter(!addToNewsletter)
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
            <input {...register("first_name", {
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
            <input {...register("last_name", {
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
          <div>
            <input type="password"  {...register("confirmPassword", {
              required: { value: true, message: "This field is required" },
              validate: (val) => {
                if (watch('password') != val) {
                  return "Your passwords do no match";
                }
              },
            })} className='border w-full p-4 placeholder-black' placeholder='Your password' />
            {errors.confirmPassword && <div className=' text-sm flex items-end text-red-500'>{errors.confirmPassword.message}</div>}
          </div>

          <div className='flex justify-between font-montserrat-light text-xs'>
            {addToNewsletter == false ?
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 border border-gray-400 rounded-full'></div>
                <input type="button" value='SUBSCRIBE TO THE NEWSLETTER' onClick={handleAddToNewsletter} className='cursor-pointer font-montserrat-regular text-gray-500' />
              </div>
              :
              <div className='flex items-center gap-2'>
                <div className='w-1 h-1 border border-black rounded-full ml-0.5 mr-0.5 '></div>
                <input type="button" value='SUBSCRIBE TO THE NEWSLETTER' onClick={handleAddToNewsletter} className='cursor-pointer font-montserrat-regular' />
              </div>}
          </div>

          <input disabled={isSubmitting} type="submit" value='Create' className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          <Link to='/account/login' className='text-center w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' >I already have an account</Link>
          <p className='text-xs font-montserrat-light text-center'>BY SIGNING UP YOU AGREE TO OUR <span className='font-montserrat-regular underline select-none'>PRIVACY POLICY</span></p>
        </form>
      </section>
    </>
  )
}

export default Signup

