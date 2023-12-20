import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

import UnloadListener from '../unloadListener/UnloadListener';
import ScrollToTop from '../scrollToTop/ScrollToTop';

import MainPage from '../pages/MainPage';
import AuthorizationPage from '../pages/authorizationPage/AuthorizationPage';
import UserPage from '../pages/UserPage';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ShopPage from '../pages/shopPage/ShopPage';
import SelectedOrderPage from '../pages/SelectedOrderPage';
import SelectedItemPage from '../pages/SelectedItemPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import Page404 from '../pages/Page404/Page404';
import ContactUsPage from '../pages/ContactUsPage';
import AboutPage from '../pages/AboutPage';
import TermsOfUse from '../pages/TermsOfUsePages';

const App = () => {
    const location = useLocation();
    return (
        <>
            <UnloadListener />
            <ScrollToTop />
            <div className='App'>
            <AnimatePresence wait>
                <Routes location={location} key={location.pathname}>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/auth'} element={<AuthorizationPage />} />
                    <Route path={'/user'} element={<PrivateRoute Component={UserPage} />} />
                    <Route path={'/user/order/:id'} element={<SelectedOrderPage />} />
                    <Route path={'/shop'} element={<ShopPage />} />
                    <Route path={'/shop/:id'} element={<SelectedItemPage />} />
                    <Route path={'/order/:id'} element={<SelectedOrderPage />} />
                    <Route path={'/cart'} element={<CartPage />} />
                    <Route path={'/cart/checkout'} element={<PrivateRoute Component={CheckoutPage} />} />
                    <Route path={'*'} element={<Page404 />} />
                    <Route path={'/contact'} element={<ContactUsPage />} />
                    <Route path={'/about'} element={<AboutPage />} />
                    <Route path={'/terms'} element={<TermsOfUse />} />
                </Routes>
                </AnimatePresence>
            </div>
        </>
    );
};

export default App;
