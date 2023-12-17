const CartItem = ({
    id,
    name,
    price,
    material,
    availability,
    imagePath,
    counter = null,
    onRemove = null,
    onPlus = null,
    onMinus = null
}) => {
    const renderCounterChanged = () => {
        return (
            <div>
                <div className='cart__item-counter-wrapper'>
                    <button onClick={onMinus}>-</button>
                    <div>{counter}</div>
                    {counter < availability ? <button onClick={onPlus}>+</button> : null}
                </div>
                {counter >= availability ? <div className='item__availability-left'>Only {availability} left</div> : null}
            </div>
            
        );
    };
    return (
        <>
            <div className='cart__item'>
                <div className='cart__item-wrapper'>
                    <img src={imagePath} alt='selected item in cart' className='cart__item-img' />
                    <div className='cart__item-info'>
                        <div className='cart__item-title'>{name}</div>
                        <div className='cart__item-material'>{material}</div>
                        <div className='cart__item-price'>$ {price}</div>
                    </div>
                </div>
                <div className='cart__item-wrapper'>
                    {renderCounterChanged()}
                    <div className='cart__item-close'>
                        <button onClick={onRemove}>
                            <div className='close-button'>×</div>
                        </button>
                    </div>
                </div>
            </div>
            <div className='cart__line'></div>
        </>
    );
};

export default CartItem;
