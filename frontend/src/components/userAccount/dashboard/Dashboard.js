import './dashboard.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserAccount } from '../UserAccountSlice';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ onChangeFilter }) => {
    const { profile } = useSelector((state) => state.userAccount);
    const dispatch = useDispatch();
    const signOut = useSignOut();
    const navigate = useNavigate();    

    return (
        <div className='dashboard__wrapper'>
            <p>
                Hello {profile.first_name} {profile.last_name} (not {profile.first_name} ?   
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
