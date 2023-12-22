import { useField } from 'formik';
import { useState } from 'react';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './passwordInput.scss';

const PasswordInput = ({ ...props }) => {
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

export default PasswordInput;