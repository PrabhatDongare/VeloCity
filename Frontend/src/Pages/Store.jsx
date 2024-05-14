import { useState } from 'react'

import { IoIosArrowRoundDown } from "react-icons/io";
import { GiAutoRepair } from "react-icons/gi";
import { TbLocationCheck } from "react-icons/tb";
import { SlSpeedometer } from "react-icons/sl";
import { CiLocationOn } from "react-icons/ci";

import Header from '../Components/Header';


const Store = () => {
  const [questionNo, setQuestionNo] = useState(0)
  const handleQ1 = () => {
    if (questionNo != 1) {
      setQuestionNo(0)
      setQuestionNo(1)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  const handleQ2 = () => {
    if (questionNo != 2) {
      setQuestionNo(0)
      setQuestionNo(2)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  const handleQ3 = () => {
    if (questionNo != 3) {
      setQuestionNo(0)
      setQuestionNo(3)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  const handleQ4 = () => {
    if (questionNo != 4) {
      setQuestionNo(0)
      setQuestionNo(4)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  const handleQ5 = () => {
    if (questionNo != 5) {
      setQuestionNo(0)
      setQuestionNo(5)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  const handleQ6 = () => {
    if (questionNo != 6) {
      setQuestionNo(0)
      setQuestionNo(6)
    }
    else {
      setQuestionNo(!questionNo)
    }
  }

  return (
    <>
      <Header />
      {/* Main TOP */}
      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/Common/Store_map.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY ELECTRIC</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-4/6" >Find a store near you</p>
          <p className='animate-slideUp w-2/6 relative'>For test rides, easy bike pick-up, and first-class service.<span className="text-xs top-2  absolute">&#9642;</span> </p>
        </div>
        <a href="#stores" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none flex items-center">
          <span>Learn more</span> <IoIosArrowRoundDown className='text-xl' />
        </a>
      </section>

      {/* Services at stores */}
      <section className='select-none mx-12' >
        <h1 className='text-7xl w-5/6 my-20' >Get the service you need at our partner stores</h1>
        <div className='flex gap-14 font-montserrat-regular text-xl' >
          <div className='border py-14 px-8'>
            <p>Take one of our electric bikes for a spin and feel the difference. Our partner stores offer free test rides for both the Ivy and Ace Two, so you can see what&rsquo;s right for you.</p>
            <p className='pt-6 flex items-center gap-5'><SlSpeedometer /><span>FREE TEST RIDES</span></p>
          </div>
          <div className='border py-14 px-8'>
            <p>Don’t have time to get the toolkit out? Choose partner store delivery and they’ll assemble your electric bike for €99, so it’s ready to ride right away. First service is free.</p>
            <p className='pt-6 flex items-center gap-5'><TbLocationCheck /><span>CLICK AND COLLECT</span></p>
          </div>
          <div className='border py-14 px-8'>
            <p>The skilled technicians at our partner stores have the training and tools to take care of your VeloCity and get you back on the road, without the hassle.</p>
            <p className='pt-6 flex items-center gap-5'><GiAutoRepair /> <span>REPAIR AND SERVICES</span></p>
          </div>
        </div>
      </section>

      {/* Store internal */}
      <section className='mx-14 font-montserrat-regular' >
        <h1 id='stores' className='text-8xl py-20 font-montserrat-medium text-center' >Our Stores</h1>
        <div className='flex flex-wrap gap-10 justify-center'>

        <div >
            <img className='h-80 w-[440px] object-cover' src="/Common/Rozengracht Store.webp" alt="Van Woustraat Store" loading='lazy' />
            <div className='flex items-start gap-3 w-[440px] pt-3' >
              <CiLocationOn className='text-3xl text-red-500 ' />
              <p>Rozengracht 101/103, 1016 LV Amsterdam, Netherlands</p>
            </div>
          </div>

          <div >
            <img className='h-80 object-cover w-[440px]' src="/Common/Van Woustraat Store.jpg" alt="Van Woustraat Store" loading='lazy' />
            <div className='flex items-start gap-3 w-[440px] pt-3' >
              <CiLocationOn className='text-3xl text-red-500 ' />
              <p>Van Woustraat 72h, 1073 LN, Amsterdam, Netherlands</p>
            </div>
          </div>

        <div >
            <img className='h-80 w-[440px] object-cover' src="/Common/Europalaan Store.webp" alt="Van Woustraat Store" loading='lazy' />
            <div className='flex items-start gap-3 pt-3' >
              <CiLocationOn className='text-3xl text-red-500 ' />
              <p>Europalaan 931, 1363 BM Almere, Netherlands</p>
            </div>
          </div>

        </div>
      </section>

      {/* How it works */}
      <section className='mx-auto w-4/6 my-16 '>
        <h1 className='text-8xl py-14 font-montserrat-medium text-center' >How it works</h1>
        <hr />
        {/* Q1 */}
        <div className='py-10'>
          <button onClick={handleQ1} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>How can I schedule a test ride?</p>
            <p>{questionNo === 1 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 1 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>To test-ride at a partner location, please contact them directly. You can find locations and details in the map above. To test-ride at our Veloretti brand store, you can make an appointment on this page. City and Kids bike test rides are available at our brand store without appointment.</p>
          </div>
        </div>
        <hr />

        {/* Q2 */}
        <div className='py-10'>
          <button onClick={handleQ2} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>What types of bikes are available for test rides?</p>
            <p>{questionNo === 2 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 2 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] '>Our Ivy and Ace Two electric bikes are available to test ride at our partner stores. City and Kids bike test rides are only available at our Veloretti brand store.</p>
          </div>
        </div>
        <hr />

        {/* Q3 */}
        <div className='py-10'>
          <button onClick={handleQ3} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>Is there a fee for test rides, and how can I prepare?</p>
            <p>{questionNo === 3 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 3 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>Our test rides are free and usually take around 15-30 minutes. Please bring ID. </p>
          </div>
        </div>
        <hr />

        {/* Q4 */}
        <div className='py-10'>
          <button onClick={handleQ4} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>How can I get my Electric bike assembled?</p>
            <p>{questionNo === 4 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 4 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>When you purchase your Ivy or Ace Two, you can select your preferred location at checkout to have your bike and any accessories delivered to a partner store for assembly. This service costs an additional €99 paid upon pickup, and includes a first free bike service within 3 months. Good to know – the usual online delivery times will still apply. Delivery times change depending on the bike model and colour.</p>
          </div>
        </div>
        <hr />

        {/* Q5 */}
        <div className='py-10'>
          <button onClick={handleQ5} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>How long does it take to have a bike assembled in-store?</p>
            <p>{questionNo === 5 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 5 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>Once you’ve ordered, the bike will be delivered from our warehouse to the partner store according to the latest delivery times (these depend on the bike and colour). Once it arrives, our store partners will work hard to assemble your bikes as soon as possible within 5 working days. Bikes are not delivered to store partners faster than to home addresses.</p>
          </div>
        </div>
        <hr />

        {/* Q6 */}
        <div className='py-10'>
          <button onClick={handleQ6} className='flex justify-between w-full text-2xl'>
            <p className='font-montserrat-regular'>Can I get my City bike assembled at a partner store?</p>
            <p>{questionNo === 6 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 6 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>No, our click-and-collect service is only available for Electric Two bikes at an additional €99 fee for the store partner. If you would like help assembling your City bike our assembly videos can help with the final steps to get you on the road.</p>
          </div>
        </div>
        <hr />
      </section>
    </>
  )
}

export default Store
