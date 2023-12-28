import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';
import { motion } from 'framer-motion';

import Footer from '../footer/Footer';
import Header from '../header/Header';
import UserAccount from '../userAccount/UserAccount';
import Notification from '../notification/Notification';

const UserPage = () => {
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const { notificationStatus } = useSelector((state) => state.notification);

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated()]);

    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification/> : null}
            </div>
            <UserAccount />
            <Footer />
        </motion.main>
    );
};

export default UserPage;
