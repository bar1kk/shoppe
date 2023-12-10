import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrders } from '../UserAccountSlice';
import { Link } from 'react-router-dom';

import './orders.scss';
import Spinner from '../../spinner/Spinner';

const Orders = () => {
    const { orders, ordersLoadingStatus } = useSelector((state) => state.userAccount);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
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
                  {orders.map(({id, details:{date, status}, summary:{totalPrice}}) => (
                    <div className="orders__item" key={id}>
                        <div className='orders__item-wrapper' >
                          <span>{id}</span>
                          <span>{date}</span>
                          <span>{status}</span>
                          <span>$ {totalPrice}</span>
                          <Link className='orders__item-link' to={`order/${id}`}>
                            View Order
                          </Link>
                        </div>
                        <div className='orders__item-line'></div>
                    </div>
                    
                  ))}
                  </>
              );
        }
    };

    const ordersList = renderOrdersList(orders);

    if(ordersLoadingStatus === 'loading') {
        return <Spinner />
    }else if (ordersLoadingStatus === 'error') {
        return  <h5 className='no-results-message'>An error occurred while loading the data</h5>
    }

    return <div className='orders__wrapper'>{ordersList}</div>;
};

export default Orders;
