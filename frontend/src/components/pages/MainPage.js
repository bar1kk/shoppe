import { Link } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Slider from '../slider/Slider';

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
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
