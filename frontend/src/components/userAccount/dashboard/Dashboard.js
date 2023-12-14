import './dashboard.scss';
import { useDispatch } from 'react-redux';
import { resetUserAccount } from '../UserAccountSlice';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onChangeFilter }) => {
    const dispatch = useDispatch();
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();

    return (
        <div className='dashboard__wrapper'>
            <p>
                Hello {auth().email} (not {auth().email}?{' '}
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
    );
};

export default Dashboard;
