import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IProps {
    firstName: string;
    lastName: string;
    image: string;
    phoneNumber: string;
    _id: string;
}

const initialState: IProps = {
    firstName: "",
    lastName: "",
    image: "",
    phoneNumber: "",
    _id: "" 
};

export const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setUserFunc: (state, { payload }: PayloadAction<IProps>) => {
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;
            state.phoneNumber = payload.phoneNumber;
            state.image = payload.image;
            state._id = payload._id

            console.log("payload",payload.image);
            
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserFunc } = loginSlice.actions;

export default loginSlice.reducer;
