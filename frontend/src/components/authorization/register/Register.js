import { useDispatch } from 'react-redux';
import { setNotificationText, activateNotification } from '../../notification/NotificationSlice';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../../hooks/http.hook';

import PasswordInput from '../../inputFields/passwordInput/PasswordInput';
import TextInput from '../../inputFields/textInput/TextInput';

const Register = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleRegister = (values) => {
        const data = { email: values.email, password: values.password };
        request('http://localhost:9122/api/v1/auth/registration', 'POST', JSON.stringify(data))
            .then((res) => {
                const successMessage = 'You have successfully registered!';
                dispatch(setNotificationText(successMessage));
            })
            .catch((err) => {
                const errorMessage = 'Something went wrong, please try again later! Error: ' + err.message;
                dispatch(setNotificationText(errorMessage));
            })
            .finally(() => {
                dispatch(activateNotification());
            });
    };

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
                handleRegister(values);
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

export default Register;
