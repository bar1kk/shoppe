import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { addedGoods, plusCounter } from './JewelryCatalogSlice';
import { setNotificationText, activateNotification } from '../notification/NotificationSlice';

import JewelryItemShop from '../jewelryItem/JewelryItemShop';
import './jewelryCatalog.scss';
import Spinner from '../spinner/Spinner';

const JewelryCatalogShop = () => {
    const filteredGoodsSelector = createSelector(
        (state) => state.goods.goods,
        (state) => state.filters.term,
        (state) => state.filters.filterShopBy,
        (state) => state.filters.filterSortBy,
        (state) => state.filters.minValue,
        (state) => state.filters.maxValue,
        (state) => state.filters.inStock,
        (goods, term, filterShopBy, filterSortBy, minValue, maxValue, inStock) => {
            return goods
                .filter((item) => {
                    const lowerCaseName = item.name.toLowerCase();
                    const nameIncludesTerm = lowerCaseName.includes(term.toLowerCase());
                    const priceInRange = item.price >= minValue && item.price <= maxValue;
                    const typeMatchesFilter = filterShopBy === 'default' || item.type === filterShopBy;
                    const inStockMatchesFilter = inStock ? item.availability > 0 : true;

                    return nameIncludesTerm && priceInRange && typeMatchesFilter && inStockMatchesFilter;
                })
                .sort((a, b) => {
                    if (filterSortBy === 'minToMax') {
                        return a.price - b.price;
                    } else if (filterSortBy === 'maxToMin') {
                        return b.price - a.price;
                    } else {
                        return 0;
                    }
                });
        }
    );

    const ITEMS_PER_PAGE = 9;
    const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE);

    const filteredGoods = useSelector(filteredGoodsSelector);
    const { goodsLoadingStatus } = useSelector((state) => state.goods);

    const dispatch = useDispatch();

    const loadMoreItems = () => {
        setDisplayedItems((prev) => prev + ITEMS_PER_PAGE);
    };

    const onBuy = (id) => {
        const successMessage = 'The item added to your Shopping bag!';
        dispatch(addedGoods(id));
        dispatch(plusCounter(id));
        dispatch(setNotificationText(successMessage));
        dispatch(activateNotification());
    };

    const renderCatalog = (goods) => {
        const goodsList = goods.slice(0, displayedItems).map(({ id, name, price, images, availability }) => {
            return (
                <JewelryItemShop
                    id={id}
                    key={id}
                    name={name}
                    price={price}
                    imagePath={images[0]}
                    availability={availability}
                    onBuy={onBuy}
                />
            );
        });

        return <div className='catalog__wrapper-shop'>{goodsList}</div>;
    };

    if (goodsLoadingStatus === 'loading') {
        return <Spinner />;
    } else if (goodsLoadingStatus === 'error') {
        return <h5 className='no-results-message'>An error occurred while loading the data</h5>;
    }

    if (filteredGoods.length === 0) {
        return <div className='no-results-message'>Sorry, but we couldn't find any products matching your search.</div>;
    }

    const goodsCatalog = renderCatalog(filteredGoods);

    return (
        <>
            <div className='catalog'>
                {goodsCatalog}
                {filteredGoods.length > displayedItems && (
                    
                    <div className="catalog__button-wrapper">
                        <button onClick={loadMoreItems} className='catalog__load-more-button'>
                            Load More
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default JewelryCatalogShop;
