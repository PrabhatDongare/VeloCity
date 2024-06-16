import { useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const ButtonGroup = ({ previous, goToSlide, ...rest }) => {
  const { carouselState: { currentSlide } } = rest;
  return (
    <div className="absolute flex gap-4 z-50 p-2 right-0">
      <button
        className={` text-5xl absolute top-[-330px] left-[-130px] ${currentSlide === 0 ? 'text-[#bbbcbc]' : ''}`}
        onClick={() => previous()} 
        disabled={currentSlide === 0}>
        <IoIosArrowBack />
      </button>

      <button
        onClick={() => goToSlide(currentSlide + 1)}
        className={`text-5xl absolute top-[-330px] left-[-90px] ${currentSlide === 1 ? 'text-[#bbbcbc]' : ''}`} 
        disabled={currentSlide === 1}>
        <IoIosArrowForward />
      </button>
    </div>
  );
};

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 2.4,
    slidesToSlide: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 800 },
    items: 2,
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

const CarouselCategory = () => {
  const [chooseGender, setChooseGender] = useState("M")

  const setWomen = () => {
    setChooseGender("W")
  }
  const setMen = () => {
    setChooseGender("M")
  }

  return (
    <>

      <div className='pl-10'>
        <Carousel
          responsive={responsive}
          customButtonGroup={<ButtonGroup />}
          className="select-none pt-24"
          arrows={false} >

          {/* Card 1 */}
          <div className="bg-[#ebedee] rounded-xl mx-5 px-8 py-10 font-montserrat ">
            <p className="flex justify-between mb-5">
              <span className="text-3xl">City Bikes</span>
              <span className="font-medium">From &euro;399</span>
            </p>
            {chooseGender === "M" ?
              <div className='text-sm'>
                <button onClick={setMen} className='underline underline-offset-2'>MEN</button>
                <button onClick={setWomen} className='pl-7 text-zinc-400'>WOMEN</button>
                <img src="/images/Home/City_bikes_Men.webp" alt="City Bikes" width={510} className="pt-4 pb-7 mx-auto" loading='lazy' />
              </div>
              :
              <div className='text-sm'>
                <button onClick={setMen} className='text-zinc-400 '>MEN</button>
                <button onClick={setWomen} className='pl-7 underline-offset-2 underline'>WOMEN</button>
                <img src="/images/Home/City_bikes_Women.webp" alt="City Bikes" width={510} className="pt-4 pb-7 mx-auto" loading='lazy' />
              </div>
            }
            <Link to="/city-bike" className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</Link>
            <Link to="/city-bike" className="text-xs underline pl-10 underline-offset-2">Learn More</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-[#ebedee] rounded-xl mx-5 px-8 py-10 font-montserrat ">
            <p className="flex justify-between mb-5">
              <span className="text-3xl">Kids&rsquo; Bikes</span>
              <span className="font-medium">From &euro;199</span>
            </p>
            <span>Ages 1,5 & 8</span>
            <img src="/images/Home/Homepage_Kids_desktop.webp" alt="Kids Bike" width={510} className="pt-4 pb-7 mx-auto" loading='lazy' />
            <Link to="/city-bike" className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</Link>
            <Link to="/city-bike" className="text-xs underline pl-10 underline-offset-2">Learn More</Link>
          </div>
          
          {/* Card 3 */}
          <div className="bg-[#ebedee] rounded-xl mx-5 px-8 py-10 font-montserrat ">
            <p className="text-3xl mb-5">Accessories</p>
            <span>Discover our assortment</span>
            <img src="/images/Home/Accessories.webp" alt="Accessories" width={510} className="pt-4 pb-7 mx-auto" loading='lazy' />
            <Link to="/city-bike" className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</Link>
          </div>
          
        </Carousel>
      </div>
    </>
  );
};

export default CarouselCategory;

