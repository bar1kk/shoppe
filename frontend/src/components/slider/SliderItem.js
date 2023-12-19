import { Link } from 'react-router-dom';


const SliderItem = ({image}) => {
    return (
        <div className="slider__item">
            <img src={image} alt="sliderImg" />
            {/* <div className="slider__item-title">Gold big hoops</div>
            <div className="slider__item-price">$ 68,00</div>
            <Link to='/error' className='slider__item-btn'>View Product</Link> */}
        </div>
    )
}

export default SliderItem;