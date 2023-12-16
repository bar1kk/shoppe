import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSignOut } from 'react-auth-kit';
import { useHeader } from '../../hooks/header';

import { changeFilter, resetUserAccount, fetchProfile } from './UserAccountSlice';

import './userAccount.scss';
import Dashboard from './dashboard/Dashboard';
import Orders from './orders/Orders';
import AccountDetails from './accountDetails/AccountDetails';
import Address from './address/Address';

const UserAccount = () => {
    const { filter } = useSelector((state) => state.userAccount);
    const dispatch = useDispatch();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const {header} = useHeader();

    useEffect(() => {
        dispatch(fetchProfile(header));
        dispatch(changeFilter('dashboard'));
        // eslint-disable-next-line
    }, []);

    const onChangeFilter = (filter) => {
        dispatch(changeFilter(filter));
    };

    return (
        <div className='account'>
            <div className='container'>
                {filter === 'dashboard' && (
                    <div className='account__title'>
                        <h1>My Account</h1>
                    </div>
                )}

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
                            <a
                                href='#!'
                                onClick={() => onChangeFilter('orders')}
                                className={
                                    filter === 'orders' ? 'account__nav-link account__nav-active' : 'account__nav-link'
                                }>
                                Orders
                            </a>
                        </li>
                        <li>
                            <a
                                href='#!'
                                onClick={() => onChangeFilter('addresses')}
                                className={
                                    filter === 'addresses'
                                        ? 'account__nav-link account__nav-active'
                                        : 'account__nav-link'
                                }>
                                Addresses
                            </a>
                        </li>
                        <li>
                            <a
                                href='#!'
                                onClick={() => onChangeFilter('details')}
                                className={
                                    filter === 'details' ? 'account__nav-link account__nav-active' : 'account__nav-link'
                                }>
                                Account details
                            </a>
                        </li>
                        <li>
                            <a
                                href='#!'
                                onClick={() => {
                                    onChangeFilter('logout');
                                    signOut();
                                    dispatch(resetUserAccount());
                                    navigate('/');
                                }}
                                className={'account__nav-link'}>
                                Logout
                            </a>
                        </li>
                    </ul>
                    <div className='account__nav-line'></div>
                    {filter === 'dashboard' ? <Dashboard onChangeFilter={onChangeFilter} /> : null}
                    {filter === 'orders' ? <Orders /> : null}
                    {filter === 'details' ? <AccountDetails /> : null}
                    {filter === 'addresses' ? <Address /> : null}
                </div>
            </div>
        </div>
    );
};

export default UserAccount;
