import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Slider from '../slider/Slider';
import JewelryCatalogPromo from '../jewelryCatalog/JewelryCatalogPromo';
import Notification from '../notification/Notification';
import checkMarkIcon from '../../assets/icons/checkMark.svg';

const MainPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);

    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Header />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon} /> : null}
            </div>
            <Slider />
            <div className='container'>
                <div className='wrapper'>
                    <div className='title'>Shop The Most Popular</div>
                    <Link to='/shop' className='view-all'>
                        View All
                    </Link>
                </div>
                <JewelryCatalogPromo />
            </div>
            <Footer />
        </motion.main>
    );
};

export default MainPage;
