import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoods } from './JewelryCatalogSlice';

import './jewelryCatalog.scss';
import JewelryItemPromo from '../jewelryItem/JewelryItemPromo';
import Spinner from '../spinner/Spinner';

const JewelryCatalogPromo = () => {
    const { goods, goodsLoadingStatus } = useSelector((state) => state.goods);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGoods());
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

    const goodsList = renderCatalog(goods);

    return (
        <div className='catalog' onClick={() => console.log(goods[0])}>
            
            <div className='catalog__wrapper'>{goodsList}</div>
        </div>
    );
};

export default JewelryCatalogPromo;
