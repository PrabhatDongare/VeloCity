import { useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";

import { Ace_Two, Ivy_Two } from "../../Utils/product";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
}


const IntroAce = ({ scrollId }) => {
    const [productIndex, setProductIndex] = useState(0);
    const [productColor, setProductColor] = useState("Matte Black");
    const [showProduct, setShowProduct] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleNextImage = () => {
        setProductIndex((prevIndex) => (prevIndex + 1) % Ace_Two[productColor].length);
    };
    const handlePrevImage = () => {
        setProductIndex((prevIndex) => (prevIndex - 1 + Ace_Two[productColor].length) % Ace_Two[productColor].length
        );
    };

    const handleShowProduct = () => {
        setShowProduct(!showProduct)
    }

    const handleChangeProduct = () => {
        navigate("/products/ivy");
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <div className='flex relative' >
                <main className='bg-[#f0f0f0] w-[60vw] h-[92vh] flex px-3 relative ' >
                    <button onClick={handlePrevImage} ><IoIosArrowBack className="hover:invert text-5xl " /></button>
                    <img src={Ace_Two[productColor][productIndex]} alt="Product Image" className=" w-[100%] h-[100%] object-cover transition-all ease-out duration-500 " loading='lazy' />
                    <button onClick={handleNextImage} ><IoIosArrowForward className="hover:invert text-5xl" /></button>
                    <div className='flex gap-1 absolute bottom-8 left-[440px]' >
                        <p className={`${productIndex == 0 ? "bg-white" : "bg-[#636f78]"} transition-all ease-out duration-500 rounded-full h-4 w-4`} ></p>
                        <p className={`${productIndex == 1 ? "bg-white" : "bg-[#636f78]"} transition-all ease-out duration-500 rounded-full h-4 w-4`} ></p>
                        <p className={`${productIndex == 2 ? "bg-white" : "bg-[#636f78]"} transition-all ease-out duration-500 rounded-full h-4 w-4`} ></p>
                    </div>

                    <div className=" absolute select-none w-48 h-40  bottom-0 left-14 " >
                        <Carousel
                            responsive={responsive}
                            infinite
                            autoPlay={true}
                            autoPlaySpeed={2000}
                            additionalTransitions="transform 0.5s ease-out"
                            arrows={false} >
                            <img src="/Common/Red Dot Award.webp" alt="Red Dot Award" loading='lazy' />
                            <img src="/Common/Bright.in Rating.webp" alt="Bright.in" loading='lazy' />
                            <img src="/Common/The Verge Rating.webp" alt="The Verge" loading='lazy' />
                            <img src="/Common/iF Design Award.webp" alt="iF Design Award" loading='lazy' />
                        </Carousel>
                    </div>
                </main>

                <aside className='mx-8 w-[36vw]'>
                    <div className='flex justify-between font-montserrat-regular mt-7 mb-10 relative'>
                        <button className=' flex items-center gap-14 transition-all duration-500 ease-in-out' onClick={handleShowProduct} >
                            <p className='text-3xl '>Electric Ace</p>
                            <div className='absolute top-0 left-44 text-xs pl-1'>Two</div>
                            {showProduct ? <SlArrowUp /> : <SlArrowDown />}
                        </button>
                        <p className='text-3xl' >€ 3.299</p>
                    </div>

                    {showProduct && <div className='mb-5 flex gap-8 font-montserrat-regular' >
                        <div >
                            <button className='bg-[#eceef0] object-cover rounded-xl h-20 w-28 mb-3 border-2 border-black' ><img className='rounded-xl mx-auto w-28 h-16 object-cover' src={Ace_Two["Matte Black"][0]} alt="" /></button>
                            <p className='relative' >
                                <span className='text-sm'>Electric Ace </span> <span className='text-xs absolute' >Two</span>
                            </p>
                        </div>
                        <div >
                            <button onClick={handleChangeProduct} className='bg-[#eceef0] object-cover rounded-xl h-20 w-28 mb-3 ' ><img className='rounded-xl mx-auto w-28 h-16 object-cover' src={Ivy_Two["Matte Black"][0]} alt="" /></button>
                            <p className='relative' >
                                <span className='text-sm'>Electric Ivy </span> <span className='text-xs absolute' >Two</span>
                            </p>
                        </div>
                    </div>}

                    <hr />
                    <p className='my-5 font-montserrat-regular ' >Ace Two {productColor}</p>
                    <div className="flex gap-6 my-8">
                        <button onClick={() => setProductColor("Matte Black")} className={`bg-black h-6 w-6 rounded-full ring-offset-white ring-offset-4 ring-1 hover:ring-gray-400 ${productColor == "Matte Black" ? "ring-black" : "ring-white"}`}></button>
                        <button onClick={() => setProductColor("Graphite")} className={`bg-zinc-500 h-6 w-6 rounded-full ring-offset-white ring-offset-4 ring-1 hover:ring-gray-400  ${productColor == "Graphite" ? "ring-black" : "ring-white"}`}></button>
                        <button onClick={() => setProductColor("Dune")} className={`bg-[#ddd9cd] h-6 w-6 rounded-full ring-offset-white ring-offset-4 ring-1 hover:ring-gray-400  ${productColor == "Dune" ? "ring-black" : "ring-white"}`}></button>
                        <button onClick={() => setProductColor("Jet Black")} style={{ background: 'linear-gradient(-45deg, #efe1cb 49%, black 51%)' }} className={`h-6 w-6 rounded-full ring-offset-white ring-offset-4 ring-1 hover:ring-gray-400 ${productColor == "Jet Black" ? "ring-black" : "ring-white"}`}></button>
                    </div>
                    <hr />

                    <p className='underline underline-offset-4 decoration-1	mt-5 flex items-end relative'>
                        <span className='text-sm text-[#727373] ' >3 interest-free payments with </span>
                        <button onClick={handleOpenModal} >
                            <img className='absolute border-b border-black pb-0.5 w-[50px] top-[3px] ' src="/Common/Klarna.png" alt="" />
                        </button>
                    </p>

                    {isModalOpen &&
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                            <div className="relative bg-white  shadow-lg h-[90vh] w-[40vw] ">
                                <button onClick={handleCloseModal} className="absolute top-7 right-7 font-bold text-3xl ">✕</button>
                                <img className='object-cover h-[90vh] w-[35vw] p-10' src="/Common/Klarna Model img.png" alt="Example" loading='lazy' />
                            </div>
                        </div>
                    }

                    <p className='mt-8 mb-6 text-sm text-[#727373]' >The Ace Two is the latest revolution in electric commuting with a high frame. It combines a clean design, cutting-edge technology, and efficient safety features. Rider height: between 173 and 200cm.</p>

                    <a href={`#${scrollId}`} className='w-56 flex justify-between items-center gap-1 py-2 px-5 bg-[#f0f0f0] rounded-full font-montserrat-light text-sm'> <span>Scroll to specifications</span> <SlArrowDown className='text-xs' /> </a>
                    <button className='bg-black text-white w-full rounded-full py-4 text-xs font-montserrat-medium my-6 hover:bg-white hover:text-black border border-[#727373]' >Customize and add to cart</button>
                    <hr />
                    <p className='mt-4 mb-2' >Shipping to the Netherlands, Belgium & Germany only.</p>
                    <p className='font-light' >Delivery time: 5-15 business days</p>
                </aside>
            </div >
        </>
    )
}

IntroAce.propTypes = {
    scrollId: PropTypes.string
}

export default IntroAce
