import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAddresses,
    fetchSelectedAddress,
    addedNewOrder,
    resetSelectedAddress
} from '../userAccount/UserAccountSlice';
import { resetOrderedGoods } from '../jewelryCatalog/JewelryCatalogSlice';
import { showNotification } from '../notification/NotificationSlice';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../../hooks/http.hook';

import './checkout.scss';
import payPalIcon from '../../assets/icons/paypal.svg';

const Checkout = () => {
    const { addresses, selectedAddress } = useSelector((state) => state.userAccount);
    const { orderedGoods } = useSelector((state) => state.goods);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const navigate = useNavigate();

    const currentDate = new Date();
    const formattedDate = format(currentDate, 'd MMM, yyyy');

    const subTotal = orderedGoods.reduce((acc, { counter, price }) => acc + counter * price, 0);

    useEffect(() => {
        dispatch(fetchAddresses());
        // eslint-disable-next-line
    }, []);

    const handleSelectedAddress = (id) => {
        const selectedAddress = addresses.find((address) => address.id === id);
        dispatch(fetchSelectedAddress(selectedAddress));
    };

    const handlePlaceOrder = () => {
        if (Object.keys(selectedAddress).length === 0) {
            window.scrollTo(0, 0);
            dispatch(showNotification(true));
            setTimeout(() => {
                dispatch(showNotification(false));
            }, 2000);
            return;
        }

        const boughtGoods = orderedGoods.map(({ id, name, counter, price }) => {
            return {
                id: id,
                name: name,
                price: price,
                quantity: counter,
                total: counter * price
            };
        });

        const order = {
            id: uuidv4(),
            details: {
                date: formattedDate,
                status: 'Processing',
                paymentMethod: 'Cash on delivery',
                deliveryOptions: 'Standard Delivery',
                deliveryAddress: selectedAddress
            },
            summary: {
                goods: boughtGoods,
                subTotal,
                shippingCost: 0,
                totalPrice: subTotal
            }
        };
        request('http://localhost:3001/orders', 'POST', JSON.stringify(order))
            .then((data) => {
                dispatch(addedNewOrder(order));
                dispatch(resetSelectedAddress());
                navigate(`/order/${order.id}`);
                dispatch(showNotification(true));
                dispatch(resetOrderedGoods());
                setTimeout(() => {
                    dispatch(showNotification(false));
                }, 2000);
            })
            .catch((err) => console.log(err));
    };

    const renderAddresses = (addresses) => {
        if (addresses.length === 0) return <div style={{ marginTop: '10px' }}>You have not set up address yet.</div>;
        return addresses.map(({ id, fullName, contactsItem, localAddress, regionAddress, country }) => {
            return (
                <div
                    className={`checkout__address-item ${
                        selectedAddress.id === id ? 'checkout__address-item-selected' : ''
                    }`}
                    key={id}
                    onClick={() => handleSelectedAddress(id)}>
                    <span>{fullName}</span>
                    <span>{contactsItem}</span>
                    <span>{localAddress}</span>
                    <span>{regionAddress}</span>
                    <span>{country}</span>
                </div>
            );
        });
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
                                    <label htmlFor='cash'>PayPal <img src={payPalIcon} alt="paypal icon" /></label>
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
