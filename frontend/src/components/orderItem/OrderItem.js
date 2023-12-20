import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHeader } from '../../hooks/header';
import { format } from 'date-fns';

import { fetchOrders, fetchSelectedOrder } from '../userAccount/UserAccountSlice';

import './orderItem.scss';
import Spinner from '../spinner/Spinner';

const OrderItem = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const { header } = useHeader();
    const { orders, selectedOrder } = useSelector((state) => state.userAccount);

    useEffect(() => {
        dispatch(fetchOrders(header));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (isMounted.current) {
            const selectedOrder = orders.find((order) => order.id === id);
            if (!selectedOrder) {
                navigate('/404');
            } else {
                dispatch(fetchSelectedOrder(selectedOrder));
            }
        } else {
            isMounted.current = true;
        }
        // eslint-disable-next-line
    }, [orders]);

    if (Object.keys(selectedOrder).length === 0) return <Spinner />;

    const renderOrderItem = (selectedOrder) => {
        const {
            payment_method,
            delivery_option,
            total_price,
            created_at,
            order_items,
            shipping_address: { first_name, last_name, email, phone_number, country, city, street, apartment, zip_code }
        } = selectedOrder;

        const formattedDate = format(new Date(created_at), 'yyyy-MM-dd HH:mm');

        return (
            <div className='order__wrapper'>
                <div className='order__details'>
                    <h2 className='order__title'>Order Details</h2>
                    <div className='order__details-info'>
                        <div className='order__details-half'>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Order number</span>
                                <span className='order__details-value'>{id.substring(24)}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Payment method</span>
                                <span className='order__details-value'>{payment_method}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Order date</span>
                                <span className='order__details-value'>{formattedDate}</span>
                            </div>
                        </div>
                        <div className='order__details-half'>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Delivery options</span>
                                <span className='order__details-value'>{delivery_option}</span>
                            </div>
                            <div className='order__details_wrapper'>
                                <span className='order__details-title'>Delivery address</span>
                                <div>
                                    <span className='order__details-value'>
                                        {first_name} {last_name}
                                    </span>
                                    <span className='order__details-value'>
                                        {' '}
                                        {email} {phone_number}
                                    </span>
                                    <span className='order__details-value'>
                                        {apartment} {street}
                                    </span>
                                    <span className='order__details-value'>
                                        {city} {zip_code}
                                    </span>
                                    <span className='order__details-value'>{country}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='order__summary'>
                    <h2 className='order__title'>Order Summary</h2>
                    <div className='order__summary-wrapper'>
                        <div className='order__summary-header-wrapper'>
                            <span className='order__summary-header'>Product</span>
                            <span className='order__summary-header'>Total</span>
                        </div>
                        {order_items.map(({ quantity, product: { id, name, price } }) => (
                            <div className='order__summary-item-wrapper' key={id}>
                                <span className='order__summary-item-name'>
                                    {name} <span className='order__item-quantity'>× {quantity}</span>
                                </span>
                                <span className='order__summary-item-price'>$ {quantity * price}</span>
                            </div>
                        ))}

                        <div className='order__summary_calcul'>
                            <span className='order__summary-calcul-name'>Subtotal</span>
                            <span className='order__summary-item-price'>$ {total_price}</span>
                        </div>
                        <div className='order__summary_calcul'>
                            <span className='order__summary-calcul-name'>Shipping</span>
                            <span className='order__summary-item-price'>Free shipping</span>
                        </div>
                        <div className='order__summary_footer-wrapper'>
                            <span className='order__summary-footer'>Total</span>
                            <span className='order__summary-footer'>$ {total_price}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const orderItem = renderOrderItem(selectedOrder);

    return (
        <div className='order'>
            <div className='container'>{orderItem}</div>
        </div>
    );
};

export default OrderItem;
