import { useSelector } from 'react-redux';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import JewelryFilterBar from '../../jewelryFilterBar/JewelryFilterBar';
import JewelryCatalogShop from '../../jewelryCatalog/JewelryCatalogShop';
import Notification from '../../notification/Notification';

import './shop.scss';
import checkMarkIcon from '../../../assets/icons/checkMark.svg';

const Shop = () => {
    const {notificationStatus} = useSelector(state => state.notification);
    const addedGoodText = 'The item added to your Shopping bag!';    
    
    return (
        <>
            <Header line={true}/>
            <div className="shop__notification">
                {notificationStatus ? <Notification text={addedGoodText} icon={checkMarkIcon} link={true}/>  : null}
            </div>
            <div className="container">
                <div className='shop__wrapper'>
                    <JewelryFilterBar />
                    <JewelryCatalogShop />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shop;