import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import SliderItem from './SliderItem';
import './slider.scss';

const Slider = () => {
    return(
        <div className="slider">
            <div className="container">
                <div className="slider__wrapper">
                <Swiper 
                    pagination={true} 
                    modules={[Pagination]} 
                    className="mySwiper">
                    <SwiperSlide><SliderItem/></SwiperSlide>
                    <SwiperSlide><SliderItem/></SwiperSlide>
                    <SwiperSlide><SliderItem/></SwiperSlide>
                    <SwiperSlide><SliderItem/></SwiperSlide>
                </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Slider;