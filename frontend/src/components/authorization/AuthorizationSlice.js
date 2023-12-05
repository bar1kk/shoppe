import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeBtn: "login"
};

const Authorization = createSlice({
    name: "authorization",
    initialState,
    reducers: {
        changeActiveBtn(state, action) {
            state.activeBtn = action.payload;
        }
    }
});

const { actions, reducer } = Authorization;
export default reducer;
export const { changeActiveBtn } = actions;
