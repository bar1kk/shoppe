import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../../hooks/http.hook';
import { useHeader } from '../../../hooks/header';

import { fetchAddresses, removeAddress, addedNewAddress } from '../UserAccountSlice';

import './address.scss';
import removeIcon from '../../../assets/icons/remove.svg';
import { TextInput } from '../../authorization/Authorization';

const Address = () => {
    const { addresses } = useSelector((state) => state.userAccount);
    const dispatch = useDispatch();
    const { request } = useHttp();
    const { header } = useHeader();

    useEffect(() => {
        dispatch(fetchAddresses(header));
        // eslint-disable-next-line
    }, []);

    const handleAddAddress = (values) => {
        const newAddress = {
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            phone_number: values.phoneNumber,
            country: values.country,
            city: values.city,
            street: values.street,
            apartment: values.apartment,
            zip_code: values.postcode
        };

        if (values.apartment === '') {
            delete newAddress.apartment;
        }

        request('http://localhost:9122/api/v1/user/shipping-addresses/create', 'POST', JSON.stringify(newAddress), header)
            .then((data) => {
                dispatch(addedNewAddress(data));
            })
            .catch((err) => console.log(err));
    };

    const handleRemoveAddress = (id) => {
        request(`http://localhost:9122/api/v1/user/shipping-addresses/${id}/delete`, 'DELETE', null, header)
            .then((data) => {
                dispatch(removeAddress(id));
            })
            .catch((err) => console.log(err));
    };

    const renderAddresses = (addresses) => {
        if (addresses.length === 0) return <div style={{ marginTop: '10px' }}>You have not set up address yet.</div>;
        return addresses.map(
            ({ id, first_name, last_name, email, phone_number, country, city, street, apartment, zip_code }) => {
                return (
                    <div className='address__list-item' key={id}>
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
                        <div onClick={() => handleRemoveAddress(id)} className='address__list-item-delete'>
                            <img src={removeIcon} alt='remove address' />
                        </div>
                    </div>
                );
            }
        );
    };

    const addressesList = renderAddresses(addresses);

    return (
        <div className='address'>
            <div className='address__wrapper'>
                <div className='address__details'>
                    <h2 className='address__title'>Shipping Address</h2>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            country: '',
                            city: '',
                            street: '',
                            apartment: '',
                            postcode: '',
                            phoneNumber: '',
                            email: ''
                        }}
                        validationSchema={Yup.object({
                            firstName: Yup.string().required('Required field'),
                            lastName: Yup.string().required('Required field'),
                            country: Yup.string().required('Required field'),
                            street: Yup.string().required('Required field'),
                            apartment: Yup.string().matches(/^\d+$/, 'Must be only numbers'),
                            postcode: Yup.string().required('Required field'),
                            phoneNumber: Yup.string()
                                .matches(/^\d+$/, 'Must be only numbers')
                                .length(12, 'Must be 12 numbers including country code')
                                .required('Required field'),
                            city: Yup.string().required('Required field'),
                            email: Yup.string().email('Invalid email address').required('Required field')
                        })}
                        onSubmit={(values, { resetForm }) => {
                            resetForm({ values: '' });
                            handleAddAddress(values);
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='address__details-wrapper'>
                                    <div>
                                        <TextInput
                                            id='firstName'
                                            name='firstName'
                                            type='text'
                                            placeholder='First name*'
                                            className='address__details-input'
                                        />
                                    </div>
                                    <div>
                                        <TextInput
                                            id='lastName'
                                            name='lastName'
                                            type='text'
                                            placeholder='Last name*'
                                            className='address__details-input'
                                        />
                                    </div>
                                </div>
                                <TextInput
                                    id='country'
                                    name='country'
                                    type='text'
                                    placeholder='Country*'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='street'
                                    name='street'
                                    type='text'
                                    placeholder='Street Address*'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='apartment'
                                    name='apartment'
                                    type='text'
                                    placeholder='Apartment, suite, unit etc. (optional)'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='postcode'
                                    name='postcode'
                                    type='text'
                                    placeholder='Postcode / ZIP*'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='city'
                                    name='city'
                                    type='text'
                                    placeholder='City*'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    type='text'
                                    placeholder='Phone*'
                                    className='address__details-input'
                                />
                                <TextInput
                                    id='email'
                                    name='email'
                                    type='text'
                                    placeholder='Email*'
                                    className='address__details-input'
                                />
                                <button
                                    className='address__details-submit-button'
                                    type='submit'
                                    disabled={isSubmitting}>
                                    Save Address
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='address__list'>
                    <h2 className='address__title'>Your Addresses</h2>
                    {addressesList}
                </div>
            </div>
        </div>
    );
};

export default Address;
