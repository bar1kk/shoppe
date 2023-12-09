import Header from '../../header/Header';
import Footer from '../../footer/Footer';
import JewelryFilterBar from '../../jewelryFilterBar/JewelryFilterBar';

import './shop.scss';

const Shop = () => {
    return (
        <>
            <Header line={true}/>
            <div className="container">
                <div className='shop__wrapper'>
                    <JewelryFilterBar />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Shop;