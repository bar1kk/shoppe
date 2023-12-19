const SliderItem = ({image}) => {
    return (
        <div className="slider__item">
            <img src={image} alt="sliderImg" />
        </div>
    )
}

export default SliderItem;