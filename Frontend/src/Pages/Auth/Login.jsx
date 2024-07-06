import { useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../Components/Header';
import { fetchUserLogin } from '../../redux/user/userSlice'

const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)  
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { email, password } = data
    await dispatch(fetchUserLogin({ email, password }))
    reset();

    let token = await localStorage.getItem('token')
    if (token) {
      navigate('/account')
      toast.success('Log In success')
    }
  }

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  }

  return (
    <>
      <Header />
      {/* Main TOP */}
      <section className='h-[93.5vh]'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/carlanicieza.webp" alt="Home Page Banner" loading='lazy' />

        <form onSubmit={handleSubmit(onSubmit)} className='bg-white font-montserrat-regular text-sm w-[28vw] flex flex-col gap-5 px-14 py-16 absolute z-0 right-56 top-28 '>
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
            {rememberMe == false ?
              <div className='flex items-center gap-2' >
                <div className='w-2 h-2 border border-gray-400 rounded-full'></div>
                <input type="button" value='REMEMBER ME' onClick={handleRememberMe} className='cursor-pointer ' />
              </div> :
              <div className='flex items-center gap-2' >
                <div className='w-1 h-1 border-black border  rounded-full ml-0.5 mr-0.5'></div>
                <input type="button" value='REMEMBER ME' onClick={handleRememberMe} className='cursor-pointer text-black font-semibold' />
              </div>}

            <Link to='/account/forgot-password' className='cursor-pointer' >FORGOT PASSWORD</Link>
          </div>

          <input disabled={isSubmitting} type="submit" className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
          <Link to='/account/signup' className='text-center w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' >Create an account</Link>
          {errors.password && <div className=' mx-auto text-sm flex items-end text-red-500'>{errors.password.message}</div>}
        </form>
      </section>
    </>
  )
}

export default Login
