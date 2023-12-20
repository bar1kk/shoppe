import { useSelector } from "react-redux";

import Notification from "../notification/Notification";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ContactUs from "../contactUs/ContactUs";
import checkMarkIcon from "../../assets//icons/checkMark.svg";

const ContactUsPage = () => {
    const { notificationStatus } = useSelector((state) => state.notification);
        
    return (
        <>
            <Header line={true} />
            <div className='shop__notification'>
                {notificationStatus ? <Notification icon={checkMarkIcon}/> : null}
            </div>
            <ContactUs />
            <Footer />
        </>
    );
}

export default ContactUsPage;