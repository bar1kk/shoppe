import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    profile: {},
    profileLoadingStatus: 'idle',
    filter: 'dashboard',
    orders: [],
    selectedOrder: {},
    ordersLoadingStatus: 'idle',
    addresses: [],
    selectedAddress: {},
    addressesLoadingStatus: 'idle'
};

export const fetchOrders = createAsyncThunk('userAccount/fetchOrders', async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/orders'); // request("http://localhost:9122/api/v1/orders", "GET", null, state.userHeader))})
});

export const fetchAddresses = createAsyncThunk('userAccount/fetchAddresses', async (header) => {
    const { request } = useHttp();
    return await request('http://localhost:9122/api/v1/user/shipping-addresses', 'GET', null, header);
});

export const fetchProfile = createAsyncThunk('userAccount/fetchProfile', async (header) => {
    const { request } = useHttp();
    return await request('http://localhost:9122/api/v1/user/profile', 'GET', null, header);
});

const UserAccountSlice = createSlice({
    name: 'userAccount',
    initialState,
    reducers: {
        fetchSelectedAddress: (state, action) => {
            state.selectedAddress = { ...action.payload };
        },

        fetchSelectedOrder: (state, action) => {
            state.selectedOrder = { ...action.payload };
        },

        changeProfile: (state, action) => {
            state.profile = { ...action.payload };
        },

        changeFilter: (state, action) => {
            state.filter = action.payload;
        },

        addedNewAddress: (state, action) => {
            state.addresses.push(action.payload);
        },

        addedNewOrder: (state, action) => {
            state.orders.push(action.payload);
        },

        removeAddress: (state, action) => {
            state.addresses = state.addresses.filter((address) => address.id !== action.payload);
        },

        resetUserAccount: () => initialState,

        resetSelectedAddress: (state) => {
            state.selectedAddress = [];
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

            .addCase(fetchProfile.pending, (state) => {
                state.profileLoadingStatus = 'loading';
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profileLoadingStatus = 'idle';
                state.profile = { ...action.payload };
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.profileLoadingStatus = 'error';
                console.error('Error fetching profile:', action.error); 
            })
            .addDefaultCase(() => {});
    }
});

const { actions, reducer } = UserAccountSlice;
export default reducer;
export const {
    changeFilter,
    addedNewAddress,
    removeAddress,
    fetchSelectedOrder,
    fetchSelectedAddress,
    addedNewOrder,
    resetUserAccount,
    resetSelectedAddress,
    changeProfile
} = actions;
