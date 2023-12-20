import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Notification from '../notification/Notification';
import ItemInfoSection from '../selectedItem/itemInfoSection/ItemInfoSection';
import ItemInfoNav from '../selectedItem/itemInfoNav/ItemInfoNav';
import SimilarItems from '../selectedItem/similarItems/SimilarItems';

import checkMarkIcon from '../../assets/icons/checkMark.svg';

const SelectedItemPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon} link={true} /> : null}
            </div>
            <ItemInfoSection />
            <ItemInfoNav />
            <SimilarItems />
            <Footer />
        </motion.main>
    );
};

export default SelectedItemPage;
