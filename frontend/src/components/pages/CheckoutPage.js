import { useSelector } from 'react-redux';
import {useState} from 'react';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import Checkout from '../checkout/Checkout';

import Notification from '../notification/Notification';
import cancelMarkIcon from '../../assets/icons/cancelMark.svg';

const CheckoutPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    // const notificationText = 'Please select an address to place an order!';   
    const [notificationText, setNotificationText] = useState('');

    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={cancelMarkIcon} text={notificationText}/> : null}
            </div>
            <Checkout setNotificationText={setNotificationText}/>
            <Footer />
        </>
    );
}

export default CheckoutPage;