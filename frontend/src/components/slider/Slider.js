import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import SliderItem from './SliderItem';
import './slider.scss';
import sliderImage1 from '../../assets/images/slider/slider-1.webp';
import sliderImage2 from '../../assets/images/slider/slider-2.webp';
import sliderImage3 from '../../assets/images/slider/slider-3.webp';
import sliderImage4 from '../../assets/images/slider/slider-4.webp';

const Slider = () => {
    return (
        <div className='slider'>
            <div className='container'>
                <div className='slider__wrapper'>
                    <Swiper pagination={true} modules={[Pagination]} className='mySwiper'>
                        <SwiperSlide>
                            <SliderItem image={sliderImage1} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SliderItem image={sliderImage2} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SliderItem image={sliderImage3} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <SliderItem image={sliderImage4} />
                        </SwiperSlide>
                    </Swiper>
                    <div className='slider-text'>
                        Iconic & fine jewelry, <br />
                        for every woman.
                    </div>
                    <div className='slider-paragraph'>
                        Every woman deserves to feel confident. Discover our unique jewelry, crafted with <br /> premium
                        stainless steel and 18K gold plated.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Slider;
