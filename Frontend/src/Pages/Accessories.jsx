import { useEffect } from 'react';

import { IoIosArrowRoundDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Components/Header';
import AccessoriesCard from '../Components/AccessoriesCard';
import { fetchAccessoryData } from '../redux/item/itemSlice';

const Accessories = () => {

  const dispatch = useDispatch();
  const accessory = useSelector((state) => state.item.accessory)
  const loading = useSelector((state) => state.item.loading);

  const fetchAccessoryFromBackend = async () => {
    await dispatch(fetchAccessoryData())
  }

  useEffect(() => {
    if(accessory.length < 1){
      fetchAccessoryFromBackend()
    }
  }, [])

  if (loading) {
    return <div className='text-center py-2 animate-ping text-lg font-medium' >O</div>;
  }

  return (
    <>
      <Header />

      <section className='h-[94vh] text-white font-montserrat-medium'>
        <img className="absolute top-0 h-full w-full object-cover -z-50 bg-[#a8abac]" src="/images/Accessories/Accessories_desktop.webp" alt="City Bike Banner" loading='lazy' />
        <div className="pt-48 px-12 ">
          <p className='animate-slideUp w-1/6' >VELOCITY</p>
          <p className="text-7xl pt-5 pb-2 relative font-medium animate-slideUp w-2/6" >Accessories</p>
          <p className='animate-slideUp w-2/6 relative'>Forever Forward<span className="text-xs top-2  absolute">&#9642;</span> </p>
        </div>
        <a href="#items" className="absolute right-14 bottom-14 text-white bg-black rounded-full text-sm py-3 px-7 font-medium border-[#727373] hover:text-black hover:bg-white border  hover:border-none flex items-center">
          <span>Learn more</span> <IoIosArrowRoundDown className='text-xl' />
        </a>
      </section>

      <section id='items' className='m-24' >
        <h1 className='text-center text-5xl font-montserrat-medium mb-16' >Carriers, baskets, Saddles and Grips </h1>
        <div className='grid grid-cols-4 gap-5 ' >
          <img className='object-cover h-full row-span-2 col-span-2' src="/images/Accessories/Accessories_overview_desktop_1.webp" alt="Item Image" loading='lazy' />
          {accessory.length > 0 && accessory.map(accessoryCol => {
            if (accessoryCol.section == 1) {
              return (
                <div key={accessoryCol.id} >
                  <AccessoriesCard image={`/images/Accessories/Set 1/${accessoryCol.accessory_name}.webp`} title={accessoryCol.accessory_name} price={accessoryCol.price} />
                </div>
              )
            }
          })}
        </div>
      </section>

      <section id='items' className='m-24' >
        <h1 className='text-center text-7xl font-montserrat-medium mb-16' >Bells and extras</h1>
        <div className='grid grid-cols-4 gap-5 ' >
          {accessory.length > 0 && accessory.map(accessoryCol => {
            if (accessoryCol.section == 2) {
              return (
                <div key={accessoryCol.id} >
                  <AccessoriesCard image={`/images/Accessories/Set 2/${accessoryCol.accessory_name}.webp`} title={accessoryCol.accessory_name} price={accessoryCol.price} />
                </div>
              )
            }
          })}

        </div>
      </section>


    </>
  )
}

export default Accessories
