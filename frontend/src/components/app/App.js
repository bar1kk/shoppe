import { BrowserRouter as Router } from 'react-router-dom';

import Header from '../header/Header';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Header line={true}/>
            </div>
        </Router>
    );
};

export default App;
