import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProps {
    firstName: string,
    lastName: string;
    image?: string;
    phoneNumber: string;
}

const initialState:IProps = {
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: "",
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUserFunc: (state, {payload}: PayloadAction<IProps>) => {
             
        }
    },
});

// Action creators are generated for each case reducer function
export const { setUserFunc } = loginSlice.actions;

export default loginSlice.reducer;
