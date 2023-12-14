import Header from '../header/Header';
import Footer from '../footer/Footer';
import Checkout from '../checkout/Checkout';

const CheckoutPage = () => {
    return (
        <>
            <Header line={true} />
            <Checkout />
            <Footer />
        </>
    );
}

export default CheckoutPage;