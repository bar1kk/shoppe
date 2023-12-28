import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './notification.scss';

const Notification = (props) => {
    const { notificationText } = useSelector((state) => state.notification);
    return (
        <div className='notification'>
            <div className='container'>
                <div className='notification__wrapper'>
                    <div className='notification__info'>
                        <div className='notification__img'>
                            {props.icon ? <img src={props.icon} alt="check mark icon" />: null}
                        </div>
                        <div className='notification__text'>{notificationText}</div>
                    </div>
                    {props.link === true ? (<Link to="/cart" className="notification__link">VIEW CART</Link>) : null}
                </div>
            </div>
        </div>
    );
};

export default Notification;
