import { Link } from 'react-router-dom';

import './notification.scss';

const Notification = (props) => {
    return (
        <div className='notification'>
            <div className='container'>
                <div className='notification__wrapper'>
                    <div className='notification__info'>
                        <div className='notification__img'>
                            <img src={props.icon} alt="check mark icon" />
                        </div>
                        <div className='notification__text'>{props.text}</div>
                    </div>
                    {props.link === true ? (<Link to="/cart" className="notification__link">VIEW CART</Link>) : null}
                </div>
            </div>
        </div>
    );
};

export default Notification;
