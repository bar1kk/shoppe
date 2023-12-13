import { Link } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Slider from '../slider/Slider';
import JewelryCatalogPromo from '../jewelryCatalog/JewelryCatalogPromo';
import nonActiveStarIcon from '../../assets/icons/nonActiveStar.svg';

const MainPage = () => {
    return (
        <>
            <Header/>
            <Slider/>
            <div className="container">
                <div className="wrapper">
                    <div className="title">Shop The Latest</div>
                    <Link to="/shop" className="view-all">View All</Link>
                </div>
                <JewelryCatalogPromo />
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
