import { useState } from 'react'
import { Link } from 'react-router-dom';

import { IoIosArrowRoundDown } from "react-icons/io";

import Header from '../../Components/Header';


const Employers = () => {
  const [questionNo, setQuestionNo] = useState(0);

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

  return (
    <>
      < Header />
      {/* Main TOP */}
      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Employers/Bike_leasing_desktop.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY BUSINESS</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-4/6" >Bike plans for your team</p>
        </div>
        <a href="#leasing" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none flex items-center">
          <span>Learn more</span> <IoIosArrowRoundDown className='text-xl' />
        </a>
      </section>

      {/* Content 1 */}
      <section id='leasing' className='mx-14 mt-24 mb-36 flex gap-20 '>
        <img src="/images/Employers/Leasing_desktop_mobile.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
        <div className='w-1/2 pl-28 pr-10 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Lease bikes</h1>
          <p className='py-7'>Want to offer your employees the great perk of stylish and sustainable mobility? In the Netherlands, this is super easy with a bike plan. It’s cost-free for employers and outside of the work-related costs scheme (WKR).</p>
          <Link to="/" className='underline font-montserrat-medium ' >Discover More</Link>
        </div>
      </section>

      {/* Content 2 */}
      <section className='mx-14 my-28 flex gap-20 '>
        <div className='w-1/2 pl-28 pr-10 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Lease bikes</h1>
          <p className='py-7'>Want to offer your employees the great perk of stylish and sustainable mobility? In the Netherlands, this is super easy with a bike plan. It’s cost-free for employers and outside of the work-related costs scheme (WKR).</p>
          <Link to="/" className='underline font-montserrat-medium ' >Discover More</Link>
        </div>
        <img src="/Common/Homepage_desktop_mobile_2.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
      </section>

      {/* Content 3 */}
      <section className='mx-14 mt-24 mb-36 flex gap-20 '>
        <img src="/images/Employers/Leasing_desktop_mobile.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
        <div className='w-1/2 pl-28 pr-10 my-auto font-montserrat-regular text-[#a1a2a1]'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>How it works</h1>

          <p className='pt-8 text-xl'><span className='text-black bg-[#d0d1d0] rounded-full px-2.5 py-1 mr-2'>1.</span>Register your company</p>
          <p className='text-sm ml-10'>Fill in our registration form with your company details. After your registration, our leasing partner will do a credit check. You will hear whether your application has been approved within 24 hours.</p>

          <p className='pt-5 text-xl'><span className='text-black bg-[#d0d1d0] rounded-full px-2.5 py-1.5 mr-2'>2.</span>Determine the requirements</p>
          <p className='text-sm ml-10'>You get access to the digital platform. Set the requirements for your employees and share the registration link</p>

          <p className='pt-5 text-xl'><span className='text-black bg-[#d0d1d0] rounded-full px-2.5 py-1.5 mr-2'>3.</span>Ride your bike</p>
          <p className='text-sm ml-10'>Let&rsquo;s go! Your employees can choose their bikes and they&rsquo;ll be delivered stright to their homes</p>

          <p className='pt-5 text-xl'><span className='text-black bg-[#d0d1d0] rounded-full px-2.5 py-1.5 mr-2'>4.</span>Administration</p>
          <p className='text-sm ml-10'>Everything in one place. The digital platform gives you an easy overflow of all the information for your payroll</p>
        </div>
      </section>

      {/* Form */}
      <section className='mb-14' >
        <h1 className='text-5xl font-montserrat-medium text-center'>Get in touch</h1>

      </section>
      <hr />

      {/* Questions */}
      <section className='mx-auto w-4/6 my-16 '>
        <h1 className='text-9xl py-14 font-montserrat-medium text-center' >Any questions?</h1>
        <hr />
        {/* Q1 */}
        <div className='py-10'>
          <button onClick={handleQ1} className='flex justify-between w-full text-3xl'>
            <p className='font-montserrat-regular'>What about the paperwork?</p>
            <p>{questionNo === 1 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 1 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>The bicycle plan is set up so that there will be no administrative work on your part as the employer. You can use a free online platform that has been created by our leasing partner. This provides you with a simple overview of your business and your employees, allowing you to arrange everything. It also simplifies all the paperwork. Everything is organised with just a few clicks.</p>
          </div>
        </div>
        <hr />

        {/* Q2 */}
        <div className='py-10'>
          <button onClick={handleQ2} className='flex justify-between w-full text-3xl'>
            <p className='font-montserrat-regular'>How does it work with an employee who retires early?</p>
            <p>{questionNo === 2 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 2 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] '>When an employee leaves the company with an active lease contract, the agreements contained in the addendum come into effect. The addendum is the document the employee signs before choosing a VeloCity bike.</p>
            <p className='text-[#727373] '>The employee has three options:</p>
            <p className='text-[#727373] '>- The employee pays off the remaining lease installments (without service and insurance costs).</p>
            <p className='text-[#727373] '>- A colleague within the company can take over the employee&rsquo;s existing lease contract.</p>
            <p className='text-[#727373] '>- The employee can take the existing lease contract to another company that is already affiliated with our leasing partner or is willing to join us.</p>
          </div>
        </div>
        <hr />

        {/* Q3 */}
        <div className='py-10'>
          <button onClick={handleQ3} className='flex justify-between w-full text-3xl'>
            <p className='font-montserrat-regular'>What does a VeloCity Bike Plan cost for an employer?</p>
            <p>{questionNo === 3 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 3 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>Joining as an employer with our leasing partner is completely free of charge. As an employer, you can design the bicycle plan yourself.</p>
            <p className='text-[#727373] '>There are three options:</p>
            <p className='text-[#727373] '>- Full lease costs: As an employer, you pay the full, monthly lease cost. The employee only pays the 7% addition each month. This can be done as a fringe benefit, as part of the mobility budget or from the budget of the lease car.</p>
            <p className='text-[#727373] '>- Contribution lease costs: As an employer, you pay a fixed monthly contribution to the lease costs. This contribution is at the discretion of the employer. Your employee pays the rest.</p>
            <p className='text-[#727373] '>- No cost: The company facilitates the leasing scheme. The employee pays the full lease costs by voluntarily exchanging the gross salary. The employer has no cost as a result.</p>
            <p className='text-[#727373] '>The bottom line is that your cycling employee may face two expenses:The monthly lease cost (incl. service and maintenance costs) 7% additional taxable benefit. These costs are always for the employee, as compensation for the private use of the bike. As an employer, you only have the possible cost to the contribution of the lease price.</p>
          </div>
        </div>
        <hr />

        {/* Q4 */}
        <div className='py-10'>
          <button onClick={handleQ4} className='flex justify-between w-full text-3xl'>
            <p className='font-montserrat-regular'>What are the legal requirements for the VeloCity bicycle plan?</p>
            <p>{questionNo === 4 ? "-" : "+"}</p>
          </button>
          <div className={`transition-opacity transition-height ease-in-out duration-500 overflow-hidden ${questionNo === 4 ? 'opacity-100' : 'opacity-0 h-0'}`}>
            <p className='text-[#727373] mt-4'>As an employer, since 01-01-2020 you can offer the government&rsquo;s new bicycle plan free of charge to your employees.</p>
            <p className='text-[#727373] '>Legally, there are three important changes:</p>
            <p className='text-[#727373] '>1. The new bicycle scheme falls outside the working costs scheme (WKR).</p>
            <p className='text-[#727373] '>2. The employee may exchange the Lease amount for his VeloCity with his gross salary. As a result, the employee benefits from a tax advantage.</p>
            <p className='text-[#727373] '>3. The employee always pays 7% additional taxable benefit for his lease bike. This allows the employee to use his VeloCity for private purposes without any restrictions.</p>
          </div>
        </div>
        <hr />
      </section>

    </>
  )
}

export default Employers
