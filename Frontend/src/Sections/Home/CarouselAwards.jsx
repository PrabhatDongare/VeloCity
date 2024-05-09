import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
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

const awardCarousel = () => {
  return (
    <div>
      <Carousel
        responsive={responsive}
        className="select-none pt-48 pl-32"
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        customTransition="all .5"
        arrows={false} >

        <div className='w-2/6'>
          <div className="flex items-center gap-4 font-montserrat ">
            <IoIosArrowBack className="text-4xl text-[#4A4742]" />
            <p className="w-24 h-1.5 bg-[#D9D6D0] rounded-lg"></p>
            <p className="w-24 h-1.5 bg-[#4A4742] rounded-lg"></p>
            <IoIosArrowForward className="text-4xl text-[#D9D6D0]" />
          </div>
          <p className='text-5xl my-7'>iF Design Award</p>
          <p className='w-80 font-light' >On the winning track. VeloCity Ivy and Ace Two were the solo Dutch urban bike brand awarded a 2024 iF DESIGN AWARD in the Bicycle Category</p>
          <img src="/images/Home/if award.webp" alt="iF Design Award" width={180} className='my-14' loading='lazy' />
        </div>

        <div className='w-2/6'>
          <div className="flex items-center gap-4 ">
            <IoIosArrowBack className="text-4xl text-[#D9D6D0]" />
            <p className="w-24 h-1.5 bg-[#4A4742] rounded-lg"></p>
            <p className="w-24 h-1.5 bg-[#D9D6D0] rounded-lg"></p>
            <IoIosArrowForward className="text-4xl text-[#4A4742]" />
          </div>
          <p className='text-5xl my-7' >Red Dot Award</p>
          <p className='w-72 font-light' >Good Design is what drives us, and we&rsquo;re proud to share that VeloCity Electric two won the prestigious Red Dot Design Award 2023 as juged by the world&rsquo;s best product designer</p>
          <img src="/images/Home/Ret dot award.webp" alt="Red Dot Award" width={80} className='my-10' loading='lazy' />
        </div>
      </Carousel>
    </div>
  )
}

export default awardCarousel
