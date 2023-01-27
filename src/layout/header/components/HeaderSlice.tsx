import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  isBarOpen: false
};

export const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        changeStatusFunc: (state, ) => {
            state.isBarOpen = !state.isBarOpen
        },
    },
});

// Action creators are generated for each case reducer function
export const { changeStatusFunc } = headerSlice.actions;

export default headerSlice.reducer;
