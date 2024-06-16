// import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 1024 },
        items: 2.3,
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

const ProductsCarousel = () => {
    return (
        <Carousel responsive={responsive} arrows={true}>
            <Link to='/city-bike' >
                <img className='h-[85%] w-[91%]' src="/Common/Kids-slider-Caferacer.webp" alt="Kids Slider Caferacer" loading='lazy' />
                <p className='flex justify-between text-2xl pt-2 pb-16 w-[91%]'><span className='text-white'>Caféracer</span><span className='text-[#ebedee]'>Women</span></p>
            </Link>
            
            <Link to='/city-bike' >
                <img className='h-[85%] w-[91%]' src="/Common/Kids-slider-Robyn.webp" alt="Kids Slider Robyn" loading='lazy' />
                <p className='flex justify-between text-2xl pt-2 pb-16 w-[91%]'><span className='text-white'>Robyn</span><span className='text-[#ebedee]'>Women</span></p>
            </Link>
            
            <Link to='/city-bike' >
                <img className='h-[85%] w-[91%]' src="/Common/Kids-slider-Caferacer-M.webp" alt="Kids Slider Caferacer M" loading='lazy' />
                <p className='flex justify-between text-2xl pt-2 pb-16 w-[91%]'><span className='text-white'>Caféracer</span><span className='text-[#ebedee]'>Men</span></p>
            </Link>
                        
            <Link to='/city-bike' >
                <img className='h-[85%] w-[91%]' src="/Common/Kids-slider-Cafechaser.webp" alt="Kids Slider Cafechaser" loading='lazy' />
                <p className='flex justify-between text-2xl pt-2 pb-16 w-[91%]'><span className='text-white'>Caférchaer</span><span className='text-[#ebedee]'>Men</span></p>
            </Link>
            
            <Link to='/city-bike' >
                <img className='h-[85%] w-[91%]' src="/Common/Kids-slider-Berlin.webp" alt="Kids Slider Berlin" loading='lazy' />
                <p className='flex justify-between text-2xl pt-2 pb-16 w-[91%]'><span className='text-white'>Berlin</span><span className='text-[#ebedee]'>Neutral</span></p>
            </Link>
        </Carousel>
    );
};

export default ProductsCarousel;
