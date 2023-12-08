import Footer from '../../footer/Footer';
import Header from '../../header/Header';
import UserAccount from '../../userAccount/UserAccount';

const UserPage = () => {
    return (
        <>
            <Header line={true} />
            <UserAccount />
            <Footer />
        </>
    );
}

export default UserPage;