import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAddresses,
    fetchSelectedAddress,
    addedNewOrder,
    resetSelectedAddress
} from '../userAccount/UserAccountSlice';
import { resetOrderedGoods } from '../jewelryCatalog/JewelryCatalogSlice';
import { setNotificationText, activateNotification } from '../notification/NotificationSlice';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';
import { useHeader } from '../../hooks/header';

import './checkout.scss';
import payPalIcon from '../../assets/icons/paypal.svg';

const Checkout = () => {
    const { addresses, selectedAddress } = useSelector((state) => state.userAccount);
    const { orderedGoods } = useSelector((state) => state.goods);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const { header } = useHeader();
    const navigate = useNavigate();

    const subTotal = orderedGoods.reduce((acc, { counter, price }) => acc + counter * price, 0);

    useEffect(() => {
        dispatch(fetchAddresses(header));
        // eslint-disable-next-line
    }, []);

    const handleSelectedAddress = (id) => {
        const selectedAddress = addresses.find((address) => address.id === id);
        dispatch(fetchSelectedAddress(selectedAddress));
    };

    const handlePlaceOrder = () => {
        if (Object.keys(selectedAddress).length === 0) {
            window.scrollTo(0, 0);
            dispatch(setNotificationText('Please select an address to place an order!'));
            dispatch(activateNotification());
            return;
        }

        const orderItems = orderedGoods.map(({ id, counter }) => {
            return {
                product_id: id,
                quantity: counter
            };
        });

        const order = {
            payment_method_id: 1,
            delivery_option_id: 1,
            order_items: orderItems,
            shipping_address_id: selectedAddress.id
        };

        request('http://localhost:9122/api/v1/user/orders', 'POST', JSON.stringify(order), header)
            .then((data) => {
                const successMessage = 'Your order has been placed successfully!';
                dispatch(addedNewOrder(data));
                dispatch(resetSelectedAddress());
                dispatch(resetOrderedGoods());

                navigate(`/order/${data.id}`);
                dispatch(setNotificationText(successMessage));
            })
            .catch((err) => {
                const errorMessage = `An error occurred while placing your order. Please try again later. Error: ${err.message}`;
                dispatch(setNotificationText(errorMessage));
            })
            .finally(() => {
                window.scrollTo(0, 0);
                dispatch(activateNotification());
            });
    };

    const renderAddresses = (addresses) => {
        if (addresses.length === 0) return <div style={{ marginTop: '10px' }}>You have not set up address yet.</div>;
        return addresses.map(
            ({ id, first_name, last_name, email, phone_number, country, city, street, apartment, zip_code }) => {
                return (
                    <div
                        className={`checkout__address-item ${
                            selectedAddress.id === id ? 'checkout__address-item-selected' : ''
                        }`}
                        key={id}
                        onClick={() => handleSelectedAddress(id)}>
                        <span>
                            {first_name} {last_name}
                        </span>
                        <span>
                            {email} {phone_number}
                        </span>
                        <span>
                            {apartment} {street}
                        </span>
                        <span>
                            {city} {zip_code}
                        </span>
                        <span>{country}</span>
                    </div>
                );
            }
        );
    };

    const renderOrderList = (orderedGoods) => {
        return orderedGoods.map(({ name, counter, price }) => (
            <div className='order__summary-item-wrapper' key={name}>
                <span className='order__summary-item-name'>
                    {name} <span className='order__item-quantity'>× {counter}</span>
                </span>
                <span className='order__summary-item-price'>$ {counter * price}</span>
            </div>
        ));
    };

    return (
        <div className='checkout'>
            <div className='container'>
                <h2 className='checkout__title'>Checkout</h2>
                <div className='checkout__wrapper'>
                    <div className='checkout__address-section'>
                        <h3 className='checkout__subtitle'>Choose Addresss</h3>
                        {renderAddresses(addresses)}
                    </div>
                    <div className='checkout__order-section'>
                        <h3 className='checkout__subtitle'>Your order</h3>
                        <div className='order__summary-wrapper'>
                            <div className='order__summary-header-wrapper'>
                                <span className='order__summary-header'>Product</span>
                                <span className='order__summary-header'>Total</span>
                            </div>
                            {renderOrderList(orderedGoods)}
                            <div className='order__summary_calcul'>
                                <span className='order__summary-calcul-name'>Subtotal</span>
                                <span className='order__summary-item-price'>$ {subTotal}</span>
                            </div>
                            <div className='order__summary_calcul'>
                                <span className='order__summary-calcul-name'>Shipping</span>
                                <span className='order__summary-item-price'>0</span>
                            </div>
                            <div className='order__summary_footer-wrapper'>
                                <span className='order__summary-footer'>Total</span>
                                <span className='order__summary-footer'>$ {subTotal}</span>
                            </div>
                            <div className='order__summary-payment-wrapper'>
                                <div className='order__summary-payment'>
                                    <input type='radio' id='cash' name='cash' value='Cash on delivery' defaultChecked />
                                    <label htmlFor='cash'>Cash on delivery</label>
                                </div>
                                <div className='order__summary-payment'>
                                    <input
                                        type='radio'
                                        id='bank-transfer'
                                        name='bank-transfer'
                                        value='Direct bank transfer'
                                        disabled
                                    />
                                    <label htmlFor='bank-transfer'>Direct bank transfer</label>
                                    <div className='error' style={{ paddingLeft: '20px' }}>
                                        Temporarily unavailable
                                    </div>
                                </div>
                                <div className='order__summary-payment'>
                                    <input
                                        type='radio'
                                        id='check-payments'
                                        name='check-payments'
                                        value='Check payments'
                                        disabled
                                    />
                                    <label htmlFor='cash'>Check payments</label>
                                    <div className='error' style={{ paddingLeft: '20px' }}>
                                        Temporarily unavailable
                                    </div>
                                </div>
                                <div className='order__summary-payment'>
                                    <input type='radio' id='paypal' name='paypal ' value='PayPal' disabled />
                                    <label htmlFor='cash'>
                                        PayPal <img src={payPalIcon} alt='paypal icon' />
                                    </label>
                                    <div className='error' style={{ paddingLeft: '20px' }}>
                                        Temporarily unavailable
                                    </div>
                                </div>
                            </div>
                            <button onClick={handlePlaceOrder} className='checkout__order-btn'>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
