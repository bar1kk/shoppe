import { useAuthHeader } from 'react-auth-kit';
import { useSelector, useDispatch } from 'react-redux';

import './userAccount.scss';
import { useEffect } from 'react';
import { addedUserHeader, changeFilter } from './UserAccountSlice';

const UserAccount = () => {
    const { filter } = useSelector((state) => state.userAccount);
    const dispatch = useDispatch();
    const authHeader = useAuthHeader();

    useEffect(() => {
        // dispatch(addedUserHeader(authHeader));
        dispatch(changeFilter('dashboard'));
    }, []);

    const onChangeFilter = (filter) => {
        dispatch(changeFilter(filter));
    };

    return (
        <div className='account'>
            <div className='container'>
                <div className='account__title'>
                    <h1>My Account</h1>
                </div>
                <div className='account__nav'>
                    <ul className='account__nav-wrapper'>
                        <li>
                            <a
                                href='#!'
                                onClick={() => onChangeFilter('dashboard')}
                                className={
                                    filter === 'dashboard'
                                        ? 'account__nav-link account__nav-active'
                                        : 'account__nav-link'
                                }>
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a href='#!'
                            onClick={() => onChangeFilter('orders')}
                            className={
                                filter === 'orders'
                                    ? 'account__nav-link account__nav-active'
                                    : 'account__nav-link'
                            }
                            >Orders</a>
                        </li>
                        <li>
                            <a href='#!'
                            onClick={() => onChangeFilter('addresses')}
                            className={
                                filter === 'addresses'
                                    ? 'account__nav-link account__nav-active'
                                    : 'account__nav-link'
                            }
                            >Addresses</a>
                        </li>
                        <li>
                            <a href='#!'
                            onClick={() => onChangeFilter('details')}
                            className={
                                filter === 'details'
                                    ? 'account__nav-link account__nav-active'
                                    : 'account__nav-link'
                            }
                            >Account details</a>
                        </li>
                        <li>
                            <a href='#!'
                            onClick={() => onChangeFilter('logout')}
                            className={
                                filter === 'logout'
                                    ? 'account__nav-link account__nav-active'
                                    : 'account__nav-link'
                            }
                            >Logout</a>
                        </li>
                    </ul>
                    <div className='account__nav-line'></div>
                    
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
