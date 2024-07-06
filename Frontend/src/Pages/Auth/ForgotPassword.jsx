// import React, from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header';
import { useDispatch } from 'react-redux';
import { requestPasswordForgot } from '../../redux/user/userSlice'

const ForgotPassword = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const { email } = data
        await dispatch(requestPasswordForgot({ email }))
        reset()
    }

    const handleRememberPassword = () => {
        navigate("/account/login")
    }

    return (
        <>
            <Header />
            <section className='h-[93.5vh]'>
                <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/carlanicieza.webp" alt="Home Page Banner" loading='lazy' />

                <form onSubmit={handleSubmit(onSubmit)} className='bg-white font-montserrat-regular text-sm w-[28vw] flex flex-col gap-8 px-14 py-20 absolute z-0 right-56 top-28 '>
                    <h1 className='text-center text-3xl font-montserrat-medium mb-5' >We will send you an email to reset your password.</h1>
                    {/* Email */}
                    <div>
                        <input {...register("email", {
                            required: { value: true, message: "Please Enter a valid email" },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please Enter a valid email"
                            }
                        })} className='border w-full p-4 placeholder-black' placeholder='Your email address' />
                        {errors.email && <div className=' text-sm flex items-end text-red-500 '>{errors.email.message}</div>}
                    </div>
                    <input type="button" value='REMEMBERED YOUR PASSWORD ?' onClick={handleRememberPassword} className='cursor-pointer text-xs font-montserrat-light' />
                    <input disabled={isSubmitting} type="submit" className='w-full border rounded-full py-3 hover:bg-black hover:text-white cursor-pointer ' />
                </form>
            </section>
        </>
    )
}

export default ForgotPassword
