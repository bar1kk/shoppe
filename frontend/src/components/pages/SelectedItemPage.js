import { useSelector } from 'react-redux';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import Notification from '../notification/Notification';
import ItemInfoSection from '../selectedItem/itemInfoSection/ItemInfoSection';

import checkMarkIcon from '../../assets/icons/checkMark.svg';

const SelectedItemPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    const notificationText = 'Item added to your Shopping bag!';
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon} text={notificationText} /> : null}
            </div>
            <ItemInfoSection />
            <Footer />
        </>
    );
};

export default SelectedItemPage;
