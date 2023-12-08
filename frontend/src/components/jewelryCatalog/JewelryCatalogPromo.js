import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromoGoods } from './JewelryCatalogSlice';

import './jewelryCatalog.scss';
import JewelryItemPromo from '../jewelryItem/JewelryItemPromo';
import Spinner from '../spinner/Spinner';

const JewelryCatalogPromo = () => {
    const { promoGoods, goodsLoadingStatus } = useSelector((state) => state.goods);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPromoGoods());
        //eslint-disable-next-line
    }, []);

    if (goodsLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (goodsLoadingStatus === 'error') {
        return <h5 className='no-results-message'>An error occurred while loading the data</h5>;
    }

    const renderCatalog = (goods) => {
        const goodsList = goods.map((item) => {
            return <JewelryItemPromo name={item.name} price={item.price} imagePath={item.imagePath.main} key={item.id} id={item.id} />;
        });
        return goodsList;
    };

    const promGoodsList = renderCatalog(promoGoods);

    return (
        <div className='catalog'>
            
            <div className='catalog__wrapper'>{promGoodsList}</div>
        </div>
    );
};

export default JewelryCatalogPromo;
