import { useState } from 'react'
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom';

import { PiInstagramLogoFill } from "react-icons/pi";
import { FaFacebook, FaYoutube, FaTiktok, FaIdeal, FaCcVisa } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { SiKlarna, SiMastercard, SiPaypal, SiShopify } from "react-icons/si";
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { IoArrowUp } from "react-icons/io5";

const Footer = () => {
    const [checked, setChecked] = useState(false)
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm()
    const email = watch("email");

    const handleChecked = () => {
        setChecked(!checked)
    }

    const warningCB = () => (
        <div className='text-xs pt-8 text-center animate-slideDown'>
          PLEASE AGREE TO THE PRIVACY POLICY BEFORE SUBSCRIBING
        </div>
      );

    const onSubmit = async (data) => {
        if(checked){
            console.log("News Letter Email : ", data.email)
            reset();
        }
    }

    return (
        <footer>
            <div className='bg-[#494949] flex items-center justify-between py-10 px-56'>
                <span className=' text-white w-4/6 font-light'>Ready to take the Electric Ivy or Ace for a spin? Our 35 partner stores across the Netherlands are there for you. Whether you&apos;re looking to pick up a newly ordered bike, need a fix, or want to test ride our Ivy or Ace Two, your ideal biking experience is closer than you think.</span>
                <button className='bg-white rounded-full py-3 px-16 '>BOOK NOW</button>
            </div>
            <div className="bg-zinc-900 text-white flex justify-between px-12 pt-14 relative">
                <a href='#scrollToTop'
                    className='absolute bg-white text-black top-5 right-14 p-2 rounded-full hover:bg-[#a5a5a5] hover:text-white cursor-pointer transition-all duration-300 ease-in-out' >
                    <IoArrowUp className='text-4xl ' />
                </a>
                <div className="flex gap-40">
                    <ul className="text-zinc-300 " >
                        <li className="text-2xl text-white pb-4 font-medium" >Explorer</li>
                        <li className="footerRoutes" > <Link to="/">Electric bikes</Link> </li>
                        <li className="footerRoutes" > <Link to="/">City bikes</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Kids bikes</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Accessories</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Size guide</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Outlet</Link> </li>
                    </ul>
                    <ul className="text-zinc-300 gap-4" >
                        <li className="text-2xl text-white pb-4 font-medium" >About</li>
                        <li className="footerRoutes" > <Link to="/">About us</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Journal</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Reviews</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Press</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Jobs</Link> </li>
                    </ul>
                    <ul className="text-zinc-300 gap-4" >
                        <li className="text-2xl text-white pb-4 font-medium" >Help</li>
                        <li className="footerRoutes" > <Link to="/">Contact</Link> </li>
                        <li className="footerRoutes" > <Link to="/">FAQ</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Delivery</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Assembly & manuals</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Payment options</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Privacy policy</Link> </li>
                        <li className="footerRoutes" > <Link to="/">Terms & conditions</Link> </li>
                    </ul>

                </div>
                <div className="flex flex-col gap-6 w-1/3">
                    <div className="text-2xl font-medium" >Join the ride.</div>
                    <div className="text-lg" >Sign up for our newsletter.</div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="rounded-full border-[1px] flex">
                            <input {...register("email", {
                                required: { value: true, message: "ENTER EMAIL ADDRESS, TRY AGAIN." },
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "INVALID EMAIL ADDRESS, TRY AGAIN."
                                }
                            })} className='border-none text-sm bg-transparent placeholder-white py-4 w-96 text-center outline-none'
                                placeholder="Enter your email address here" maxLength={60} autoComplete="off" />
                            <button disabled={isSubmitting} className="bg-white rounded-full text-black py-3 px-10">Subscribe</button>
                        </div>

                        {errors.email && <div className='text-xs pt-8 text-center animate-slideDown'>{errors.email.message}</div> || ( email && !checked && warningCB())}
                        <div className='flex gap-1 py-8'>
                            <button  className='text-xl' onClick={handleChecked} >{checked ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}</button>
                            <span >By signing up, I agree to the <span className="underline">privacy policy</span> of VeloCity.</span>
                        </div>
                    </form>

                    <ul className="flex gap-5 justify-end items-center">
                        <li> <Link to="https://www.facebook.com/"> <FaFacebook className="text-lg" /> </Link> </li>
                        <li> <Link to="https://www.instagram.com/"> <PiInstagramLogoFill className="text-xl" /> </Link> </li>
                        <li> <Link to="https://www.youtube.com/"> <FaYoutube className="text-xl" /> </Link> </li>
                        <li> <Link to="https://www.linkedin.com/"> <IoLogoLinkedin className="text-xl" /> </Link> </li>
                        <li> <Link to="https://www.tiktok.com/"> <FaTiktok /> </Link> </li>
                    </ul>
                </div>
            </div>
            <div className="bg-zinc-900 text-white px-12 flex gap-1 items-center pt-2 pb-24">
                <span> Part of </span> <img src="/logo/pon.webp" alt="pon logo" className="invert h-4" loading='lazy' />
            </div>
            <div className="bg-zinc-900 text-zinc-500 px-12 flex gap-3 items-center pb-10 text-xl">
                <SiKlarna /> <FaIdeal /> <SiPaypal /> <SiShopify /> <SiMastercard /> <FaCcVisa />
            </div>
        </footer>
    )
}

export default Footer
