import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Ace_Two, Ivy_Two } from "../Utils/product";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const DisplayProduct = () => {

    const [indexProduct1, setIndexProduct1] = useState(0);
    const [indexProduct2, setIndexProduct2] = useState(0);
    const [colorProduct1, setColorProduct1] = useState(Ace_Two["Matte Black"]);
    const [colorProduct2, setColorProduct2] = useState(Ivy_Two["Matte Black"]);

    const navigate = useNavigate()
  
    const handleNextProduct1 = () => {
      setIndexProduct1((prevIndex) => (prevIndex + 1) % colorProduct1.length);
    };
    const handlePrevProduct1 = () => {
      setIndexProduct1((prevIndex) => (prevIndex - 1 + colorProduct1.length) % colorProduct1.length
      );
    };
  
    const handleNextProduct2 = () => {
      setIndexProduct2((prevIndex) => (prevIndex + 1) % colorProduct2.length);
    };
    const handlePrevProduct2 = () => {
      setIndexProduct2((prevIndex) => (prevIndex - 1 + colorProduct2.length) % colorProduct2.length
      );
    };

    const handleGoToIvy = () => {
      navigate('/products/ivy')
    }

  return (
    <>
      <div id="scrollToProducts" className="mx-14 my-10 py-10 flex gap-16">
        {/* Product 1 */}
        <div className="bg-[#ebedee] w-1/2 rounded-xl px-10 py-10 font-montserrat">
          <p className="text-3xl relative">
            <span>Electric Ace</span>
            <span className="text-sm absolute">Two</span>
          </p>
          <p className="py-5 text-lg">Rider height: 173 - 200cm</p>

          <div className="flex justify-between mb-10">
            <button onClick={handlePrevProduct1} ><IoIosArrowBack className="hover:invert text-4xl" /></button>
            <img src={colorProduct1[indexProduct1]} alt="Product Image" className=" w-[100%] h-[350px] object-cover transition-all ease-out duration-500" loading='lazy' />
            <button onClick={handleNextProduct1} ><IoIosArrowForward className="hover:invert text-4xl" /></button>
          </div>

          <div className="text-black flex items-center justify-between">
            <div>
              <Link to="products/ace" className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</Link>
              <Link to="products/ace" className="text-xs underline pl-10 underline-offset-2">Learn More</Link>
            </div>

            <div className="flex gap-6">
              <button onClick={() => setColorProduct1(Ace_Two["Matte Black"])} className={`bg-black h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400  ${colorProduct1 == Ace_Two["Matte Black"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button onClick={() => setColorProduct1(Ace_Two["Graphite"])} className={`bg-zinc-500 h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct1 == Ace_Two["Graphite"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button onClick={() => setColorProduct1(Ace_Two["Dune"])} className={`bg-[#ddd9cd] h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct1 == Ace_Two["Dune"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button style={{ background: 'linear-gradient(90deg, #efe1cb 49%, black 51%)' }} onClick={() => setColorProduct1(Ace_Two["Jet Black"])} className={`h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct1 == Ace_Two["Jet Black"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
            </div>
          </div>
        </div>

        {/* Product 2 */}
        <div className="bg-[#ebedee] w-1/2 rounded-xl px-10 py-10 font-montserrat">
          <p className="text-3xl relative">
            <span>Electric Ace</span>
            <span className="text-sm absolute">Two</span>
          </p>
          <p className="py-5 text-lg">Rider height: 173 - 200cm</p>

          <div className="flex justify-between mb-10">
            <button onClick={handlePrevProduct2} ><IoIosArrowBack className="hover:invert text-4xl" /></button>
            <img src={colorProduct2[indexProduct2]} alt="Product Image" className=" w-[100%] h-[350px] object-cover transition-all ease-out duration-500" loading='lazy' />
            <button onClick={handleNextProduct2} ><IoIosArrowForward className="hover:invert text-4xl" /></button>
          </div>

          <div className="text-black flex items-center justify-between">
            <div>
              <Link to="products/ivy" onClick={handleGoToIvy} className="text-sm bg-white rounded-full py-3 px-7 hover:text-white hover:bg-black">Buy Now</Link>
              <Link to="products/ivy" onClick={handleGoToIvy} className="text-xs underline pl-10 underline-offset-2">Learn More</Link>
            </div>

            <div className="flex gap-6">
              <button onClick={() => setColorProduct2(Ivy_Two["Matte Black"])} className={`bg-black h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct2 == Ivy_Two["Matte Black"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button onClick={() => setColorProduct2(Ivy_Two["Graphite"])} className={`bg-zinc-500 h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct2 == Ivy_Two["Graphite"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button onClick={() => setColorProduct2(Ivy_Two["Dune"])} className={`bg-[#ddd9cd] h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct2 == Ivy_Two["Dune"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
              <button style={{ background: 'linear-gradient(90deg, #efe1cb 49%, #f4f1ec 51%)' }} onClick={() => setColorProduct2(Ivy_Two["Pebble Grey"])} className={`h-8 w-8 rounded-full ring-offset-[#ebedee] ring-offset-4 ring-1 hover:ring-gray-400 ${colorProduct2 == Ivy_Two["Pebble Grey"] ? "ring-black" : "ring-[#ebedee]"}`}></button>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default DisplayProduct
