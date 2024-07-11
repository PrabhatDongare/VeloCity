import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { CiUser } from "react-icons/ci";
import { HiShoppingBag } from "react-icons/hi";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaCcPaypal } from "react-icons/fa";
import { FaShopify } from "react-icons/fa";
import { SiMastercard } from "react-icons/si";
import { FaCcVisa } from "react-icons/fa";


import { fetchUserCart, removeCartItem, findCartTotal, updateUserCart } from '../redux/cart/cartSlice';
import { fetchAddress } from '../redux/user/userSlice';
import { requestCheckout, requestPayment } from '../redux/order/orderSlice';
import { toast } from 'react-toastify';
import { Ace_Two, Ivy_Two, accessoryImagesArray } from "../Utils/product";

const Header = ({ bg }) => {
  const [isWhite, setIsWhite] = useState(false);
  const [listElectricBike, setListElectricBike] = useState(false)
  const [listCityBike, setListCityBike] = useState(false)
  const [listLeasing, setListLeasing] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userCart, cartTotal } = useSelector((state) => state.cart)
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
      await dispatch(findCartTotal())
    }
  }

  const handleOpenModal = () => {
    if (localStorage.getItem("token")) {
      fetchDataAsync();
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
    else {
      navigate('/account/login')
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleCheckout = async () => {
    if (address.length < 1) {
      const checkAddressAtBackend = await dispatch(fetchAddress())
      if (checkAddressAtBackend.payload.success) {
        const orderResponse = await dispatch(requestCheckout())
        toast.success("Redirecting to payment gateway")
        const paymentResponse = await dispatch(requestPayment({ order_id: orderResponse.payload.order.id }));
        window.location.href = paymentResponse.payload.data.links[1].href;
      }
      else {
        navigate('/account')
        setIsModalOpen(false)
        toast.warning("Please add address before Ordering")
      }
    }
    else {
      await dispatch(requestCheckout())
    }
  };

  const handleRemoveCartItem = async (url_slug) => {
    await dispatch(removeCartItem({ url_slug }))
  }

  function urlSlugToItem(item_type, url_slug) {
    const words = url_slug.split('-');
    if (item_type === "Accessory") {
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      const item_name = capitalizedWords.join(' ');
      return item_name;
    }
    else {
      const words = url_slug.split('-');
      const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      capitalizedWords.splice(1, 0, 'Two');
      return ['Electric', ...capitalizedWords].join(' ');
    }
  }

  function productImageForCart(item_type, url_slug) {
    let product_type;
    let color;
    let image = "";

    if (item_type === "Product") {
      if (url_slug.startsWith('ace')) {
        product_type = Ace_Two;
        url_slug = url_slug.slice(4);
      } else {
        product_type = Ivy_Two;
        url_slug = url_slug.slice(4);
      }
      color = url_slug.replace(/-/, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      image = product_type[color][0]

    } else {
      const normalizedSlug = url_slug.replace(/-/g, ' ');
      accessoryImagesArray.find((url, index) => {
        const parts = url.split('/');
        const filename = parts[parts.length - 1];
        const filenameWithoutExtension = filename.split('.')[0];
        if (filenameWithoutExtension.toLowerCase() == normalizedSlug.toLowerCase()) {
          // console.log(accessoryImagesArray[index])
          image = accessoryImagesArray[index]
        }
      });
    }
    return image
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchDataAsync();
    }
  }, [])

  const handleUpdateQuantity = async (item_type, url_slug, inc) => {
    // console.log("making request : ", item_type, url_slug, inc)
    await dispatch(updateUserCart({ item_type, url_slug, inc }))
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
          {/* Account Button */}
          <li className="pr-14">
            <button onClick={handleAccount} >
              <CiUser className="text-xl" />
            </button>
          </li>

          {/* Cart Button */}
          <li>
            <button className='relative' onClick={handleOpenModal} >
              <HiShoppingBag className="text-xl" />
              {userCart.length > 0 && <span className='text-xs absolute bottom-2 left-3 px-1 rounded-full bg-slate-400' >{userCart.length}</span>}
            </button>
          </li>

          {isModalOpen &&
            <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50  ">
              <div className="relative bg-white  shadow-lg h-[100vh] w-[50vw] font-montserrat-regular overflow-y-auto ">

                <div className='h-[10vh]'>
                  <div className='flex justify-between mx-16 my-7'>
                    <p className='text-4xl ' >Cart</p>
                    <button onClick={handleCloseModal} className="font-bold text-2xl ">✕</button>
                  </div>
                  <hr />
                </div>

                {userCart.length > 0 ? <>
                  <div className="flex-1 overflow-y-auto hide-scrollbar" style={{ flexGrow: 1 }}>
                    <div className="h-[60vh] ">

                      {userCart.map(userCartCols => {
                        return (<div key={userCartCols.id} className='border-b px-16 py-12 flex justify-between items-center' >
                          <div className='bg-[#f0f0f0] w-36 h-28 object-bottom rounded-xl' ><img className='w-36 h-28 object-contain' src={productImageForCart(userCartCols.item_type, userCartCols.url_slug)} alt="product image" /></div>

                          <div className='flex flex-col w-56'>
                            <p className='text-xl' >{urlSlugToItem(userCartCols.item_type, userCartCols.url_slug)}</p>
                            <div className='border rounded-full w-20 flex justify-around px-1 items-center my-2' >
                              <button disabled={userCartCols.quantity == 1} onClick={() => handleUpdateQuantity(userCartCols.item_type, userCartCols.url_slug, false)} >-</button>
                              <span className='text-xs' >{userCartCols.quantity}</span>
                              <button onClick={() => handleUpdateQuantity(userCartCols.item_type, userCartCols.url_slug, true)} >+</button>
                            </div>
                          </div>

                          <div className='flex flex-col ' >
                            <p className='flex justify-end'>
                              <button onClick={() => handleRemoveCartItem(userCartCols.url_slug)} className=' py-1 px-3 mb-3 text-xs border rounded-full hover:bg-black hover:text-white' >Remove</button>
                            </p>
                            <p className='text-3xl' >&euro; {userCartCols.price}</p>
                          </div>
                        </div>)
                      })}

                    </div>
                  </div>

                  <div>
                    <hr />
                    <div className=' flex flex-col' >
                      <p className='mx-16 flex justify-between py-5 text-sm' ><span>TOTAL : </span><span>&euro; {cartTotal}</span></p>
                      <button onClick={handleCheckout} className='mx-16 border border-[#727373] rounded-full py-3 px-16 text-black hover:bg-black hover:text-white' >
                        {loading ? <span className='animate-ping font-bold' >Checkout</span> : <span>Checkout</span>}
                      </button>
                      <div className='mx-16 my-5 flex justify-between items-center' >
                        <span className='text-xs' >SHIPPING WILL BE CALCULATED AT CHECKOUT</span>
                        <div className='flex gap-3 text-3xl text-[#b3b3b3]'>
                          <FaCcPaypal /> <FaShopify /> <SiMastercard /> <FaCcVisa />
                        </div>
                      </div>
                    </div>
                  </div>
                </> : <p className='text-xl px-16 py-10' >Your cart is empty.</p>
                }

              </div>
            </div>
          }
        </ul>
      </div>

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
