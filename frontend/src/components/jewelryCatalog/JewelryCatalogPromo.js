import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromoGoods, fetchGoods, fetchPromoGoodsId } from './JewelryCatalogSlice';

import './jewelryCatalog.scss';
import JewelryItemPromo from '../jewelryItem/JewelryItemPromo';
import Spinner from '../spinner/Spinner';

const JewelryCatalogPromo = () => {
    const { promoGoods, promoGoodsId, goods, goodsLoadingStatus, promoGoodsLoadingStatus } = useSelector(
        (state) => state.goods
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGoods());
        dispatch(fetchPromoGoodsId());
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (promoGoodsId.length > 0 && goods.length > 0) {
            const promoGoods = promoGoodsId.map(({ id }) => {
                return goods.find((item) => item.id === id);
            });
            dispatch(fetchPromoGoods(promoGoods));
        }
        //eslint-disable-next-line
    }, [promoGoodsId, goods]);

    const renderCatalog = (items) => {
        if (items.length === 0) {
            const copyOfGoods = [...goods];
            const shuffledGoods = copyOfGoods.sort(() => Math.random() - 0.5);
            items = shuffledGoods.slice(0, 3);
        }

        const itemsList = items.map(({ id, name, price, images }) => {
            return <JewelryItemPromo name={name} price={price} imagePath={images[0]} key={id} id={id} />;
        });

        return itemsList;
    };

    if (goodsLoadingStatus === 'loading' || promoGoodsLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (goodsLoadingStatus === 'error' || promoGoodsLoadingStatus === 'error') {
        return <h5 className='no-results-message'>An error occurred while loading the data</h5>;
    }

    const promGoodsList = renderCatalog(promoGoods);

    return (
        <div className='catalog'>
            <div className='catalog__wrapper'>{promGoodsList}</div>
        </div>
    );
};

export default JewelryCatalogPromo;
