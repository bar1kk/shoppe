import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeader } from '../../../hooks/header';
import { format } from 'date-fns';

import { fetchOrders } from '../UserAccountSlice';

import './orders.scss';
import Spinner from '../../spinner/Spinner';

const Orders = () => {
    const { orders, ordersLoadingStatus } = useSelector((state) => state.userAccount);

    const { header } = useHeader();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders(header));
        // eslint-disable-next-line
    }, []);

    const renderOrdersList = (orders) => {
        if (orders.length === 0) {
            return (
                <div className='orders__empty'>
                    <span className='orders__empty-text'>No order has been made yet.</span>
                    <Link className='orders__empty-link' to={'/'}>
                        Browse Product
                    </Link>
                </div>
            );
        } else {
            return (
                <>
                    <div className='orders__header-wrapper'>
                        <span>Order Number</span>
                        <span>Date</span>
                        <span>Status</span>
                        <span>Total</span>
                        <span>Actions</span>
                    </div>
                    <div className='header__item-line'></div>
                    {orders.map(({ id, created_at, status, total_price }) => {
                        const formattedDate = format(new Date(created_at), 'yyyy-MM-dd');
                        return (
                            <div className='orders__item' key={id}>
                                <div className='orders__item-wrapper'>
                                    <span>{id.substring(24)}</span>
                                    <span>{formattedDate}</span>
                                    <span>{status}</span>
                                    <span>$ {total_price}</span>
                                    <Link className='orders__item-link' to={`order/${id}`}>
                                        View Order
                                    </Link>
                                </div>
                                <div className='orders__item-line'></div>
                            </div>
                        );
                    })}
                </>
            );
        }
    };

    const ordersList = renderOrdersList(orders);

    if (ordersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (ordersLoadingStatus === 'error') {
        return <h5 className='no-results-message'>An error occurred while loading the data</h5>;
    }

    return <div className='orders__wrapper'>{ordersList}</div>;
};

export default Orders;
