import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CiUser } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

import { fetchUserCart } from '../redux/cart/cartSlice';
import { requestCheckout } from '../redux/order/orderSlice';
import { toast } from 'react-toastify';


const Header = ({ bg }) => {
  const [isWhite, setIsWhite] = useState(false);
  const [listElectricBike, setListElectricBike] = useState(false)
  const [listCityBike, setListCityBike] = useState(false)
  const [listLeasing, setListLeasing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userCart = useSelector((state) => state.cart.userCart)
  const loading = useSelector((state) => state.order.loading);
  const { address } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  const handleAccount = () => {
    if (localStorage.getItem("token")) {
      navigate('/account')
    }
    else {
      navigate('/account/login')
    }
  }

  const fetchDataAsync = async () => {
    if (localStorage.getItem("token")) {
      await dispatch(fetchUserCart())
    }
  }

  const handleOpenModal = () => {
    if (localStorage.getItem("token")) {
      fetchDataAsync();
      setIsModalOpen(true);
    }
    else {
      navigate('/account/login')
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleCheckout = async () => {
    if(address.length < 1){
      navigate('/account')
      toast.warning("Please add address before Ordering")
    }
    else{
      await dispatch(requestCheckout())
    }
  };

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
          <li className="pr-14"><button onClick={handleAccount} ><CiUser className="text-xl" /></button></li>
          <li><button onClick={handleOpenModal} ><HiShoppingBag className="text-xl" /></button></li>

          {isModalOpen &&
            <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50 ">
              <div className="relative bg-white  shadow-lg h-[100vh] w-[50vw] font-montserrat-regular">
                <div className='flex justify-between px-16 py-7 '>
                  <p className='text-4xl' >Cart</p>
                  <button onClick={handleCloseModal} className="font-bold text-2xl ">✕</button>
                </div>
                <hr />
                {userCart.length > 0 ?
                  <div className='px-16 py-10' >
                    <p>Multiple Items in cart</p>
                    <p className='flex justify-end my-10' >
                      <button onClick={handleCheckout} className=' border border-[#727373] rounded-full py-3 px-16 text-black hover:bg-black hover:text-white' >
                        { loading ? <span className='animate-ping' >Checkout</span> : <span>Checkout</span>}
                      </button>
                    </p>
                  </div> :
                  <p className='text-xl px-16 py-10' >Your cart is empty.</p>
                }
              </div>
            </div>
          }

        </ul>
      </div>
      {/* {error && <p>Error: {error}</p>} */}

      {listElectricBike && isWhite && <ul className={`absolute left-[202px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] ' onClick={() => setListElectricBike(false)} ><Link to="/electric-bike" className='py-3 pr-10 pl-4' >Overview</Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] ' onClick={() => setListElectricBike(false)} ><Link to="/products/ivy" className=' pr-10 pl-4' >Ivy <sup className='text-[9px]'>TWO</sup> </Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] rounded-b-md' onClick={() => setListElectricBike(false)} ><Link to="/products/ace" className=' pr-10 pl-4' >Ace <sup className='text-[9px] z-50'>TWO</sup></Link></li>
      </ul>}

      {listCityBike && isWhite && <ul className={`absolute left-[305px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)} ><Link to="/city-bike" className=' pr-10 pl-4' >Overview</Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)}><Link to="/products/ace" className=' pr-10 pl-4' >WOMEN</Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] ' onClick={() => setListCityBike(false)}><Link to="/products/ace" className=' pr-10 pl-4' >MEN</Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] rounded-b-md' onClick={() => setListCityBike(false)} ><Link to="/products/ace" className=' pr-10 pl-4' >KIDS</Link></li>
      </ul>}


      {listLeasing && isWhite && <ul className={`absolute left-[565px] bg-white font-montserrat text-sm rounded-b-md animate-slideDown z-10`}>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee]' onClick={() => setListLeasing(false)} ><Link to="/bike-leasing" className=' pr-10 pl-4' >Employers</Link></li>
        <li className='border-b-[0.5px] border-r-[0.5px] border-l-[0.5px] border-[#e7e7e7] py-1.5 hover:bg-[#ebedee] rounded-b-md' onClick={() => setListLeasing(false)} ><Link to="/leasing-form" className=' pr-10 pl-4' >Employees</Link></li>
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
