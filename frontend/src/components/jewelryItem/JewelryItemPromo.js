import { Link } from 'react-router-dom';

import './jewelryItem.scss';
//import image from '../../assets/image/1.webp';

const JewelryPromoItem = ({id, name, price,  availability, imagePath }) => {
    const status = availability === 0 ? <div className='catalog__item-status'>Sold out</div> : null;
    return (
        <div className='catalog__item'>
            <div className='catalog__item-promo-wrapper'>
                {status}
                <Link to={`/shop/${id}`}>
                    <img src={imagePath} alt={name} className='catalog__item-img' />
                </Link>
            </div>
            <Link to={`/shop/${id}`} className='catalog__item-title'>
                {name}
            </Link>
            <div className='catalog__item-price'>$ {price}</div>
        </div>
    );
};

export default JewelryPromoItem;
