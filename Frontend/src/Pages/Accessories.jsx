// import React from 'react'

import { IoIosArrowRoundDown } from "react-icons/io";

import Header from '../Components/Header';
import AccessoriesCard from '../Components/AccessoriesCard';


const Accessories = () => {

  const cardData1 = [
    { id: 1, url: "/images/Accessories/Set 1/Frame_50.webp", title: "Front Carrier Black", price: 59.95 },
    { id: 2, url: "/images/Accessories/Set 1/Frame_179.webp", title: "Front Carrier Black", price: 62.45 },
    { id: 3, url: "/images/Accessories/Set 1/Basket_Epic_Multi_desktop.webp", title: "Front Carrier Black", price: 52.95 },
    { id: 4, url: "/images/Accessories/Set 1/Basket_Epic_Retro_desktop.webp", title: "Front Carrier Black", price: 49.95 },
    { id: 5, url: "/images/Accessories/Set 1/Frame_76.webp", title: "Front Carrier Black", price: 19.95 },
    { id: 6, url: "/images/Accessories/Set 1/PDP_-_DESKTOP-1.webp", title: "Front Carrier Black", price: 39.95 },
    { id: 7, url: "/images/Accessories/Set 1/Frame_59.webp", title: "Front Carrier Black", price: 39.50 },
    { id: 8, url: "/images/Accessories/Set 1/Front_carrier_matte_black_desktop.webp", title: "Front Carrier Black", price: 59.95 },
  ]
  
  const cardData2 = [
    { id: 1, url: "/images/Accessories/Set 2/Frame_61.webp", title: "Front Carrier Black", price: 13.95 },
    { id: 2, url: "/images/Accessories/Set 2/Frame_62.webp", title: "Front Carrier Black", price: 13.95 },
    { id: 3, url: "/images/Accessories/Set 2/Frame_63.webp", title: "Front Carrier Black", price: 13.35 },
    { id: 4, url: "/images/Accessories/Set 2/Frame_64.webp", title: "Front Carrier Black", price: 34 },
    { id: 5, url: "/images/Accessories/Set 2/Frame_69.webp", title: "Front Carrier Black", price: 11.95 },
    { id: 6, url: "/images/Accessories/Set 2/Frame_70.webp", title: "Front Carrier Black", price: 27 },
    { id: 7, url: "/images/Accessories/Set 2/Frame_73.webp", title: "Front Carrier Black", price: 49.95 },
    { id: 8, url: "/images/Accessories/Set 2/AXA_Framelock_140CM_Chain_desktop.webp", title: "Front Carrier Black", price: 55.25 },
    { id: 9, url: "/images/Accessories/Set 2/Frame_41.webp", title: "Front Carrier Black", price: 91.50 },
    { id: 10, url: "/images/Accessories/Set 2/Frame_163.webp", title: "Front Carrier Black", price: 93.5 },
  ]

  return (
    <>
      <Header />

      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Accessories/Accessories_desktop.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-2/6" >Accessories</p>
          <p className='animate-slideUp w-2/6 relative'>Forever Forward<span className="text-xs top-2  absolute">&#9642;</span> </p>
        </div>
        <a href="#items" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none flex items-center">
          <span>Learn more</span> <IoIosArrowRoundDown className='text-xl' />
        </a>
      </section>

      <section id='items' className='m-24' >
        <h1 className='text-center text-5xl font-montserrat-medium mb-16' >Carriers, baskets, Saddles and Grips </h1>
        <div className='grid grid-cols-4 gap-5 ' >
          <img className='object-cover h-full row-span-2 col-span-2' src="/images/Accessories/Accessories_overview_desktop_1.webp" alt="Item Image" loading='lazy' />
          {cardData1.map(item => {
            return (
              <div key={item.id} >
                <AccessoriesCard image={item.url} title={item.title} price={item.price} />
              </div>
            )
          })}
        </div>
      </section>
      
      <section id='items' className='m-24' >
        <h1 className='text-center text-7xl font-montserrat-medium mb-16' >Bells and extras</h1>
        <div className='grid grid-cols-4 gap-5 ' >
          {cardData2.map(item => {
            return (
              <div key={item.id} >
                <AccessoriesCard image={item.url} title={item.title} price={item.price} />
              </div>
            )
          })}
        </div>
      </section>


    </>
  )
}

export default Accessories
