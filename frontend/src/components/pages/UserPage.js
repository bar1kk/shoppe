import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import UserAccount from '../userAccount/UserAccount';
import Notification from '../notification/Notification';

import cancelMarkIcon from '../../assets/icons/cancelMark.svg';

const UserPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()
    const { notificationStatus } = useSelector((state) => state.notification);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated()]);

    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={cancelMarkIcon} /> : null}
            </div>
            <UserAccount />
            <Footer />
        </>
    );
};

export default UserPage;
