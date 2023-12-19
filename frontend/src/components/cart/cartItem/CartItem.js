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
                    <div className='cart__item-counter-wrapper'>
                        <button onClick={onMinus}>-</button>
                        <div>{counter}</div>
                        <button onClick={onPlus}>+</button>
                    </div>
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
