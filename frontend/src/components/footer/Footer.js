import { NavLink, Link } from 'react-router-dom';
import { Form, Field, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';

import { setNotificationText, activateNotification } from '../notification/NotificationSlice';

import sendIcon from '../../assets/icons/send.svg';
import './footer.scss';

const Footer = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleSandEmail = (values, resetForm) => {
        request(`http://localhost:9122/api/v1/subscribe?email=${values.email}`, 'POST')
            .then((res) => {
                const successMessage = 'Thank you for subscribing to our newsletter!';
                dispatch(setNotificationText(successMessage));
            })
            .catch((err) => {
                const errorMessage = 'Something went wrong, please try again.';
                dispatch(setNotificationText(errorMessage));
            })
            .finally(() => {
                window.scrollTo(0, 0);
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
                        © 2023 BarbarBilyi. <Link to={'/terms-of-use'}>Terms of use</Link> and{' '}
                        <Link to={'/privacy-policy'}>privacy policy</Link>.
                    </div>
                    <div className='footer__links'></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
