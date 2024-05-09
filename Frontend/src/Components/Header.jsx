// import React from 'react'
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CiUser } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const Header = ({bg}) => {
  const [isWhite, setIsWhite] = useState(false);
  const [listElectricBike, setListElectricBike] = useState(false)
  const [listCityBike, setListCityBike] = useState(false)
  const [listLeasing, setListLeasing] = useState(false)
  
  const handleMouseEnter = () => {
    setIsWhite(true);
  };
  const handleMouseLeave = () => {
    setIsWhite(false);
    setListElectricBike(false)
    setListCityBike(false)
    setListLeasing(false)
  };

  const handleElectricBike = () => {
    setListElectricBike(!listElectricBike)
    setListCityBike(false)
    setListLeasing(false)
  }

  const handleCityBike = () => {
    setListElectricBike(false)
    setListCityBike(!listCityBike)
    setListLeasing(false)
  }

  const handleLeasing = () => {
    setListElectricBike(false)
    setListCityBike(false)
    setListLeasing(!listLeasing)
  }

  return (
      <header id='scrollToTop' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${bg ? "text-white" : ""} hover:bg-white hover:text-black transition-all duration-500 `}>
        <div className='flex justify-between tracking-wide py-2 pl-12 pr-20 items-center border-b-[0.5px] border-zinc-400 bg-transparent  ' >
          <div className='flex gap-14 items-center'>
            <Link to="/"><img src="/logo/no bg - logo.webp" alt="" className={`w-28 ${isWhite || !bg ? '' : 'invert'} `} loading='lazy' /></Link>
            <ul className='flex gap-6 text-sm font-montserrat'>
              <li>
                <button onClick={handleElectricBike} className='flex items-center gap-1.5 '>
                  <span>ELECTRIC</span>
                  {listElectricBike && !isWhite ? <BsChevronUp /> : <BsChevronDown />}
                </button>
              </li>
              <li>
                <button onClick={handleCityBike} className='flex items-center gap-1.5 '>
                  <span>CITY</span>
                  {listCityBike && !isWhite ? <BsChevronUp /> : <BsChevronDown />}
                </button>
              </li>
              <li><Link to="/accessories">ACCESSORIES</Link></li>
              <li><Link to="/store">STORES</Link></li>
              <li>
                <button onClick={handleLeasing} className='flex items-center gap-1.5 '>
                  <span>LEASING</span>
                  {listLeasing && !isWhite ? <BsChevronUp /> : <BsChevronDown />}
                </button>
              </li>
            </ul>
          </div>

          <ul className='flex'>
            <li className="pr-14"><Link to="/login"><CiUser className="text-xl" /></Link></li>
            <li className=""><Link to="/account"><HiShoppingBag className="text-xl" /></Link></li>
          </ul>
        </div>

        {listElectricBike && isWhite && <ul className={`absolute left-[202px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee] ' onClick={() => setListElectricBike(false)} ><Link to="/electricBike" >Overview</Link></li>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee] ' onClick={() => setListElectricBike(false)} ><Link to="/products/ivy" >Ivy <sup className='text-[9px]'>TWO</sup> </Link></li>
          <li className='py-1.5 pr-10 pl-4 hover:bg-red-400 rounded-b-md' onClick={() => setListElectricBike(false)} ><Link to="/products/ivy" >Ace <sup className='text-[9px] z-50'>TWO</sup></Link></li>
        </ul>}

        {listCityBike && isWhite && <ul className={`absolute left-[319px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)} ><Link to="/cityBike" >Overview</Link></li>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)}><Link to="/products/robyn-women" >WOMEN</Link></li>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)}><Link to="/cityBike" >MEN</Link></li>
          <li className='py-1.5 pr-10 pl-4 hover:bg-[#ebedee] rounded-b-md'  onClick={() => setListCityBike(false)} ><Link to="/cityBike" >KIDS</Link></li>
        </ul>}

        {listLeasing && isWhite && <ul className={`absolute left-[605px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
          <li className='border-b-[0.5px] border-zinc-400 py-1.5 pr-10 pl-4 hover:bg-[#ebedee]' onClick={() => setListLeasing(false)} ><Link to="/leaseEmployer" className='' >Employer</Link></li>
          <li className='py-1.5 pr-10 pl-4 hover:bg-[#ebedee] rounded-b-md' onClick={() => setListLeasing(false)} ><Link to="/leaseEmployee" >Employee</Link></li>
        </ul>}
      </header>
  )
}

Header.defaultProps = {
  bg: true,
}

Header.propTypes = {
  bg: PropTypes.bool
};

export default Header
