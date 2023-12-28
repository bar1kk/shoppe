import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    promoGoodsId: [],
    promoGoods: [],
    goods: [],
    orderedGoods: [], 
    goodsLoadingStatus: 'idle',
    promoGoodsLoadingStatus: 'idle',
}

export const fetchPromoGoodsId = createAsyncThunk(
    'goods/fetchPromoGoodsId',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:9122/api/v1/products/best-selling', 'GET');
    }
);

export const fetchGoods = createAsyncThunk(
    'goods/fetchGoods',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:9122/api/v1/products', 'GET');
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
        fetchPromoGoods: (state, action) => {
            state.promoGoods = action.payload;
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
                if (item.id === id) {
                    item.counter += counter;
                }
            })
        },
        resetOrderedGoods: (state) => {
            state.orderedGoods = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoods.pending, state => {state.goodsLoadingStatus = 'loading'})
            .addCase(fetchGoods.fulfilled, (state, action) => {
                state.goodsLoadingStatus = 'idle';
                state.goods = action.payload;
            })
            .addCase(fetchGoods.rejected, state => {state.goodsLoadingStatus = 'error'})
            .addCase(fetchPromoGoodsId.pending, state => {state.promoGoodsLoadingStatus = 'loading'})
            .addCase(fetchPromoGoodsId.fulfilled, (state, action) => {
                state.promoGoodsLoadingStatus = 'idle';
                state.promoGoodsId = action.payload;
            })
            .addCase(fetchPromoGoodsId.rejected, state => {state.promoGoodsLoadingStatus = 'error'})
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
    fetchPromoGoods,
    resetOrderedGoods
} = actions;