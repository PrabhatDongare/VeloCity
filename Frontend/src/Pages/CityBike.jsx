import React, { Suspense } from 'react'

import Header from "../Components/Header"
const ProductsCarousel = React.lazy(() => import('../Sections/City Bike/CarouselProducts'));
const CustomVideo = React.lazy(() => import('../Components/CustomVideo'));
import LoadingAnimation from '../Components/LoadingAnimation';

const CityBike = () => {

  return (
    <>
      <Header />
      {/* Main TOP */}
      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/City Bike/City_homepage_desktop.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-2/6" >City bikes </p>
          <p className='animate-slideUp w-2/6 relative'>Forever Forward<span className="text-xs top-2  absolute">&#9642;</span> </p>
        </div>
        <a href="#cityBikeCarousel" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none">
          Shop our city bikes
        </a>
      </section>

      {/* Content Section 1 */}
      <section className="mt-28 mb-[65vh] mx-24 relative font-montserrat-regular">
        <h1 className="relative text-9xl text-center mb-36">Forever Forward<span className="text-5xl bottom-0.5 absolute">&#9642;</span></h1>
        <div className="flex justify-between">
          <img className="w-80 h-96 bg-[#a8abac]" src="/images/City Bike/City_collection_1_desktop.webp" alt="Logo on Product" loading="lazy" />
          <img className="mt-6 w-[670px] bg-[#a8abac]" src="/images/City Bike/City_collection_2_desktop.webp" alt="Logo on Product" loading="lazy" />
        </div>
        <div className="absolute border rounded-lg text-3xl bg-white w-[550px] p-16 z-50 top-[140vh] left-80 font-montserrat-light text-[#908e8e]" >Our women&rsquo;s bicycles are for everyone who likes to combine style with performance. In this range, available are the Café Racer and the Robyn, both frames with a lower tube, making it easy to step through.</div>
      </section>

      {/* City Bike Carousel */}
      <section id="cityBikeCarousel" className="h-[111vh] bg-[#a8abac] pt-20 pl-24">
        <Suspense fallback={<LoadingAnimation/>}>
          <ProductsCarousel />
        </Suspense>
      </section>

      {/* Text & Images */}
      <section className="my-14 mx-24 relative h-[220vh] flex flex-col gap-28" >
        <div className="flex justify-between mb-96">
          <img className="w-[650px] h-full bg-[#a8abac]" src="/images/City Bike/City_collection_4_desktop.webp" alt="City collection" loading="lazy" />
          <img className="w-80 h-96 object-cover bg-[#a8abac]" src="/images/City Bike/City_collection_3_desktop.webp" alt="City collection" loading="lazy" />
          <div className="absolute font-montserrat-light top-80 right-32 border rounded-lg text-3xl bg-white w-[470px] p-14 z-50 text-[#908e8e]" >Whether you like it easy or fast, we got both. Our men&rsquo;s range of bicycles combine modern clean design with great quality, so they&rsquo;re perfect for your daily city commute. Our men citybikes are the Caféracer, Caféchaser and the Berlin, but feel free to opt for a women&rsquo;s bike for that easy hop-on-hop-off Amsterdam style.</div>

          {/* <video className='w-[450px] absolute z-10 bottom-80 left-96 '
            muted autoPlay loading="lazy"  >
            <source src="https://download-video.akamaized.net/v3-1/playback/dc57906d-5d95-4009-9f48-714937988f0a/0bfcb30e-35e16af9?__token__=st=1714940205~exp=1714954605~acl=%2Fv3-1%2Fplayback%2Fdc57906d-5d95-4009-9f48-714937988f0a%2F0bfcb30e-35e16af9%2A~hmac=2d335daf4e68bd0458b694bb011b2021eb675e39bcc4993bc7828bbb81bd4c05&r=dXMtZWFzdDE%3D" />
          </video> */}
          <Suspense fallback={<LoadingAnimation/>}>
            <div className='w-[450px] absolute z-10 top-[650px] left-96 '>
              <CustomVideo videoDimension={"object-cover"} videoButton={"absolute text-9xl top-[270px] left-[160px]"}
                videoSrc={"https://download-video.akamaized.net/v3-1/playback/dc57906d-5d95-4009-9f48-714937988f0a/0bfcb30e-35e16af9?__token__=st=1714940205~exp=1714954605~acl=%2Fv3-1%2Fplayback%2Fdc57906d-5d95-4009-9f48-714937988f0a%2F0bfcb30e-35e16af9%2A~hmac=2d335daf4e68bd0458b694bb011b2021eb675e39bcc4993bc7828bbb81bd4c05&r=dXMtZWFzdDE%3D"} />
            </div>
          </Suspense>

        </div>

        <div className="font-montserrat-medium text-9xl text-center relative">
          <h1>City bikes for</h1>
          <h1>everyone<span className="text-5xl bottom-0.5 absolute">&#9642;</span></h1>
        </div>
      </section>

    </>
  )
}

export default CityBike
