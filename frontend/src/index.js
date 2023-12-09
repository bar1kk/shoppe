import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from 'react-auth-kit';

import './styles/style.scss';
import App from './components/app/App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <AuthProvider
            authType={'cookie'}
            authName={'_auth'}
            cookieDomain={window.location.hostname}
            cookieSecure={window.location.protocol === 'https:'}>
            {/* <React.StrictMode> */}
                <App />
            {/* </React.StrictMode> */}
        </AuthProvider>
    </Provider>
);
