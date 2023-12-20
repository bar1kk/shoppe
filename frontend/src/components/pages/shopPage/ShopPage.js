import { useSelector } from 'react-redux';

import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import JewelryFilterBar from '../../jewelryFilterBar/JewelryFilterBar';
import JewelryCatalogShop from '../../jewelryCatalog/JewelryCatalogShop';
import Notification from '../../notification/Notification';

import './shopPage.scss';
import checkMarkIcon from '../../../assets/icons/checkMark.svg';

const ShopPage = () => {
    const {notificationStatus} = useSelector(state => state.notification);
    
    return (
        <>
            <Header line={true}/>
            <div className="shop__notification">
                {notificationStatus ? <Notification icon={checkMarkIcon} link={true}/>  : null}
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

export default ShopPage;