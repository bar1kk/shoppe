import { Link } from 'react-router-dom';

import sliderImg from '../../assets/image/slider/sliderImage.jfif';

const SliderItem = () => {
    return (
        <div className="slider__item">
            <img src={sliderImg} alt="sliderImg" />
            <div className="slider__item-title">Gold big hoops</div>
            <div className="slider__item-price">$ 68,00</div>
            <Link to='/error' className='slider__item-btn'>View Product</Link>
        </div>
    )
}

export default SliderItem;