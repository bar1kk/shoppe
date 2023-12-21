import { motion } from 'framer-motion';

import Header from '../header/Header';
import Footer from '../footer/Footer';
import PrivacyPolicy from '../privacyPolicy/PrivacyPolicy';

const PrivacyPolicyPage = () => {
    return (
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
            <Header line={true} />
            <PrivacyPolicy />
            <Footer />
        </motion.main>
    );
};

export default PrivacyPolicyPage;
