import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    term: '',
    filterShopBy: 'default',
    filterSortBy: 'default',
    minValue: 0,
    maxValue: 0,
    maxPrice: 0,
    minPrice: 0,
    sliderMinValue: 0,
    sliderMaxValue: 0,
    inStock: false
}


const JewelryFilterBarSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateTerm: (state, action) => {state.term = action.payload},
        setFilterShopBy: (state, action) => {state.filterShopBy = action.payload},
        setFilterSortBy: (state, action) => {state.filterSortBy = action.payload},
        setMinValue: (state, action) => {state.minValue = action.payload},
        setMaxValue: (state, action) => {state.maxValue = action.payload},
        setMaxPrice: (state, action) => {state.maxPrice = action.payload},
        setMinPrice: (state, action) => {state.minPrice = action.payload},
        setSliderMinValue: (state, action) => {state.sliderMinValue = action.payload},
        setSliderMaxValue: (state, action) => {state.sliderMaxValue = action.payload},
        setInStock: (state, action) => {state.inStock = action.payload}
        
    }
});

const {actions, reducer} = JewelryFilterBarSlice;

export default reducer;

export const {
    updateTerm,
    setFilterShopBy,
    setFilterSortBy,
    setMinValue,
    setMaxValue,
    setMaxPrice,
    setMinPrice,
    setSliderMinValue,
    setSliderMaxValue,
    setInStock
} = actions;