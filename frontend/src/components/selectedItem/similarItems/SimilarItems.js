import { useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';

import JewelryItemPromo from '../../jewelryItem/JewelryItemPromo';
import './similarItems.scss';

const SimilarItems = () => {
    const itemsSelector = createSelector(
        (state) => state.goods.goods,
        (state) => state.item.selectedItemId,
        (goods, selectedItemId) => {
            const similarGoods = goods.filter(item => item.type === selectedItemId.type && item.id !== selectedItemId.id);
            const shuffledGoods = similarGoods.sort(() => Math.random() - 0.5);
            return shuffledGoods.slice(0, 3);
        }
    )
    const items = useSelector(itemsSelector); 

    const renderItemsCatalog = (similarItems) => {
        if(similarItems.length === 0) {
            return <div className="similar__empty">Similar items are temporarily unavailable.</div>;
        }
        const itemsCatalog = similarItems.map(({id, name, price, images}) => {
            return(<JewelryItemPromo key={id} id={id} name={name} price={price} imagePath={images[0]} />)
        })
        return <>
            {itemsCatalog}
        </>  
    }

    const similarItemsCatalog = renderItemsCatalog(items);

    return(
        <div className="similar">
            <div className="container">
                <div className="similar__title">Similar Items</div>
                <div className="similar__items">
                    {similarItemsCatalog}
                </div>
            </div>
        </div>
    );
};

export default SimilarItems;