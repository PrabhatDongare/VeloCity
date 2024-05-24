// import React, from 'react'
import { useForm } from "react-hook-form"
// import { useNavigate } from 'react-router-dom';

import Header from '../../Components/Header';

const ResetPassword = () => {

    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm()
    // const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data)
        reset()
        // navigate("/account/login")
    }

    const password = watch("password")

    return (
        <>
            <Header />

            <section className='h-[93.5vh]'>
                <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/carlanicieza.webp" alt="Home Page Banner" loading='lazy' />

                <form onSubmit={handleSubmit(onSubmit)} className='bg-white font-sans text-sm w-[28vw] flex flex-col gap-8 px-14 py-14 absolute z-0 right-56 top-28 '>
                    <h1 className='text-center text-4xl ' >Reset account password</h1>

                    {/* Password */}
                    <input type="password"  {...register("password", {
                        required: "Password is required",
                        minLength: { value: 8, message: "Password must be at least 8 characters long" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                        }
                    })} className='border w-full p-4 placeholder-black' placeholder='Password' />

                    {/* Confirm Password */}
                    <input type="password"  {...register("confirm_password", {
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords must match"
                    })} className='border w-full p-4 placeholder-black' placeholder='Confirm Password' />

                    <input disabled={isSubmitting} type="submit" className='w-full border rounded-full py-3 bg-black text-white cursor-pointer hover:bg-white hover:text-black' />
                    {errors.password && <div className=' mx-auto text-sm flex items-end text-red-500'>{errors.password.message}</div> ||
                        errors.confirm_password && <div className=' mx-auto text-sm flex items-end text-red-500'>{errors.confirm_password.message}</div>}
                </form>
            </section>
        </>
    )
}

export default ResetPassword
