import React from 'react'
import { useForm } from "react-hook-form"

import { IoIosArrowRoundDown } from "react-icons/io";

import Header from '../../Components/Header';


const Employees = () => {
  const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (data) => {
    try {
      console.log(data)
      reset()
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }

  return (
    <>
      < Header />
      {/* Main TOP */}
      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Employees/Leasing_form_banner_desktop.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY BUSINESS</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-4/6" >Leasing form</p>
        </div>
        <a href="#leasing" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none flex items-center">
          <span>Go to leasing form</span> <IoIosArrowRoundDown className='text-xl' />
        </a>
      </section>

      {/* Content 1 */}
      <section className='mx-14 mt-24 mb-36 flex gap-20 '>
        <img src="/images/Employees/Leasing_form_desktop_mobile.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
        <div className='w-1/2 pl-28 pr-10 my-auto font-montserrat-light'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Start your lease request</h1>
          <p className='my-7'>Does your employer in the Netherlands offer a bike scheme? Then you might be able to lease a Veloretti Ivy or Ace Two and benefit from the tax savings. Welcome to the new era of commuting.</p>
          <p className='mb-14'>If you have already been approved by your employer to start a bike lease with Veloretti, you can already start your leasing process on this page.</p>
          <a href="#leasing" className='py-5 px-7 border rounded-full text-black bg-white hover:text-white hover:bg-black ' >Fill in form</a>
        </div>
      </section>

      {/* Leasing Form */}
      <section className='w-4/6 mx-auto'>
        <h1 id='leasing' className='my-16 text-5xl font-montserrat-medium text-center relative'>
          <span>Lease your Ivy or Ace</span>
          <span className="text-xl font-montserrat-medium absolute ml-0.5">Two</span>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className='mb-14 flex flex-col gap-10 font-montserrat-light text-sm  '>

          {/* Select a country */}
          <div className='flex flex-col gap-3'>
            <select {...register("country", {
              required: { value: true, message: "* Country selection is required" }
            })} className='p-4 border' placeholder='Select' >
              <option value="">Select a country</option>
              <option value="Netherlands">Netherlands</option>
              <option value="UK">Belgium</option>
              <option value="US">France</option>
            </select>
            {errors.country && <span className='text-red-500'>{errors.country.message}</span>}
          </div>

          {/* First Name */}
          <div className='flex flex-col gap-3' >
            <input {...register("firstName", {
              required: { value: true, message: "* First Name is required" },
              minLength: { value: 3, message: "* min 3 character required" },
              maxLength: { value: 30, message: "* max 30 character allowed" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "* invalid entry"
              }
            })} className='p-4 border placeholder-black' placeholder='First name' />
            {errors.firstName && <span className='text-red-500'>{errors.firstName.message}</span>}
          </div>

          {/* Last Name */}
          <div className='flex flex-col gap-3' >
            <input {...register("lastName", {
              required: { value: true, message: "* Last Name is required" },
              minLength: { value: 3, message: "* min 3 character required" },
              maxLength: { value: 30, message: "* max 30 character allowed" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "* invalid entry"
              }
            })} className='p-4 border placeholder-black' placeholder='Last name' />
            {errors.lastName && <span className='text-red-500'>{errors.lastName.message}</span>}
          </div>

          {/* Email */}
          <div className='flex flex-col gap-3'  >
            <input {...register("email", {
              required: { value: true, message: "* Email is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "* invalid email address"
              }
            })} className='p-4 border placeholder-black' placeholder='E-mail' />
            {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          </div>

          {/* Phone Number */}
          <div className='flex flex-col gap-3'  >
            <input {...register("phoneNo", {
              required: { value: true, message: "* Phone Number is required" },
              pattern: {
                value: /^[0-9]+$/,
                message: "* invalid Phone Number"
              }
            })} className='p-4 border placeholder-black' placeholder='Phone number' />
            {errors.phoneNo && <span className='text-red-500'>{errors.phoneNo.message}</span>}
          </div>

          {/* Company Name */}
          <div className='flex flex-col gap-3' >
            <input {...register("companyName", {
              required: { value: true, message: "* Company Name is required" },
              minLength: { value: 3, message: "* min 3 character required" },
              maxLength: { value: 30, message: "* max 30 character allowed" },
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: "* invalid entry"
              }
            })} className='p-4 border placeholder-black' placeholder='Company name' />
            {errors.companyName && <span className='text-red-500'>{errors.companyName.message}</span>}
          </div>

          {/* Delivery address */}
          <div className='flex flex-col gap-3'>
            <div className='flex flex-row gap-3'>
              <input {...register("streetAddress", { required: { value: true, message: "* Street Address is required" } })}
                className='p-4 border placeholder-black' placeholder='Street Address' />

              <input
                {...register("houseNumber", {
                  required: { value: true, message: "* House number is required" }
                })}
                className='p-4 border placeholder-black'
                placeholder='House Number'
              />

              <input
                {...register("postcode", {
                  required: { value: true, message: "* Postcode is required" }
                })}
                className='p-4 border placeholder-black'
                placeholder='Postcode'
              />

              <input
                {...register("city", {
                  required: { value: true, message: "* City is required" }
                })}
                className='p-4 border placeholder-black'
                placeholder='City'
              />
            </div>{
              errors.streetAddress && <span className='text-red-500'>{errors.streetAddress.message}</span> ||
              errors.houseNumber && <span className='text-red-500'>{errors.houseNumber.message}</span> ||
              errors.postcode && <span className='text-red-500'>{errors.postcode.message}</span> ||
              errors.city && <span className='text-red-500'>{errors.city.message}</span>
            }</div>

          {/* Submit */}
          <input disabled={isSubmitting} type="submit" className='cursor-pointer bg-[#898a8a] rounded-full text-white p-3 font-montserrat-medium' />
        </form>
      </section>
    </>
  )
}

export default Employees
