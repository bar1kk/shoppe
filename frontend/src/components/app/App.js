import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import AuthorizationPage from '../pages/authorizationPage/AuthorizationPage';
import UserPage from '../pages/UserPage';
import PrivateRoute from '../privateRoute/PrivateRoute';
import ShopPage from '../pages/shopPage/ShopPage';
import SelectedOrderPage from '../pages/SelectedOrderPage';
import UnloadListener from '../unloadListener/UnloadListener';
import SelectedItemPage from '../pages/SelectedItemPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import Page404 from '../pages/Page404/Page404';
import ContactUsPage from '../pages/ContactUsPage';
import AboutPage from '../pages/AboutPage';


const App = () => {

    return (
        
        <Router>
            <UnloadListener />
            <div className='App'>
                <Routes>
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
                </Routes>
            </div>
        </Router>
    );
};

export default App;
