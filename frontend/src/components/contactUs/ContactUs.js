import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHttp } from '../../hooks/http.hook';

import { setNotificationText, activateNotification } from '../notification/NotificationSlice';

import './contactUs.scss';
import { TextInput, TextareaInput } from '../authorization/Authorization';

const ContactUs = () => {
    const dispatch = useDispatch();
    const { request } = useHttp();

    const handleSubmit = (values) => {
        request('http://localhost:9122/api/v1/user/feedback', 'POST', JSON.stringify(values))
            .then(() => {
                const successMessage = 'Your message has been sent successfully';
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
        <div className='contact'>
            <div className='contact__wrapper'>
                <h2 className='contact__tittle'>Contact Us</h2>
                <div className='contact__description'>
                    Say Hello send us your thoughts about our products or share your ideas with our Team!
                </div>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        subject: '',
                        message: ''
                    }}
                    validationSchema={Yup.object({
                        firstName: Yup.string().required('Required field'),
                        lastName: Yup.string().required('Required field'),
                        email: Yup.string().email('Invalid email address').required('Required field'),
                        subject: Yup.string().min(5, 'Must be 5 characters or more').required('Required field'),
                        message: Yup.string().min(10, 'Must be 10 characters or more').required('Required field')
                    })}
                    onSubmit={(values, { resetForm }) => {
                        handleSubmit(values);
                        resetForm({ values: '' });
                    }}>
                    {({ isSubmitting }) => (
                        <Form>
                            <div className='contact__form-info'>
                                <TextInput
                                    id='firstName'
                                    name='firstName'
                                    type='text'
                                    placeholder='First name'
                                    className='contact__form-input'
                                />

                                <TextInput
                                    id='lastName'
                                    name='lastName'
                                    type='text'
                                    placeholder='Last name'
                                    className='contact__form-input'
                                />
                            </div>
                            <div className='contact__form-info'>
                                <TextInput
                                    id='email'
                                    name='email'
                                    type='text'
                                    placeholder='Email'
                                    className='contact__form-input'
                                />
                                <TextInput
                                    id='subject'
                                    name='subject'
                                    type='text'
                                    placeholder='Subject'
                                    className='contact__form-input'
                                />
                            </div>
                            <div className='contact__form-message'>
                                <TextareaInput
                                    id='message'
                                    name='message'
                                    type='text'
                                    placeholder='Message'
                                    className='form__textarea'
                                    rows={1}
                                />
                            </div>
                            <button type='submit' className='contact__submit-button' disabled={isSubmitting}>
                                Send Message
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ContactUs;
