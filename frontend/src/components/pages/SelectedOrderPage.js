import Header from '../header/Header';
import Footer from '../footer/Footer';
import OrderItem from '../orderItem/OrderItem';

const SelectedOrderPage = () => {
    return (
        <>
            <Header line={true} />
            <OrderItem />
            <Footer />
        </>
    );
};

export default SelectedOrderPage;
