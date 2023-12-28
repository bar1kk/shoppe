import { useDispatch } from 'react-redux';
import { setNotificationText, activateNotification } from '../../notification/NotificationSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../../hooks/http.hook';
import { useNavigate } from 'react-router-dom';
import { useSignIn } from 'react-auth-kit';

import PasswordInput from '../../inputFields/passwordInput/PasswordInput'
import TextInput from '../../inputFields/textInput/TextInput';

const Login = () => {
    const navigate = useNavigate();
    const { request } = useHttp();
    const signIn = useSignIn();
    const dispatch = useDispatch();

    const handleLogin = (values) => {
        const userData = { email: values.email, password: values.password };
        request('http://localhost:9122/api/v1/auth/login', 'POST', JSON.stringify(userData))
            .then((data) => {
                if (
                    signIn({
                        token: data.token,
                        expiresIn: 30,
                        tokenType: 'Bearer',
                        authState: { email: values.email, rememberMe: values.rememberMe }
                    })
                ) {
                    navigate(-1);
                }
            })
            .catch((err) => {
                const errorMessage = 'Invalid email or password! Please try again! Error: ' + err.message;
                dispatch(setNotificationText(errorMessage));
                dispatch(activateNotification());
            });
    };

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
                    password: Yup.string().required('Required field'),
                    rememberMe: Yup.boolean()
                })}
                onSubmit={(values, { resetForm }) => {
                    handleLogin(values);
                    resetForm({ values: '' });
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
        </>
    );
};

export default Login;