import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedItemId: [],
    filter: 'descr',
    review: '',
    name: '',
    rating: 0,
    slides: 4,
    activeSlideIndex: 1
}

const SelectedItemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        fetchSelectedItem: (state, action) => {
            state.selectedItemId = { ...action.payload, counter: 1};
        },
        counterPlus: (state) => {
            if (state.selectedItemId) {
                state.selectedItemId.counter += 1;
            }
        },
        counterMinus: (state) => {
            if (state.selectedItemId && state.selectedItemId.counter > 1) {
                state.selectedItemId.counter -= 1;
            }
        },
        changeFilter: (state, action) => {
            state.filter = action.payload;
        },
        addReview: (state, action) => {
            state.selectedItemId.reviews.push(action.payload);
        },
        changeName: (state, action) => {
            state.name = action.payload;
        },
        changeReview: (state, action) => {
            state.review = action.payload;
        },
        changeRating: (state, action) => {
            state.rating = action.payload
        },
        changeActiveSlideIndex: (state, action) => {
            state.activeSlideIndex = action.payload
        }
    }    
});

const {actions, reducer} = SelectedItemSlice;

export default reducer;

export const {
    fetchSelectedItem,
    counterPlus,
    counterMinus,
    changeFilter,
    addReview,
    changeName,
    changeRating,
    changeReview,
    changeActiveSlideIndex
} = actions;