// import React from 'react'
import { IoCloudDone } from "react-icons/io5";
import { Link } from 'react-router-dom';


const PaymentSuccess = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center font-mono select-none' >
      <div className="flex flex-col justify-center items-center border border-blue-200 px-20 py-14 bg-blue-50 rounded-xl" >
        <IoCloudDone className='text-9xl text-green-500' />
        <p className='text-3xl mt-6 mb-3' >Payment Completed!</p>
        <p>Your shipment will be delivered soon. Thanks for shopping choosing <span className="font-extrabold">VeloCity</span></p>
        <p className="text-sm pt-2" >( Help us to improve your experience with a <span className="underline hover:cursor-pointer underline-offset-2">feedback</span> )</p>
        <Link to="/" className="bg-black text-white py-3 px-8 my-5 rounded-full hover:bg-[#8e8e8e] transition-all ease-in-out duration-200 font-sans">Continue Shopping</Link>
      </div>
    </div>
  )
}

export default PaymentSuccess
