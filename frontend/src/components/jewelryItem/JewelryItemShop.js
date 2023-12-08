import { Link } from 'react-router-dom';

import './jewelryItem.scss';

const JewelryItemShop = ({ id, name, price, availability, imagePath, onBuy }) => {
    const status = availability == 0 ? <div className='catalog__item-status'>Sold out</div> : null;

    ruturn(
        <div className='catalog__item'>
            <div className='catalog__item-shop-wrapper'>
                {status}
                <Link to={`shop/${id}`}>
                    <img src={image} alt={name} className='shop__item-img' />
                </Link>
                {availability === 0 ? null : (
                    <div className='catalog__item-hover' onClick={onBuy}>
                        <button>ADD TO CARD</button>
                    </div>
                )}
            </div>
            <Link to={`shop/${id}`} className='catalog__item-title'>
                {name}
            </Link>
            <div className='catalog__item-price'>$ {price}</div>
        </div>
    );
};

export default JewelryItemShop;
