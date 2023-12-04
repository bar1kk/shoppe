import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../header/Header';
import Footer from '../footer/Footer';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Header line={true}/>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
