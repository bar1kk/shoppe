import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import "./page404.scss";

const Page404 = () => {
    return(
        <motion.main
            className='main__container'
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }}>
        <Header line={true}/>
        <div className="errorPage">
            <div className="container">
                <h2 className="errorPage__title">404 ERROR</h2>
                <div className="errorPage__description">This page not found; <br /> back to home and start again</div>
                <Link to='/'>
                    <button className="errorPage__button">Homepage</button>
                </Link>
            </div>
        </div>
        <Footer/>
    </motion.main>
    );
}

export default Page404;