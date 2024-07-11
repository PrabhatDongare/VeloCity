// import React from 'react'
import { RxCrossCircled } from "react-icons/rx";
import { Link } from 'react-router-dom';


const PaymentFailed = () => {
  return (
    <div className='h-[100vh] flex justify-center items-center font-mono select-none' >
      <div className="flex flex-col justify-center items-center border border-red-300 px-20 py-14 bg-red-50 rounded-xl" >
        <RxCrossCircled className='text-9xl text-red-500' />
        <p className='text-3xl mt-10 mb-3' >Payment failed!</p>
        <p className='' >The transaction attempt has failed. Please retry to pay after sometime</p>
        <Link to="/" className="bg-black text-white py-3 px-8 my-5 rounded-full hover:bg-[#8e8e8e] transition-all ease-in-out duration-200 font-sans">Return to HOME</Link>
      </div>
    </div>
  )
}

export default PaymentFailed
