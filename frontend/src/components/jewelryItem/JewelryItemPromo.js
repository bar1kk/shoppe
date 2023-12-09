import { Link } from 'react-router-dom';

import './jewelryItem.scss';
//import image from '../../assets/image/1.webp';

const JewelryPromoItem = ({ name, price, id, imagePath }) => {
    return (
        <div className="catalog__item">
            <Link to={`/shop/${id}`} className='catalog__item-promo-wrapper'>
                <img src={imagePath} alt={name} className="catalog__item-img"/>
            </Link>
            <Link to={`/shop/${id}`} className="catalog__item-title">{name}</Link>
            <div className="catalog__item-price">$ {price}</div>
        </div>
    );
};

export default JewelryPromoItem;