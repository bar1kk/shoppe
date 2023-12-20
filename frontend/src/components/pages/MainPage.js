import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Slider from '../slider/Slider';
import JewelryCatalogPromo from '../jewelryCatalog/JewelryCatalogPromo';

const MainPage = () => {
    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Header/>
            <Slider/>
            <div className="container">
                <div className="wrapper">
                    <div className="title">Shop The Most Popular</div>
                    <Link to="/shop" className="view-all">View All</Link>
                </div>
                <JewelryCatalogPromo />
            </div>
            <Footer />
        </motion.main>
    );
};

export default MainPage;
