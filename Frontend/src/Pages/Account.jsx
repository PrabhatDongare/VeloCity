import { useEffect } from 'react'
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';

const Accessories = () => {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate('/account/login')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      // dispatch(fetchShowTodoData())
    }
    else {
      navigate('/account/login')
    }
  }, []);

  return (
    <>
      <Header bg={false} />
      <p>This is Account Page</p>
      <button className='border px-4 py-1 rounded-full hover:bg-black hover:text-white' onClick={handleLogout} >LOGOUT</button>
    </>
  )
}

export default Accessories
