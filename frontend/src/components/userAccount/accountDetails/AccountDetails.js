import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHeader } from '../../../hooks/header';
import { useHttp } from '../../../hooks/http.hook';

import { showNotification } from '../../notification/NotificationSlice';
import { changeProfile } from '../UserAccountSlice';

import './accountDetails.scss';
import cancelMarkIcon from '../../../assets/icons/cancelMark.svg';
import { TextInput, PasswordInput } from '../../authorization/Authorization';
import Notification from '../../notification/Notification';

const AccountDetails = () => {
    const { request } = useHttp();
    const dispatch = useDispatch();
    const { notificationStatus } = useSelector((state) => state.notification);
    const badPasswordText = 'Current password is incorrect! Please try again.';
    const { header } = useHeader();

    const handleChangeDetails = (values) => {
        const data = { first_name: values.firstName, last_name: values.lastName };
        if (values.phoneNumber.length !== 0) {
            data.phone_number = values.phoneNumber;
        }

        request('http://localhost:9122/api/v1/user/details', 'PUT', JSON.stringify(data), header)
            .then((res) => {
                dispatch(changeProfile(res));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleChangePassword = (values) => {
        const data = { old_password: values.currentPassword, new_password: values.newPassword };

        request('http://localhost:9122/api/v1/user/change-password', 'PUT', JSON.stringify(data), header)
            .then((res) => {})
            .catch((err) => {
                console.log(err);
                dispatch(showNotification(true));
                setTimeout(() => {
                    dispatch(showNotification(false));
                }, 2000);
            });
    };

    return (
        <div className='details__wrapper'>
            <div className='authorization__container'>
                <div className='details-title'>
                    <h1>Account details</h1>
                </div>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        phoneNumber: ''
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().min(1, 'Must be 1 characters or more').required('Required field'),
                        lastName: Yup.string().min(1, 'Must be 1 characters or more').required('Required field'),
                        phoneNumber: Yup.string()
                            .matches(/^\d+$/, 'Must be only numbers')
                            .min(12, 'Must be 12 numbers or more')
                    })}
                    onSubmit={(values, { resetForm }) => {
                        handleChangeDetails(values);
                        resetForm({ values: '' });
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <TextInput
                                id='firstName'
                                name='firstName'
                                type='text'
                                placeholder='First name*'
                                className='authorization__input-first authorization__input'
                            />
                            <TextInput
                                id='lastName'
                                name='lastName'
                                type='text'
                                placeholder='Last name*'
                                className='authorization__input'
                            />
                            <TextInput
                                id='phoneNumber'
                                name='phoneNumber'
                                type='text'
                                placeholder='Phone number'
                                className='authorization__input'
                            />
                            <button type='submit' className='authorization__sign-in' disabled={isSubmitting}>
                                Save changes
                            </button>
                        </Form>
                    )}
                </Formik>
                <p className='password__change-text'>Password change</p>
                <div className='shop__notification'>
                    {notificationStatus ? (
                        <Notification width={'500px'} icon={cancelMarkIcon} text={badPasswordText} />
                    ) : null}
                </div>

                <Formik
                    initialValues={{
                        currentPassword: '',
                        newPassword: '',
                        confirmNewPassword: ''
                    }}
                    validationSchema={Yup.object({
                        currentPassword: Yup.string().required('Required field'),
                        newPassword: Yup.string().min(8, 'Must be 8 characters or more').required('Required field'),
                        confirmNewPassword: Yup.string()
                            .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                            .required('Passwords must match')
                    })}
                    onSubmit={(values, { resetForm }) => {
                        handleChangePassword(values);
                        resetForm({ values: '' });
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <PasswordInput
                                id='currentPassword'
                                name='currentPassword'
                                placeholder='Current password*'
                            />
                            <PasswordInput id='newPassword' name='newPassword' placeholder='New password*' />
                            <PasswordInput
                                id='confirmNewPassword'
                                name='confirmNewPassword'
                                placeholder='Confirm new password*'
                            />
                            <button type='submit' className='authorization__sign-in' disabled={isSubmitting}>
                                Change password
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AccountDetails;
