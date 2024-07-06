import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom';
import slugify from 'slugify';



const AccessoriesCard = ({ image, title, price }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const url_slug = slugify(title, { lower: true })
        navigate(`/accessory/${url_slug}`)
    }

    return (
        <div className=' w-80 '>
            <button onClick={handleClick} className='h-80 w-80 flex bg-[#f0f0f0] hover:scale-95 transition-all duration-300 ease-in-out'>
                <img src={image} alt="item" loading='lazy' className='object-cover h-80 w-80 ' />
            </button>
            <p className='font-montserrat-regular pt-1' >{title}</p>
            <p className='font-montserrat-regular text-[#727373]' >{price && <>&euro;</>} {price}</p>
        </div>
    )
}
AccessoriesCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number
};

export default AccessoriesCard
