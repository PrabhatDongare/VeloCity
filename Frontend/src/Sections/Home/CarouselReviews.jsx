import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { IoIosStar } from "react-icons/io";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 3.3,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const reviewCarousel = () => {
  return (
    <>
      <Carousel
        responsive={responsive}
        className="select-none font-montserrat cursor-grab"
        infinite
        arrows={false} >

        <div className=" text-zinc-400 text-sm flex flex-col gap-3 border-r mx-5 ">
          <div className='flex gap-[2px] text-white text-2xl'>
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
          </div>
          <p className="text-black text-3xl ">Great quality and design and punctual...</p>
          <p className="">Great quality and design and punctual shipping</p>
          <p>ALBERTO - TODAY</p>
        </div>

        <div className=" text-zinc-400 text-sm flex flex-col gap-3 border-r mx-5 ">
          <div className='flex gap-[2px] text-white text-2xl'>
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
          </div>
          <p className="text-black text-3xl ">I enjoy my bike couple of years...</p>
          <p className="">I enjoy my bike couple of years already! Very stylish with a good quality!</p>
          <p>EKATERINA LEVI - TODAY</p>
        </div>

        <div className=" text-zinc-400 text-sm flex flex-col gap-3 border-r mx-5 ">
          <div className='flex gap-[2px] text-white text-2xl'>
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-500 " />
            <IoIosStar className="bg-green-400 " />
          </div>
          <p className="text-black text-3xl ">Superb quality</p>
          <p className="">Superb quality and aesthetically pleasing bicycle, tricycle and helmets. My grandchildren are very very happy with their presents. Delivered within...</p>
          <p>SARAH LLOYD - 1 DAY AGO</p>
        </div>

        <div className=" text-zinc-400 text-sm flex flex-col gap-3 border-r mx-5 ">
          <div className='flex gap-[2px] text-white text-2xl'>
            <IoIosStar className="bg-green-400 " />
            <IoIosStar className="bg-green-400 " />
            <IoIosStar className="bg-green-400 " />
            <IoIosStar className="bg-yellow-300 " />
            <IoIosStar className="bg-yellow-300 " />
          </div>
          <p className="text-black text-3xl ">The Instructions re very minimal</p>
          <p className="">Design is great, the weight as well, it cycles great. The instruction manual is very minimal can be improved.</p>
          <p>CORNEL VAN ECK - 4 DAYS AGO</p>
        </div>

        <div className=" text-zinc-400 text-sm flex flex-col gap-3 border-r mx-5 ">
          <div className='flex gap-[2px] text-white text-2xl'>
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
            <IoIosStar className="bg-green-600 " />
          </div>
          <p className="text-black text-3xl ">Love the customer care support!</p>
          <p className="">Love the customer care support!</p>
          <p>MILO COLLARIS - 6 DAY AGO</p>
        </div>

      </Carousel>
    </>
  )
}

export default reviewCarousel
