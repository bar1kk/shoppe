import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

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
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
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
        </motion.main>
    );
};

export default ShopPage;