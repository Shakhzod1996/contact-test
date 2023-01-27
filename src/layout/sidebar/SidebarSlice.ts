import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface sidebarState {
    value: boolean;
}

const initialState: sidebarState = {
    value: true,
};

export const sidebarSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        openSideBarFunc: (state) => {
            state.value = !state.value;
        },
        closeSideBarFunc: (state) => {
            state.value = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const { closeSideBarFunc,  openSideBarFunc} = sidebarSlice.actions;

export default sidebarSlice.reducer;
