import { useSelector } from 'react-redux/es/hooks/useSelector';
import { createSelector } from '@reduxjs/toolkit';

import JewelryItemPromo from '../../../jewelryItem/JewelryItemPromo';
import './similarItems.scss';

const SimilarItems = () => {
    const itemsSelector = createSelector(
        (state) => state.goods.goods,
        (state) => state.item.selectedItemId,
        (goods, selectedItemId) => {
            return goods.filter(item => item.type === selectedItemId.type)
        }
    )
    const items = useSelector(itemsSelector);

    const renderItemsCatalog = (similarItems) => {
        const itemsCatalog = similarItems.map(({id, name, price, imagePath}) => {
            return(<JewelryItemPromo key={id} id={id} name={name} price={price} imagePath={imagePath[0]} />)
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