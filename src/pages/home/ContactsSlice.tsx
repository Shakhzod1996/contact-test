import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContactsType, IOneContact, savedItems } from "./types/Contact.types";

interface IID {
    _id: string;
}
const initialState: IContactsType = {
    data: [],
    _id: "",
    selectedId: "",
    editStatus: false,
    selectedItems: {
        email: "",
        firstName: "",
        lastName: "",
        image: "",
        phoneNumber: "",
        relationship: {
            name: "",
        },
        _id: "",
    },
};

export const ContactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setContactsFunc: (state, { payload }: PayloadAction<IContactsType>) => {
            state.data = payload.data;
        },
        getDeletedId: (state, { payload }: PayloadAction<any>) => {
            
            state._id = payload;
        },

        getSelectedId: (state, { payload }: PayloadAction<any>) => {
            state.selectedId = payload;
        },

        getContactInfo: (state, { payload }: PayloadAction<savedItems>) => {
            state.selectedItems.email = payload.email;
            state.selectedItems.firstName = payload.firstName;
            state.selectedItems.lastName = payload.lastName;
            state.selectedItems.phoneNumber = payload.phoneNumber;
            state.selectedItems.image = payload.image;
            state.selectedItems._id = payload._id;
            state.selectedItems.relationship.name = payload.relationship?.name;
            state.editStatus = true
        },

        editChangeStatus: (state) => {
            state.editStatus = false
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setContactsFunc,
    getDeletedId,
    getSelectedId,
    getContactInfo,
    editChangeStatus,
} = ContactsSlice.actions;

export default ContactsSlice.reducer;
