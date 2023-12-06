import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from '../pages/MainPage';
import AuthorizationPage from '../pages/authorizationPage/AuthorizationPage';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Routes>
                    <Route path={'/'} element={<MainPage />} />
                    <Route path={'/auth'} element={<AuthorizationPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
