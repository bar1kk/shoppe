import './accountDetails.scss';
import { TextInput, PasswordInput } from '../../authorization/Authorization';
import * as Yup from 'yup';
import { Formik, Form, useField } from 'formik';
import { useHttp } from '../../../hooks/http.hook';
import {useAuthUser} from 'react-auth-kit'


const AccountDetails = () => {
    const { request } = useHttp();
    const auth = useAuthUser()


    return (
        <div className='details__wrapper'>
            <div className='authorization__container'>
                <div className='details-title'>
                    <h1>Account details</h1>
                </div>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: ''
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().min(1, 'Must be 1 characters or more').required('Required field'),
                        lastName: Yup.string().min(1, 'Must be 1 characters or more').required('Required field')
                    })}
                    onSubmit={(values, { resetForm }) => {
                        resetForm({ values: '' });
                        const data = { email: values.firstName, password: values.lastName };
                        request('http://localhost:3001/names', 'POST', JSON.stringify(data))
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => console.log(err));

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
                            <button type='submit' className='authorization__sign-in' disabled={isSubmitting}>
                                Save changes
                            </button>
                        </Form>
                        
                    )}
                </Formik>
                <p className='password__change-text'>Password change</p>
                <Formik
                initialValues = {{
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
                    resetForm({ values: '' });
                    const data = {currentPassword: values.currentPassword, password: values.newPassword };
                    request('http://localhost:3001/password', 'POST', JSON.stringify(data))
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => console.log(err));

                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <PasswordInput id='currentPassword' name='currentPassword' placeholder='Current password*' />
                        <PasswordInput id='newPassword' name='newPassword' placeholder='New password*' />
                        <PasswordInput id='confirmNewPassword' name='confirmNewPassword' placeholder='Confirm new password*' />
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
