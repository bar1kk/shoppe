import { useSelector } from "react-redux";

import Notification from "../notification/Notification";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ContactUs from "../contactUs/ContactUs";
import checkMarkIcon from "../../assets//icons/checkMark.svg";

const ContactUsPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
    const notificationText = 'Your message has been sent successfully!';
    
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon} text={notificationText}/> : null}
            </div>
            <ContactUs />
            <Footer />
        </>
    );
}

export default ContactUsPage;