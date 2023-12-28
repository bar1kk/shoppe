import { useDispatch, useSelector } from 'react-redux';
import { changeActiveBtn } from './AuthorizationSlice';

import './authorization.scss';
import Register from './register/Register';
import Login from './login/Login';

const Authorization = () => {
    const dispatch = useDispatch();
    const { activeBtn } = useSelector((state) => state.authorization);

    const loginClassName =
        activeBtn === 'login' ? 'authorization__btn authorization__btn-active' : 'authorization__btn';
    const registerClassName =
        activeBtn === 'register' ? 'authorization__btn authorization__btn-active' : 'authorization__btn';

    return (
        <div className='authorization'>
            <div className='authorization__container'>
                <h3 className='authorization__title'>My account</h3>
                <div className='authorization__wrapper'>
                    <button onClick={() => dispatch(changeActiveBtn('login'))} className={loginClassName}>
                        Sign in
                    </button>
                    <button onClick={() => dispatch(changeActiveBtn('register'))} className={registerClassName}>
                        Register
                    </button>
                </div>
                {activeBtn === 'login' ? <Login /> : <Register />}
            </div>
        </div>
    );
};

export default Authorization;
