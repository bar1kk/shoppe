import { useDispatch, useSelector } from 'react-redux';
import { changeActiveBtn } from './AuthorizationSlice';
import { showNotification } from '../notification/NotificationSlice';
import { Formik, Form, useField } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHttp } from '../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

import './authorization.scss';

const Authorization = () => {
    const dispatch = useDispatch();
    const { activeBtn } = useSelector((state) => state.authorization);

    const loginClassName =
        activeBtn === 'login' ? 'authorization__btn authorization__btn-active' : 'authorization__btn';
    const registerClassName =
        activeBtn === 'register' ? 'authorization__btn authorization__btn-active' : 'authorization__btn';

    return (
        <div className='authorization'>
            <div className='authorization__container'>
                <h3 className='authorization__title'>My account</h3>
                <div className='authorization__wrapper'>
                    <button onClick={() => dispatch(changeActiveBtn('login'))} className={loginClassName}>
                        Sign in
                    </button>
                    <button onClick={() => dispatch(changeActiveBtn('register'))} className={registerClassName}>
                        Register
                    </button>
                </div>
                {activeBtn === 'login' ? <Login /> : <Register />}
            </div>
        </div>
    );
};

const Login = () => {
    const navigate = useNavigate();
    const { request } = useHttp();
    const signIn = useSignIn();
    const dispatch = useDispatch();
    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    rememberMe: false
                }}
                validationSchema={Yup.object({
                    email: Yup.string().email('Invalid email address').required('Required field'),
                    password: Yup.string().min(1, 'Must be 8 characters or more').required('Required field'),
                    rememberMe: Yup.boolean()
                })}
                onSubmit={(values, { resetForm }) => {
                    resetForm({ values: '' });
                    const userData = { email: values.email, password: values.password };
                    request('http://localhost:9122/api/v1/auth/login', 'POST', JSON.stringify(userData))
                        .then((data) => {
                            if (
                                signIn({
                                    token: data.token,
                                    expiresIn: 120,
                                    tokenType: 'Bearer',
                                    authState: userData
                                })
                            ) {
                                navigate('/');
                            }
                        })
                        .catch((err) => {
                            dispatch(showNotification(true));
                            setTimeout(() => {
                                dispatch(showNotification(false));
                            }, 2000); 
                        });
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <TextInput
                            id='email'
                            name='email'
                            type='text'
                            placeholder='Email'
                            className='authorization__input-first authorization__input'
                        />
                        <PasswordInput id='password' name='password' placeholder='Password' />
                        <div className='authorization__checkbox-wrapper'>
                            <TextInput
                                name='rememberMe'
                                type='checkbox'
                                id='myCheckbox'
                                className='authorization__checkbox'
                            />
                            <label htmlFor='myCheckbox' className='checkbox-label'>
                                Remember me
                            </label>
                        </div>
                        <button type='submit' className='authorization__sign-in' disabled={isSubmitting}>
                            Sign in
                        </button>
                    </Form>
                )}
            </Formik>
            <div className='authorization__link-container'>
                <a href='#!' className='authorization__link'>
                    Have you forgotten your password?
                </a>
            </div>
        </>
    );
};

const Register = () => {
    const { request } = useHttp();

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirmPassword: ''
            }}
            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required field'),
                password: Yup.string().min(8, 'Must be 8 characters or more').required('Required field'),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
                    .required('Passwords must match')
            })}
            onSubmit={(values, { resetForm }) => {
                const data = { email: values.email, password: values.password };
                request('http://localhost:9122/api/v1/auth/registration', 'POST', JSON.stringify(data))
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
                resetForm({ values: '' });
            }}>
            {({ isSubmitting }) => (
                <Form>
                    <TextInput
                        id='email'
                        name='email'
                        type='text'
                        placeholder='Email'
                        className='authorization__input authorization__input-first'
                    />
                    <PasswordInput id='password' name='password' placeholder='Password' />
                    <PasswordInput id='confirmPassword' name='confirmPassword' placeholder='Confirm password' />
                    <button type='submit' className='authorization__sign-in' disabled={isSubmitting}>
                        Register
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export const TextInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <input {...field} {...props} />
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </>
    );
};

export const PasswordInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className='password-input-container'>
                <input
                    {...field}
                    {...props}
                    type={showPassword ? 'text' : 'password'}
                    className='authorization__input'
                />
                <span className='password-toggle' onClick={togglePasswordVisibility}>
                    {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
                </span>
            </div>
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </>
    );
};

export default Authorization;
