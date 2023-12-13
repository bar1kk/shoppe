import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from 'react';
import { changeFilter } from '../SelectedItemSlice';

import AdditionalInfo from './additionalInfo/AdditionalInfo';
import Reviws from './reviews/Reviews';
import './itemInfoNav.scss';

const ItemInfoNav = () => {
    const {filter, selectedItemId} = useSelector(state => state.item);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeFilter('additionalInfo'));
        // eslint-disable-next-line
    }, []);
    
    const onChangeFilter = (filter) => {
        dispatch(changeFilter(filter));
    }

    return (
        <div className="item-nav">
        <div className="container">
            <ul className="item-nav__wrapper">
                <li><a href="#!" onClick={() => onChangeFilter('additionalInfo')} className={filter === 'info' ? 'item-nav__link item-nav-active' : 'item-nav__link'}>Aditional information</a></li>
                <li><a href="#!" onClick={() => onChangeFilter('reviews')} className={filter === 'reviews' ? 'item-nav__link item-nav-active' : 'item-nav__link'}>Reviews({selectedItemId.reviews ? selectedItemId.reviews.length : 0})</a></li>
            </ul>
            <div className="nav__line"></div>
            {filter === 'additionalInfo' ? <AdditionalInfo /> : null}
            {filter === 'reviews' ? <Reviws/> : null}
        </div>
    </div>
    );
};

export default ItemInfoNav;