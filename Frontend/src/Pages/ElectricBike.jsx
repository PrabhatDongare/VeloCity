import React, { Suspense } from 'react'
import { Link } from 'react-router-dom';

import Header from '../Components/Header';
const DisplayProduct = React.lazy(() => import('../Components/DisplayProduct'));
const CustomVideo = React.lazy(() => import('../Components/CustomVideo'));

const Accessories = () => {
  return (
    <>
      {/* Color: [#ebedee] */}
      <Header />
      {/* Main TOP */}
      <section className='h-[93vh] text-white font-montserrat-medium'>
        <video className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]"
          autoPlay loop muted >
          <source src="https://download-video.akamaized.net/v3-1/playback/05a6ff4f-74e7-4a83-8703-bc02346881bf/3fb4ac23-c9f4a737?__token__=st=1714939114~exp=1714953514~acl=%2Fv3-1%2Fplayback%2F05a6ff4f-74e7-4a83-8703-bc02346881bf%2F3fb4ac23-c9f4a737%2A~hmac=012b5a4631a489d98845988c3603d21bd03016c67cbdcc842dc679e3353179fa&r=dXMtd2VzdDE%3D" />
        </video>

        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY ELECTRIC</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-2/6" >This is Two <span className="text-4xl bottom-1 absolute">&#9642;</span> </p>
          <p className='animate-slideUp w-2/6'>Introducing the all-new Ivy and Ace</p>
        </div>
        <button className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none">Buy Your Electric</button>
      </section>

      {/* 2 Display Products */}
      <Suspense fallback={<div className='text-center'>Loading...</div>}>
        <DisplayProduct />
      </Suspense>

      {/* 7 Multiple Sections */}
      {/* SECTION 1: Product Safety Video */}
      <section className='relative text-white '>
        {/* <video className='h-[100vh] w-[100vw] object-fill absolute -z-50 bg-[#a8abac]'
          muted autoPlay loading="lazy"  >
          <source src="https://download-video.akamaized.net/v3-1/playback/2eedaa5a-0304-459b-91ee-44226882912b/456ba3e7-db73988f?__token__=st=1714939532~exp=1714953932~acl=%2Fv3-1%2Fplayback%2F2eedaa5a-0304-459b-91ee-44226882912b%2F456ba3e7-db73988f%2A~hmac=f341c6aeaca79871154f384f1a6786508f3cbec217d61caeb2deca7208ce8553&r=dXMtZWFzdDE%3D" />
        </video> */}
        <Suspense fallback={<div className='text-center'>Loading...</div>}>
          <div className='absolute'>
            <CustomVideo videoDimension={"h-[100vh] w-[98.9vw] bg-[#a8abac]"} videoButton={"flex items-end pb-10 justify-center text-9xl h-[100vh] w-[98.9vw] "}
              videoSrc={"https://download-video.akamaized.net/v3-1/playback/2eedaa5a-0304-459b-91ee-44226882912b/456ba3e7-db73988f?__token__=st=1714939532~exp=1714953932~acl=%2Fv3-1%2Fplayback%2F2eedaa5a-0304-459b-91ee-44226882912b%2F456ba3e7-db73988f%2A~hmac=f341c6aeaca79871154f384f1a6786508f3cbec217d61caeb2deca7208ce8553&r=dXMtZWFzdDE%3D"} />
          </div>
        </Suspense>

        <div className='select-none flex flex-col justify-center items-center h-[100vh] gap-7 '>
          <h1 className='text-9xl'>Safety first</h1>
          <p>We designed our Ivy and Ace Two with safe city riding in mind.</p>
          <p>The automatic rare break light shines instantly and brightly, so others on the road know if you&rsquo;re slowing down or stopping.</p>
        </div>
      </section>

      {/* SECTION 2: Ace Two */}
      <section className='mx-14 my-28 flex gap-20 '>
        <div className='w-1/2 px-28 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Ace Two</h1>
          <p className='py-7 '>Introducing the Ace Two, the electric bike redefining your daily commute by offering cutting-edge technology, design, and safety features. Relish instant power, convenience, and peace of mind on every commute with automatic gear shifting, a silent mid-motor, bright LED brake lights, and safety tracking.</p>
          <Link to="/" className='underline font-montserrat-medium ' >Learn More</Link>
        </div>
        <img src="/images/Electric Bike/Electric_overview_desktop_mobile_1.webp" alt="Ace Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
      </section>

      {/* SECTION 3: Ivy Two */}
      <section className='mx-14 my-28 py-16 flex gap-20 '>
        <img src="/images/Electric Bike/Electric_overview_desktop_mobile_2.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
        <div className='w-1/2 pl-28 pr-10 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Ivy Two</h1>
          <p className='py-7'>Introducing the Ivy Two, the electric bike that takes your daily commute to the next level. With an accessible lower frame, the latest technology, and safety features, the Ivy delivers instant power, convenience, and peace of mind at every turn, making it the go-to bike for any commute. Equipped with a bright LED brake light for enhanced visibility and safety tracking for added security, the Ivy Two is the perfect combination of design, technology, and safety.</p>
          <Link to="/" className='underline font-montserrat-medium ' >Learn More</Link>
        </div>
      </section>

      {/* SECTION 4: Test Ride */}
      <section className='ml-24 w-5/6 my-10'>
        <h1 className='text-7xl' >Test ride our Electric Ivy or Ace</h1>
        <p className='py-8 text-[#989999]' >Discovering your ideal bike just got easier. Schedule a test ride at one of our testing locations and experience our Ivy and Ace Two up close and personal.</p>
        <button className='px-7 py-3 border-[0.5px] rounded-full'>Book now</button>
      </section>
      <img src="/images/Electric Bike/Electric_overview_desktop_4.webp" alt="Test Ride" loading='lazy' className='h-[65vh] w-full object-cover' />

      {/* SECTION 5: Ride Carefree */}
      <section className='mx-14 my-28 flex gap-20 '>
        <div className='w-1/2 px-24 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Ride carefree</h1>
          <p className='py-7 '>Our Qover x VeloCity insurance plan has got you covered. It offers comprehensive coverage against theft, provides assistance in case of any issues, and covers any damages to your bike.</p>
          <Link to="/" className='underline font-montserrat-medium ' >Learn More</Link>
        </div>
        <img src="/Common/Homepage_desktop_mobile_2.webp" alt="Ace Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
      </section>

      {/* SECTION 6: Leasing */}
      <section className='mx-14 mb-24 flex gap-20 '>
        <img src="/images/Electric Bike/Homepage_desktop_mobile_1.webp" alt="Ivy Two" className='w-[43vw] h-[99vh] object-cover' loading='lazy' />
        <div className='w-1/2 pl-28 pr-16 my-auto'>
          <h1 className='font-montserrat-medium text-5xl font-medium'>Leasing</h1>
          <p className='py-7'>Does your Dutch employer offer a bike scheme? Then you might be able to lease a VeloCity Ivy or Ace Two and benefit from the great tax incentives. Embrace a new era of commuting from €75 a month.</p>
          <Link to="/" className='underline font-montserrat-medium ' >Learn More</Link>
        </div>
      </section>

      {/* SECTION 7: Mobile App */}
      <section className='bg-[#ebedee] h-[125vh] relative py-32'>
        <img src="/images/Electric Bike/App_page-iPhone-Desktop-1_copy.webp" alt="App Page" width={460} className='absolute right-14 bottom-24' loading='lazy' />
        <div className='mx-40 my-28 relative'>
          <h1 className='text-7xl w-[500px] font-montserrat-medium'>Everything in one app <span className="text-4xl ml-1 top-[105px] absolute">&#9642;</span> </h1>
          <p className='w-[420px] py-7' >We believe in technology elevating your life, particularly in managing your bike. Our constantly evolving app connects and empowers you to control your bike effortlessly.From monitoring ride performance to managing battery life, our app&rsquo;s intuitive interface makes customizing ride settings and preferences easy.</p>
          <Link to="/" className='underline font-montserrat-medium ' >Learn More</Link>
        </div>
      </section>
    </>
  )
}

export default Accessories
