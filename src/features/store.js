import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import sidebarReducer from "../layout/sidebar/SidebarSlice";
import  headerReducer  from "../layout/header/components/HeaderSlice";
import LoginReducer from "../pages/login/LoginSlice";
export const store = configureStore({
    reducer: {
        sideBarData: sidebarReducer,
        headerInfo: headerReducer,
        loginInfo: LoginReducer
    },

    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
