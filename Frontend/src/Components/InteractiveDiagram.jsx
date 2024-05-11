import React, { useState } from 'react'
import PropTypes from 'prop-types';

import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

const InteractiveCycleDiagram = ({ productLink }) => {
  const [isMoved, setIsMoved] = useState(false);

  const handleMove = () => {
    setIsMoved(!isMoved);
  }

  return (
    <>
      <div className='bg-slate-500 h-[100vh] relative '>
        <button className='p-3 rounded-full bg-[#edeae8] text-xl' onClick={handleMove}>{isMoved ? <GoPlus /> : <RxCross2 />}</button>
        <img className={` object-cover w-[60vw] h-[80vh] absolute ${isMoved ? "" : "translate-x-72"} duration-1000 ease-in-out`} src={productLink} alt="Product Image" loading='lazy' />

      </div>


    </>
  )
}

InteractiveCycleDiagram.propTypes = {
  productLink: PropTypes.string.isRequired,
};

export default InteractiveCycleDiagram
