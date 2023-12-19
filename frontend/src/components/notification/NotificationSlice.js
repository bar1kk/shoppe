import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    notificationStatus: false,
    notificationText: ''
}

export const activateNotification = createAsyncThunk(
    'notification/activateNotification',
    async (_, { dispatch }) => {
      dispatch(showNotification());
  
      return new Promise((resolve) => {
        setTimeout(() => {
          dispatch(hideNotification());
          resolve();
        }, 2000);
      });
    }
  );

const NotificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state) => {
            state.notificationStatus = true;
        },
        hideNotification: (state) => {
            state.notificationStatus = false;
        },

        setNotificationText: (state, action) => {
            state.notificationText = action.payload
        }
    },
});

const {actions, reducer} = NotificationSlice;

export default reducer;

export const {
    showNotification,
    setNotificationText,
    hideNotification
} = actions;