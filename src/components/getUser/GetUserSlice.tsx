import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserProfile {
    createdAt: string;
    email: null | string;
    firstName: string;
    imgUrl: string;
    lastName: string;
    phoneNumber: string;
    superAdmin: boolean;
    updatedAt: string;
    _id: string;
}

const initialState: { data: IUserProfile } = {
    data: {
        createdAt: "",
        email: null,
        firstName: "",
        imgUrl: "",
        lastName: "",
        phoneNumber: "",
        superAdmin: false,
        updatedAt: "",
        _id: "",
    },
};

export const getUserSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        getUserFunc: (state, { payload }: PayloadAction<IUserProfile>) => {
            // console.log("payload",payload.data);
            state.data = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { getUserFunc } = getUserSlice.actions;

export default getUserSlice.reducer;
