import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    userHeader: '',
    filter: 'dashboard',
    orders: [],
    addresses: [],
    ordersLoadingStatus: 'idle',
    addressesLoadingStatus: 'idle'
};

export const fetchOrders = createAsyncThunk(
    'userAccount/fetchOrders',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/orders")// request("http://localhost:9122/api/v1/orders", "GET", null, state.userHeader))})
    }
);

export const fetchAddresses = createAsyncThunk(
    'userAccount/fetchAddresses',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/addresses")// request("http://localhost:9122/api/v1/addresses", "GET", null, state.userHeader))})
    }
);

const UserAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        addedUserHeader(state, action) {
            state.userHeader = action.payload;
        },

        changeFilter(state, action) {
            state.filter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchOrders.pending, (state) => {
            state.ordersLoadingStatus = 'loading';
        })
        .addCase(fetchOrders.fulfilled, (state, action) => {
            state.ordersLoadingStatus = 'idle';
            state.orders = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
            state.ordersLoadingStatus = 'error';
        })
        .addCase(fetchAddresses.pending, (state) => {
            state.addressesLoadingStatus = 'loading';
        })
        .addCase(fetchAddresses.fulfilled, (state, action) => {
            state.addressesLoadingStatus = 'idle';
            state.addresses = action.payload;
        })
        .addCase(fetchAddresses.rejected, (state, action) => {
            state.addressesLoadingStatus = 'error';
        })
        .addDefaultCase(() => {})
    }
});

const { actions, reducer } = UserAccountSlice;
export default reducer;
export const { addedUserHeader, changeFilter } = actions;



