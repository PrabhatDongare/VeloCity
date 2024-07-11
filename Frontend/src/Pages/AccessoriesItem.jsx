import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Header from '../Components/Header';
import { fetchAccessoryData } from '../redux/item/itemSlice';
import AccessoriesCard from '../Components/AccessoriesCard';

import { requestAddToCart } from '../redux/cart/cartSlice'

const AccessoriesItem = () => {
  const { url_slug } = useParams();
  const [accessoryItem, setAccessoryItem] = useState({})
  const [randomCards, setRandomCards] = useState([]);
  const [userChangesQuantity, setUserChangesQuantity] = useState(1)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessory = useSelector((state) => state.item.accessory);
  const loading = useSelector((state) => state.item.loading);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const fetchAccessoryFromBackend = async () => {
    await dispatch(fetchAccessoryData())
    await extractAccessoryItem()
  }

  const extractAccessoryItem = async () => {
    const item = await accessory.find(acc => acc.url_slug === url_slug);
    if (item) {
      setAccessoryItem(item);
      // console.log(accessoryItem, "Printing accessory Item ")
      // console.log(accessory, "Printing accessory array ")
    }
  };

  const getRandomCards = async () => {
    const exclude = accessoryItem.id;
    const numbers = [];
    while (numbers.length < 4) {
      let rand;
      if (accessoryItem.section == 1) {
        rand = Math.floor(Math.random() * 9) + 1;
      }
      else {
        rand = Math.floor(Math.random() * 7) + 10;
      }
      if (rand !== exclude && !numbers.includes(rand)) {
        numbers.push(rand);
      }
    }

    const selectedAccessories = accessory.filter(accessoryCol => numbers.includes(accessoryCol.id));
    setRandomCards(selectedAccessories);
  };

  useEffect(() => {
    if (accessory.length < 1) {
      fetchAccessoryFromBackend()
      extractAccessoryItem()
    }
    else{
      extractAccessoryItem()
    }
  }, [url_slug])

  useEffect(() => {
    getRandomCards();
  }, [accessory, accessoryItem, url_slug])

  const increment = () => {
    setUserChangesQuantity(userChangesQuantity + 1)
  };

  const decrement = () => {
    if (userChangesQuantity > 1) {
      setUserChangesQuantity(userChangesQuantity - 1)
    }
  };

  const handleAddToCart = async () => {
    if (localStorage.getItem("token")) {
      await dispatch(requestAddToCart({ item_type: "Accessory", url_slug, quantity: userChangesQuantity }))
    }
    else {
      navigate("/account/login");
    }
  }

  if (loading) {
    return <div className='text-center py-2 animate-ping text-lg font-medium' >O</div>;
  }

  return (
    <>
      <Header bg={false} />

      <section className='flex '>
        <div className='bg-[#f0f0f0] h-[94vh] w-4/6 '>
          <img src={`/images/Accessories/Set ${accessoryItem.section}/${accessoryItem.accessory_name}.webp`} alt="accessory" loading='lazy' className='h-[94vh] w-[100%] object-cover' />
        </div>

        <div className='w-2/6 p-10 font-montserrat-regular'>
          <p className='flex justify-between text-3xl gap-0' >
            <span className='font-montserrat-medium' >{accessoryItem.accessory_name}</span>
            <span className='text-[#727373] font-montserrat-regular flex gap-1' ><span>&euro; </span>{accessoryItem.price}</span>
          </p>
          <p className='text-[#727373] pt-10' >{accessoryItem.description}</p>

          <div className='flex justify-around border border-black rounded-full py-4 my-10' >
            <button onClick={decrement} className={`px-2 ${userChangesQuantity < 2 ? "hover:cursor-not-allowed" : ""}`} disabled={userChangesQuantity < 2}  >-</button>
            <span>{userChangesQuantity}</span>
            <button onClick={increment} className='px-2' >+</button>
          </div>

          <button onClick={handleAddToCart} className='bg-black text-white w-full border border-[#727373] rounded-full py-4 text-sm' >Add to Cart</button>
        </div>
      </section>

      <section className='mx-24 my-14' >
        <h1 className='text-7xl font-medium font-montserrat-medium text-center pb-14' >You may also like</h1>
        <div className='flex gap-4 justify-center' >
          {randomCards.map(accessoryCol => (
            <div key={accessoryCol.id}>
              <AccessoriesCard
                image={`/images/Accessories/Set ${accessoryItem.section}/${accessoryCol.accessory_name}.webp`}
                title={accessoryCol.accessory_name}
                price={accessoryCol.price}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AccessoriesItem;
