import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    promoGoods: [],
    goods: [],
    goodsLoadingStatus: 'idle',
    orderedGoods: [],
    orderedCounters: [],
    selectedItemId: 0
}

export const fetchPromoGoods = createAsyncThunk(
    'goods/fetchPromoGoods',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:3001/promoGoods', 'GET');
    }
);

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:3001/goods', 'GET');
    }
);

const JewelryCatalogSlice = createSlice({
    name: 'goods',
    initialState,
    reducers: {
        addedGoods: (state, action) => {
            const itemIdToAdd = action.payload;
            const itemExistsInOrderedGoods = state.orderedGoods.some(item => item.id === itemIdToAdd);

            if (!itemExistsInOrderedGoods) {
                const newItem = state.goods.find(item => item.id === itemIdToAdd);
                if (newItem) {
                    state.orderedGoods.push({ ...newItem, counter: 0 });
                }
            }
        },
        removeGoods: (state, action) => {
            const itemIdToRemove = action.payload;
            state.orderedGoods = state.orderedGoods.filter(item => item.id !== itemIdToRemove);

            state.orderedGoods.forEach(item => {
                if (item.id === action.payload) {
                    item.counter = 0;
                }
            })
        },
        plusCounter: (state, action) => {
            state.orderedGoods.forEach(item => {
                if (item.id === action.payload) {
                    item.counter += 1;
                }
            })
        },
        minusCounter: (state, action) => {
            state.orderedGoods.forEach(item => {
                if (item.id === action.payload && item.counter > 1) {
                    item.counter -= 1;
                }
            })
        },
        addCounter: (state, action) => {
            const { id, counter } = action.payload;
            state.orderedGoods.forEach(item => {
                if (item.id == id) {
                    item.counter += counter;
                }
            })
        },
        fetchSelectedItem: (state, action) => {state.selectedItemId = action.payload}
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, state => {state.goodsLoadingStatus = 'loading'})
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.goodsLoadingStatus = 'idle';
                state.goods = action.payload;
            })
            .addCase(fetchGoods.rejected, state => {state.goodsLoadingStatus = 'error'})
            .addCase(fetchPromoGoods.pending, state => {state.goodsLoadingStatus = 'loading'})
            .addCase(fetchPromoGoods.fulfilled, (state, action) => {
                state.goodsLoadingStatus = 'idle';
                state.promoGoods = action.payload;
            })
            .addCase(fetchPromoGoods.rejected, state => {state.goodsLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = JewelryCatalogSlice;

export default reducer;

export const {
    addedGoods,
    removeGoods,
    plusCounter,
    minusCounter,
    addCounter,
    fetchSelectedItem
} = actions;