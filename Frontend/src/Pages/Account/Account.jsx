import { useState, useEffect } from 'react'
import Header from '../../Components/Header';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";

import { IoIosCall } from "react-icons/io";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaTreeCity } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { FaLandmarkFlag } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import { fetchAddress, requestToAddAddress, requestToEditAddress, removeCurrentUserAddressFromFrontend } from '../../redux/user/userSlice';
import { fetchOrder, deleteOrder, requestPayment, emptyCurrentUserOrderTableFromFrontend, emptyCurrentUserOrderItemFromFrontend } from '../../redux/order/orderSlice';
import { emptyCurrentUserCartFromFrontend } from '../../redux/cart/cartSlice';

const Accessories = () => {
  const [pageContent, setPageContent] = useState("order")
  const [pageData, setPageData] = useState({})
  const [isModalOpen, setIsModalOpen] = useState("");
  const [paymentLoadingState, setPaymentLoadingState] = useState(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, address } = useSelector((state) => state.user);
  const { orderLoading, orderTable, paymentLoading } = useSelector((state) => state.order);

  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"];

  const handleLogout = async() => {
    localStorage.removeItem("token")
    await dispatch(removeCurrentUserAddressFromFrontend())
    await dispatch(emptyCurrentUserOrderTableFromFrontend())
    await dispatch(emptyCurrentUserOrderItemFromFrontend())
    await dispatch(emptyCurrentUserCartFromFrontend())
    navigate('/account/login')
  }

  const onSubmit = async (data) => {
    const { house_no, street_name, zipcode, city, country, phone } = data
    if (isModalOpen === "order") {
      // order submit
    }
    else if (isModalOpen === "addAddress") {
      await dispatch(requestToAddAddress({ house_no, street_name, zipcode, city, country, phone }))
      setPageData({ success: true, address: { house_no, street_name, zipcode, city, country, phone } })
      setIsModalOpen("")
    }
    else if (isModalOpen === "editAddress") {
      const response = await dispatch(requestToEditAddress({ house_no, street_name, zipcode, city, country, phone }))
      if (response.payload.success) {
        setPageData({ success: true, address: { house_no, street_name, zipcode, city, country, phone } })
        setIsModalOpen("")
      }
    }
  }

  const fetchOrderFromBackend = async () => {
    const response = await dispatch(fetchOrder())
    setPageData({ success: response.payload.success, orderTable: response.payload.order })
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      if (orderTable.length < 1) {
        fetchOrderFromBackend()
      }
      else {
        setPageData({ success: true, orderTable })
      }
    }
    else {
      navigate('/account/login')
    }
  }, []);


  const handleAddressContent = async () => {
    setPageData({})
    setPageContent("address")
    if (address.length < 1) {
      const response = await dispatch(fetchAddress());
      setPageData(response.payload)
    }
    else {
      setPageData({ success: true, address })
    }
  }

  const handleOrderContent = () => {
    setPageData({})
    setPageContent("order")
    if (orderTable.length < 1) {
      fetchOrderFromBackend()
    }
    else {
      setPageData({ success: true, orderTable })
    }
  }

  const handleOpenAddressModal = (edit) => {
    if (edit) { setIsModalOpen("editAddress") }
    else { setIsModalOpen("addAddress") }
  }

  const handleCloseModal = () => {
    setIsModalOpen("")
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDeleteOrder = async (order_id) => {
    await dispatch(deleteOrder({ order_id }))
  }

  const handlePaymentOrder = async (order_id) => {
    setPaymentLoadingState(order_id)
    const response = await dispatch(requestPayment({ order_id }));
    window.location.href = response.payload.data.links[1].href;
  }  

  return (
    <>
      <Header bg={false} />
      <div>
        <img src="./images/Account/Account_page-desktop.webp" alt="Account Banner" loading='lazy' className='h-[60vh] w-full object-cover' />
      </div>

      <div className='flex min-h-[55vh] font-montserrat-regular' >
        <div className='w-1/5 flex flex-col justify-between px-20 py-14 border-r' >
          <div className='flex text-xl flex-col gap-5 items-start' >
            <button className='accountBtnStyling' onClick={handleOrderContent} >My orders</button>
            <button className='accountBtnStyling' onClick={handleAddressContent} >My address</button>
          </div>
          <div>
            <button className='border px-8 py-3 rounded-full hover:bg-black hover:text-white ' onClick={handleLogout} >logout</button>
          </div>
        </div>

        <div className='w-4/5 px-16 py-10' >
          {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* Order */}
          {pageContent === "order" && <div>
            <p className='text-4xl mb-10' >Order overview</p>

            {orderLoading &&
              <div className='flex justify-center text-2xl font-medium animate-pulse' >
                <p className=' animate-bounce duration-100' >o</p> &ensp;
                <p className='animate-bounce duration-500' >O</p> &ensp;
                <p className='animate-bounce duration-1000' >o</p>
              </div>}

            {!orderLoading && pageData && pageData.success && <>
              <table className='w-[100%]' >
                <thead>
                  <tr >
                    <th>Updated Date</th>
                    <th>Total Amt</th>
                    <th>Shipping</th>
                    <th>Net Amt</th>
                    <th>Status</th>
                    <th>Order No.</th>
                    <th >Action / Payment ID</th>
                  </tr>
                </thead>

                <tbody>
                  {orderTable.map((item, index) => (
                    <tr key={index} >
                      <td>{formatDate(item.updated_at)}</td>
                      <td>€ {item.total_amount}</td>
                      <td>€ {item.shipping_charges}</td>
                      <td>€ {item.net_amount}</td>
                      <td>{item.status}</td>
                      <td>{item.order_no}</td>
                      <td>
                        {item.status === "paid" ? <>{item.payment_id}</> :
                          <div className='flex justify-center items-center gap-5 '>
                            <button onClick={() => handlePaymentOrder(item.id)} className='bg-yellow-400 w-24 px-2 rounded-md' >
                              {paymentLoading && paymentLoadingState == item.id ?
                                <div className='flex justify-center items-center text-lg font-medium animate-pulse text-white duration-500' >O</div>
                                : 
                                <img className='py-1' src="/Common/paypal_logo.png" alt="paypal button" loading='lazy' />}
                            </button>
                            <button onClick={() => handleDeleteOrder(item.id)} className='text-2xl text-red-500 ' ><MdDelete /></button>
                          </div>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>}

            {!orderLoading && pageData && !pageData.success &&
              <div>
                <p className=' text-lg' >No order active currently</p>
                <p className='my-2 text-sm' >(Last 7 days or unpaid orders are only visible)</p>
              </div>}
          </div>}

          {/* -------------------------------------------------------------------------------------------------------------------------------------------------------- */}
          {/* Address */}
          {pageContent === "address" &&
            <div>
              <p className='text-4xl mb-10' >Delivery Address</p>

              {loading &&
                <div className='flex justify-center text-2xl font-medium animate-pulse' >
                  <p className=' animate-bounce duration-100' >o</p> &ensp;
                  <p className='animate-bounce duration-500' >O</p> &ensp;
                  <p className='animate-bounce duration-1000' >o</p>
                </div>}

              {!loading && pageData && pageData.success &&
                <div>
                  <p className='flex items-center gap-2' ><MdLocationPin />{pageData.address.house_no} </p>
                  <p className='flex items-center gap-2' ><FaTreeCity />{pageData.address.street_name}</p>
                  <p className='flex items-center gap-2' > <FaLandmarkFlag />{pageData.address.city} {pageData.address.zipcode}</p>
                  <p className='flex items-center gap-2' ><FaGlobeAmericas /> {pageData.address.country}</p>
                  <div>{pageData.address.phone != null && <p className='flex items-center gap-2'><IoIosCall />{pageData.address.phone}</p>}</div>
                  <button onClick={() => handleOpenAddressModal(true)} className='w-1/3 bg-black text-white border border-[#a8abac] py-3 my-6 rounded-full hover:bg-white hover:text-black' >Edit Address</button>
                </div>}
              {isModalOpen === "editAddress" &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                  <div className="relative bg-white  shadow-lg h-[75vh] w-[50vw] px-16 py-10 ">
                    <button onClick={handleCloseModal} className="absolute top-7 right-8 font-bold text-2xl ">✕</button>
                    <h1 className='text-3xl font-medium text-center' >Edit address</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='my-10 flex flex-col gap-8' >

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("house_no", {
                            required: { value: true, message: "Please Enter House no." },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 20, message: "max 20 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z0-9.,]+$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='House no.' width={21} defaultValue={pageData.address.house_no} />
                          {errors.house_no && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.house_no.message}</span>}
                        </div>

                        <div >
                          <input {...register("street_name", {
                            required: { value: true, message: "Please Enter Street Name" },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 30, message: "max 30 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Street Name' width={31} defaultValue={pageData.address.street_name} />
                          {errors.street_name && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.street_name.message}</span>}
                        </div>
                      </div>

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("city", {
                            required: { value: true, message: "Please Enter City Name" },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 20, message: "max 20 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='City Name' width={21} defaultValue={pageData.address.city} />
                          {errors.city && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.city.message}</span>}
                        </div>

                        <div>
                          <select {...register("country", { required: "Please select a country" })} className='border p-3 w-72  max-h-48 overflow-y-auto' defaultValue={pageData.address.country} >
                            <option value="">Select Country</option>
                            {countries.map((country, index) => (<option key={index} value={country}>{country}</option>))}
                          </select>
                          {errors.country && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.country.message}</span>}
                        </div>
                      </div>

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("zipcode", {
                            required: { value: true, message: "Please Enter Zip Code" },
                            pattern: {
                              value: /^\d{4,12}$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Zip Code' width={21} defaultValue={pageData.address.zipcode} />
                          {errors.zipcode && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.zipcode.message}</span>}
                        </div>

                        <div >
                          <input {...register("phone", {
                            required: { value: true, message: "Please Enter Phone Number" },
                            pattern: {
                              value: /^\d{7,11}$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Phone' width={12} defaultValue={pageData.address.phone} />
                          {errors.phone && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.phone.message}</span>}
                        </div>
                      </div>

                      <input disabled={isSubmitting} type="submit" value='Save' className='block mx-auto bg-black text-white border border-[#a8abac] px-16 py-3 rounded-full hover:bg-white hover:text-black my-5' />
                    </form>
                  </div>
                </div>}

              {!loading && pageData && !pageData.success &&
                <div>
                  <p>Add address to get delivery</p>
                  <button onClick={() => handleOpenAddressModal(false)} className='w-1/3 bg-black text-white border border-[#a8abac] py-3 my-10 rounded-full hover:bg-white hover:text-black' >Add Address</button>
                </div>}
              {isModalOpen === "addAddress" &&
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
                  <div className="relative bg-white  shadow-lg h-[75vh] w-[50vw] px-16 py-10 ">
                    <button onClick={handleCloseModal} className="absolute top-7 right-8 font-bold text-2xl ">✕</button>
                    <h1 className='text-3xl font-medium text-center' >New address</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='my-10 flex flex-col gap-8' >

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("house_no", {
                            required: { value: true, message: "Please Enter House no." },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 20, message: "max 20 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z0-9.,]+$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='House no.' width={21} />
                          {errors.house_no && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.house_no.message}</span>}
                        </div>

                        <div >
                          <input {...register("street_name", {
                            required: { value: true, message: "Please Enter Street Name" },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 30, message: "max 30 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Street Name' width={31} />
                          {errors.street_name && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.street_name.message}</span>}
                        </div>
                      </div>

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("city", {
                            required: { value: true, message: "Please Enter City Name" },
                            minLength: { value: 3, message: "min 3 character required" },
                            maxLength: { value: 20, message: "max 20 character allowed" },
                            pattern: {
                              value: /^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='City Name' width={21} />
                          {errors.city && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.city.message}</span>}
                        </div>

                        <div>
                          <select {...register("country", { required: "Please select a country" })} className='border p-3 w-72  max-h-48 overflow-y-auto'>
                            <option value="">Select Country</option>
                            {countries.map((country, index) => (<option key={index} value={country}>{country}</option>))}
                          </select>
                          {errors.country && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.country.message}</span>}
                        </div>
                      </div>

                      <div className='flex justify-between ' >
                        <div >
                          <input {...register("zipcode", {
                            required: { value: true, message: "Please Enter Zip Code" },
                            pattern: {
                              value: /^\d{4,12}$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Zip Code' width={21} />
                          {errors.zipcode && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.zipcode.message}</span>}
                        </div>

                        <div >
                          <input {...register("phone", {
                            required: { value: true, message: "Please Enter Phone Number" },
                            pattern: {
                              value: /^\d{7,11}$/,
                              message: "* invalid entry"
                            }
                          })} className='border p-3 w-72 placeholder-black' placeholder='Phone' width={12} />
                          {errors.phone && <span className='text-sm flex items-end text-red-500 pt-1'>{errors.phone.message}</span>}
                        </div>
                      </div>

                      <input disabled={isSubmitting} type="submit" value='Save' className='block mx-auto bg-black text-white border border-[#a8abac] px-16 py-3 rounded-full hover:bg-white hover:text-black my-5' />
                    </form>
                  </div>
                </div>}
            </div>}
        </div>
      </div>
    </>
  )
}

export default Accessories
