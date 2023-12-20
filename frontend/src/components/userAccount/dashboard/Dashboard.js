import './dashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserAccount } from '../UserAccountSlice';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = ({ onChangeFilter }) => {
    const { profile } = useSelector((state) => state.userAccount);
    const dispatch = useDispatch();
    const signOut = useSignOut();
    const navigate = useNavigate();

    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <div className='dashboard__wrapper'>
                <p>
                    Hello {profile.first_name} {profile.last_name} (not {profile.first_name} ?{' '}
                    <span
                        onClick={() => {
                            signOut();
                            dispatch(resetUserAccount());
                            navigate('/');
                        }}
                        className='dashboard__link'>
                        Log out
                    </span>
                    )
                    <br />
                    From your account dashboard you can view your{' '}
                    <span onClick={() => onChangeFilter('orders')} className='dashboard__link'>
                        recent orders
                    </span>
                    , manage your{' '}
                    <span onClick={() => onChangeFilter('addresses')} className='dashboard__link'>
                        shipping addresses
                    </span>
                    , and edit your{' '}
                    <span onClick={() => onChangeFilter('details')} className='dashboard__link'>
                        password and account details
                    </span>
                    .
                </p>
            </div>
        </motion.main>
    );
};

export default Dashboard;
