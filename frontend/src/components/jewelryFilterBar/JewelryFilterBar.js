import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Switch from 'react-switch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {
    updateTerm,
    setMaxValue,
    setMinValue,
    setMaxPrice,
    setMinPrice,
    setSliderMaxValue,
    setSliderMinValue,
    setFilterShopBy,
    setFilterSortBy,
    setInStock
} from './JewelryFilterBarSlice';
import { fetchGoods } from '../jewelryCatalog/JewelryCatalogSlice';

import './jewelryFilterBar.scss';
import searchIcon from '../../assets/icons/search.svg';

const JewelryFilterBar = () => {
    const { goods } = useSelector((state) => state.goods);
    const { term, maxPrice, minPrice, sliderMaxValue, sliderMinValue, inStock } = useSelector((state) => state.filters);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGoods());
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (goods.length > 0) {
            changeFilterShopBy('default');
            changeFilterSortBy('default');
        }
        // eslint-disable-next-line
    }, [goods]);

    const handlePriceChange = (values) => {
        dispatch(setSliderMinValue(values[0]));
        dispatch(setSliderMaxValue(values[1]));
    };

    const handleInputChange = (e) => {
        dispatch(updateTerm(e.target.value));
    };

    const handleChangeFilter = (sliderMinValue, sliderMaxValue) => {
        dispatch(setMinValue(sliderMinValue));
        dispatch(setMaxValue(sliderMaxValue));
    };

    const changeFilterShopBy = (type) => {
        dispatch(setFilterShopBy(type));

        let maxPrice, minPrice;

        if (type === 'default') {
            maxPrice = Math.max(...goods.map((item) => parseFloat(item.price)));
            minPrice = Math.min(...goods.map((item) => parseFloat(item.price)));
        } else {
            maxPrice = Math.max(...goods.filter((item) => item.type === type).map((item) => parseFloat(item.price)));
            minPrice = Math.min(...goods.filter((item) => item.type === type).map((item) => parseFloat(item.price)));
        }

        dispatch(setSliderMaxValue(maxPrice));
        dispatch(setSliderMinValue(minPrice));
        dispatch(setMaxPrice(maxPrice));
        dispatch(setMinPrice(minPrice));
        dispatch(setMinValue(minPrice));
        dispatch(setMaxValue(maxPrice));
    };

    const changeFilterSortBy = (type) => {
        dispatch(setFilterSortBy(type));
    };

    const changeFilterInStock = (checked) => {
        dispatch(setInStock(checked));
    };

    const renderOptions = (goods) => {
        const uniqueTypes = new Set();

        goods.forEach((item) => {
            uniqueTypes.add(item.type);
        });

        const items = Array.from(uniqueTypes).map((type, i) => {
            return (
                <option value={type} key={i}>
                    {type}
                </option>
            );
        });

        return items;
    };

    const optionsByType = renderOptions(goods);

    return (
        <div className='filterbar'>
            <h2 className='title'>Shop The Latest</h2>
            <div className='filterbar__search__wrapper'>
                <input
                    value={term}
                    onChange={handleInputChange}
                    type='text'
                    className='filterbar__search'
                    placeholder='Search...'
                />
                <img src={searchIcon} alt='search' />
            </div>

            <div>
                <select className='filterbar__sorting' onChange={(e) => changeFilterShopBy(e.target.value)}>
                    <option value='default' className='filterbar__sorting-option' selected>
                        Shop By
                    </option>
                    {optionsByType}
                </select>
            </div>
            <div>
                <select className='filterbar__sorting' onChange={(e) => changeFilterSortBy(e.target.value)}>
                    <option value='default' className='filterbar__sorting-option' selected>
                        Sort By
                    </option>
                    <option value='minToMax'>Min to Max</option>
                    <option value='maxToMin'>Max to Min</option>
                </select>
            </div>

            <div>
                <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={[sliderMinValue, sliderMaxValue]}
                    onChange={handlePriceChange}
                />

                <div className='filterbar__price__wrapper'>
                    <div className='filterbar__price-info'>
                        Price: ${sliderMinValue} - ${sliderMaxValue}
                    </div>
                    <button
                        onClick={() => handleChangeFilter(sliderMinValue, sliderMaxValue)}
                        className='filterbar__price-btn'>
                        Filter
                    </button>
                </div>
            </div>
            <div className='filterbar__instock'>
                <div className='filterbar__instock-info'>In stock</div>
                <Switch
                    onChange={changeFilterInStock}
                    checked={inStock}
                    className='filterbar__instock-switch'
                    checkedIcon={false}
                    uncheckedIcon={false}
                    height={20}
                    width={34}
                    handleDiameter={14}
                    offColor='#707070'
                    onColor='#A18A68'
                />
            </div>
        </div>
    );
};

export default JewelryFilterBar;
