import { useSelector } from 'react-redux';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Checkout from '../checkout/Checkout';

import Notification from '../notification/Notification';
import cancelMarkIcon from '../../assets/icons/cancelMark.svg';

const CheckoutPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={cancelMarkIcon}/> : null}
            </div>
            <Checkout/>
            <Footer />
        </>
    );
}

export default CheckoutPage;