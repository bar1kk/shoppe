import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import './footer.scss';
import sendIcon from '../../assets/icons/send.svg';

const Footer = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInput = () => {
        console.log(inputValue);
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
                                    to={'/contact'}
                                    className={({ isActive }) =>
                                        [isActive ? 'footer__link-active' : 'footer__link'].join(' ')
                                    }>
                                    Contact
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={'/terms'}
                                    className={({ isActive }) =>
                                        [isActive ? 'footer__link-active' : 'footer__link'].join(' ')
                                    }>
                                    Term of services
                                </NavLink>
                            </li>
                        </ul>
                    </nav>

                    <div className='footer-input-row'>
                        <input
                            onChange={(e) => setInputValue(e.target.value)}
                            type='text'
                            placeholder='Give a email, get the nenwsletter.'
                            className='footer__input'
                        />
                        <span onClick={handleInput}>
                            <img src={sendIcon} alt='' />
                        </span>
                    </div>
                </div>
                <div className='footer__wrapper'>
                    <div className='footer__text'>
                        <span className='footer__text-black'>© 2021 Shelly.</span> Terms of use{' '}
                        <span className='footer__text-black'>and</span> privacy policy.
                    </div>
                    <div className='footer__links'></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
