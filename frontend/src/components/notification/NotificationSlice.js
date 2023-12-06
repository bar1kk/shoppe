import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationStatus: false
}

const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            state.notificationStatus = action.payload
        }
    },
});

const {actions, reducer} = NotificationSlice;

export default reducer;

export const {
    showNotification
} = actions;