import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';

import { SlSocialInstagram } from "react-icons/sl";
import { IoArrowDown } from "react-icons/io5";


import Header from '../Components/Header';
const DisplayProduct = React.lazy(() => import('../Components/DisplayProduct'));
const CarouselCategory = React.lazy(() => import('../Sections/Home/CarouselCategory'));
const CarouselAwards = React.lazy(() => import('../Sections/Home/CarouselAwards'));
const CarouselReviews = React.lazy(() => import('../Sections/Home/CarouselReviews'));


const Home = () => {

  return (
    <>
      <Header />
      {/* Main TOP */}
      <section className='h-[93vh] text-white '>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Home/Homepage_banner_Ivy_and_Ace_Two_1_NEW.webp" alt="Home Page Banner" loading='lazy' />

        <div className="px-20 flex gap-1 items-center pt-5 justify-end">
          <span> Part of </span> <img src="/logo/pon.webp" alt="pon logo" className="invert h-4" loading='lazy' />
        </div>

        <div className="pt-36 px-12 font-montserrat-medium">
          <p className='animate-slideUp w-1/6' >VELOCITY ELECTRIC</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-2/6" >This is Two <span className="text-4xl bottom-1 absolute">&#9642;</span> </p>
          <p className='animate-slideUp w-2/6'>Introducing the all-new Ivy and Ace</p>
        </div>

        <div className="px-12 absolute right-0 bottom-14 text-black">
          <button className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</button>
          <button className="text-xs underline pl-10 underline-offset-2">Learn More</button>
        </div>
        <a href='#scrollToProducts'
          className='absolute bg-black bottom-8 left-[600px] pt-2 px-1 rounded-full hover:bg-white hover:text-black cursor-pointer transition-all duration-300 ease-in-out' >
          <IoArrowDown className='text-4xl animate-bounce ' />
        </a>
      </section>

      {/* 2 Display Products */}
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <DisplayProduct />
      </Suspense>

      {/* 3 Explore Cards */}
      <section className="py-14 relative">
        <span className="text-3xl absolute top-24 left-16">Explore our bikes</span>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <CarouselCategory />
        </Suspense>
      </section >

      {/* Logo & Text */}
      <section className="px-14 pt-14 pb-28" >
        <p className="text-7xl font-medium font-montserrat-medium pb-32 w-4/6">Make your commute the best part of your day</p>
        <p className="text-lg font-light flex justify-between" >
          <span className="w-2/6">Clean and timeless designs that make every ride a thrill. Wherever you&rsquo;re heading, our bikes are made to make your daily commute a joy.</span>
          <img src="/logo/no bg - logo icon black.webp" alt="logo" className="w-24" loading='lazy' />
        </p>
      </section >

      {/* Store Locations */}
      <section className="relative h-[125vh] text-white font-montserrat-medium" >
        < img src="/Common/Store_map.webp" alt="map" className="absolute -z-50 bg-[#ebedee]" loading='lazy' />
        <div className="px-36 pt-48 w-6/12">
          <p className="text-6xl mb-8 " >Discover your local VeloCity partner store</p>
          <p className="w-5/6" >Our partner stores across the Netherlands are there for you. Whether you&rsquo;re looking to pick up a newly ordered bike, need a fix, or want to test ride our Ivy or Ace Two, your ideal biking experience is closer than you think.</p>
          <button className="my-8 text-sm bg-white text-black rounded-full py-4 px-8 hover:text-white hover:bg-black">Find a partner store near you</button>
        </div>
      </section >

      {/* 3 Logo Cards */}
      <section className="px-14 py-24" >
        <p className="text-7xl font-montserrat-medium font-medium mb-28">They&rsquo;re talking about us</p>
        <div className="flex gap-10">
          <div className="border px-10 py-14 ">
            <p className="mb-10 text-2xl">&ldquo;One of the best e-bikes available at any price and far and away my favourite ride of the year.&rdquo;</p>
            <img src="/images/Home/the_verge.webp" alt="the verge" width={200} loading='lazy' />
          </div>
          <div className="border px-10 py-14 ">
            <p className="mb-10 text-2xl">&ldquo;One of the best e-bikes available at any price and far and away my favourite ride of the year.&rdquo;</p>
            <img src="/images/Home/bright_in.webp" alt="the verge" width={200} loading='lazy' />
          </div>
          <div className="border px-10 py-14 ">
            <p className="mb-10 text-2xl">&ldquo;One of the best e-bikes available at any price and far and away my favourite ride of the year.&rdquo;</p>
            <img src="/images/Home/vouge.webp" alt="the verge" width={200} loading='lazy' />
          </div>
        </div>
      </section >

      {/* Awards */}
      <section className="relative h-[125vh] select-none text-white" >
        <img src="/images/Home/Ace_Two_Matte_Black_1.webp" alt="Bike Image" className="absolute -z-50 bg-[#ebedee]" loading='lazy' />
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <CarouselAwards />
        </Suspense>
      </section >

      {/* Product Gallery */}
      <section className="px-14 py-24" >
        <p className="text-6xl w-1/2">You look good together.</p>
        <p className="flex items-center gap-2 py-14 w-2/6">
          <SlSocialInstagram />
          <span>Follow us on Instagram</span>
          <Link to="https://instagram.com/" className="underline underline-offset-2">@VeloCity</Link>
        </p>

        <div className="flex justify-between gap-3 h-[80vh] text-white font-montserrat-medium select-none">
          <div>
            <div className="relative transition-transform duration-300 transform hover:scale-95 cursor-pointer">
              <Link to='https://instagram.com/'><img src="/images/Home/wouterkaan.webp" alt="@wouterkaan" className="object-cover  h-[40vh] w-[55vh] mb-2 brightness-95 bg-[#ebedee]" loading='lazy' /></Link>
              <span className="absolute bottom-4 left-3" >@wouterkaan</span>
            </div>
            <div className="relative transition-transform duration-300 transform hover:scale-95 cursor-pointer">
              <Link to="https://instagram.com/"><img src="/images/Home/carlanicieza.webp" alt="@carlanicieza" className="object-cover h-[40vh] w-[55vh] mt-1.5 brightness-90 bg-[#ebedee]" loading='lazy' /></Link>
              <span className="absolute bottom-2 left-3" >@carlanicieza</span>
            </div>
          </div>

          <div className="relative transition-transform duration-300 transform hover:scale-95 cursor-pointer">
            <Link to="https://instagram.com/"><img src="/images/Home/mrroofop.webp" alt="@mrroofop" className="h-[81vh] w-[38vw] brightness-90 bg-[#ebedee]" loading='lazy' /></Link>
            <span className="absolute bottom-2 left-3" >@mr.roofop</span>
          </div>

          <div>
            <div className="relative transition-transform duration-300 transform hover:scale-95 cursor-pointer">
              <Link to="https://instagram.com/"><img src="/images/Home/athenadb.webp" alt="@athenadb" className="object-cover w-[60vh] h-[49vh] mb-3.5 brightness-95 bg-[#ebedee]" loading='lazy' /></Link>
              <span className="absolute bottom-5 left-3" >@athenadb</span>
            </div>
            <div className="flex relative">
              <div className="transition-transform duration-300 transform hover:scale-95 cursor-pointer">
                <Link to="https://instagram.com/"><img src="/images/Home/apnotte.webp" alt="@apnotte" className="object-cover h-[30vh] w-[30vh] mr-1.5 brightness-90 bg-[#ebedee]" loading='lazy' /></Link>
                <span className="absolute bottom-2 left-2" >@ap.notte</span>
              </div>
              <div className="transition-transform duration-300 transform hover:scale-95 cursor-pointer">
                <Link to="https://instagram.com/"><img src="/images/Home/mathildenauta.webp" alt="@mathildenauta" className="object-cover h-[30vh] w-[30vh] ml-1.5 brightness-90 bg-[#ebedee]" loading='lazy' /></Link>
                <span className="absolute bottom-2 left-3" >@mathildenauta</span>
              </div>
            </div>
          </div>
        </div>

      </section >
      <hr />

      {/* Testimonial */}
      <section className="px-14 pb-24 pt-14">
        <p className="text-7xl w-2/6">Let customers</p>
        <p className="text-7xl pb-28 w-2/6">speak for us.</p>
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <CarouselReviews />
        </Suspense>
      </section>

    </>
  )
}

export default Home
