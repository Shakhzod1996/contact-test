import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRelation, RelationType } from "./types/Relation.types";


const initialState:RelationType = {
  data: []
};

export const relationSlice = createSlice({
    name: "relation",
    initialState,
    reducers: {
        setRelationFunc: (state, {payload}: PayloadAction<RelationType>) => {
            state.data = payload.data
        },
    },
});

// Action creators are generated for each case reducer function
export const { setRelationFunc } = relationSlice.actions;

export default relationSlice.reducer;
