import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';

import { setNotificationText, activateNotification } from '../notification/NotificationSlice';

import Notification from '../notification/Notification';
import sendIcon from '../../assets/icons/send.svg';
import checkMarkIcon from '../../assets/icons/checkMark.svg';
import './footer.scss';

const Footer = () => {
    const dispatch = useDispatch();

    const { notificationStatus } = useSelector((state) => state.notification);

    const PUBLIC_KEY = 'UADwziFQWVeoyD7Bg';
    const SERVICE_ID = 'service_33fsfm5';
    const TEMPLATE_ID = 'template_yveiy59';

    useEffect(() => emailjs.init(PUBLIC_KEY), []);

    const handleSandEmail = (values, resetForm) => {
        emailjs
            .send(SERVICE_ID, TEMPLATE_ID, {
                recipient: values.email
            })
            .then((res) => {
                const successMessage = 'Thank you for subscribing to our newsletter!';
                dispatch(setNotificationText(successMessage));
            })
            .catch((err) => {
                const errorMessage = 'Something went wrong, please try again.';
                dispatch(setNotificationText(errorMessage));
            })
            .finally(() => {
                dispatch(activateNotification());
                resetForm({ values: '' });
            });
    };

    const renderForm = () => {
        return (
            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required')
                })}
                onSubmit={(values, { resetForm }) => {
                    handleSandEmail(values, resetForm);
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <div>
                            <Field name='email'>
                                {({ field, meta }) => (
                                    <>
                                        <div className='footer-input-row'>
                                            <input
                                                type='text'
                                                {...field}
                                                placeholder='Give a email, get the newsletter.'
                                                className='footer__input'
                                            />
                                            <button type='submit' disabled={isSubmitting}>
                                                <img src={sendIcon} alt='' />
                                            </button>
                                        </div>
                                        {meta.touched && meta.error && <div className='error'>{meta.error}</div>}
                                    </>
                                )}
                            </Field>
                        </div>
                    </Form>
                )}
            </Formik>
        );
    };

    return (
        <footer className='footer'>
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon} /> : null}
            </div>
            <div className='container'>
                <div className='footer__line'></div>
                <div className='footer__wrapper'>
                    <nav>
                        <ul>
                            <li>
                                <NavLink
                                    to={'/contact-us'}
                                    className={({ isActive }) =>
                                        [isActive ? 'footer__link-active' : 'footer__link'].join(' ')
                                    }>
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/terms-of-use'}
                                    className={({ isActive }) =>
                                        [isActive ? 'footer__link-active' : 'footer__link'].join(' ')
                                    }>
                                    Term of services
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    {renderForm()}
                </div>
                <div className='footer__wrapper'>
                    <div className='footer__text'>
                        © 2021 Shelly. <Link to={'/terms-of-use'}>Terms of use</Link> and{' '}
                        <Link to={'/privacy-policy'}>privacy policy</Link>.
                    </div>
                    <div className='footer__links'></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
