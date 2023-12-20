import { useSelector } from 'react-redux';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import OrderItem from '../orderItem/OrderItem';
import Notification from '../notification/Notification';

import checkMarkIcon from '../../assets/icons/checkMark.svg';

const SelectedOrderPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
   
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon}/> : null}
            </div>
            <OrderItem />
            <Footer />
        </>
    );
};

export default SelectedOrderPage;
