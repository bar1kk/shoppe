import {useSelector} from 'react-redux';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import UserAccount from '../userAccount/UserAccount';
import Notification from '../notification/Notification';

import cancelMarkIcon from '../../assets/icons/cancelMark.svg';

const UserPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                    {notificationStatus ? (
                        <Notification icon={cancelMarkIcon} />
                    ) : null}
                </div>
            <UserAccount />
            <Footer />
        </>
    );
}

export default UserPage;