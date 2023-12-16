import { useSelector } from 'react-redux';

import Authorization from '../../authorization/Authorization';
import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import Notification from '../../notification/Notification';
import cancelMarkIcon from '../../../assets/icons/cancelMark.svg';

const AuthorizationPage = () => {
    const {notificationStatus} = useSelector(state => state.notification);
    const notificationText = 'Invalid email or password! Please try again!';

    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>{ notificationStatus ? <Notification icon={cancelMarkIcon} text={notificationText} /> : null}</div>
            <Authorization />
            <Footer />
        </>
    );
};
  
export default AuthorizationPage;
