import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        startSignIn: (state) => {
            state.loading = true;
        },
        successInSignIn: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        failureInSignIn: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        startUpdateUser: (state) => {
            state.loading = true;
        },
        successUpdateUser: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        failureUpdateUser: (state, action) => {
            state.error = action.payload;
            state.loading = false;
            
        },
        startDeleteUser: (state) => {
            state.loading = true;
        },
        successDeleteUser: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        failureDeleteUser: (state, action) => {
            state.error = action.payload;
            state.loading = false;

        },
        startSignOutUser: (state) => {
            state.loading = true;
        },
        successSignOutUser: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        failureSignOutUser: (state, action) => {
            state.error = action.payload;
            state.loading = false;

        },
    },
    });
export const {
    startSignIn,
    successInSignIn,
    failureInSignIn,
    startUpdateUser,
    successUpdateUser,
    failureUpdateUser,
    startDeleteUser,
    successDeleteUser,
    failureDeleteUser,
    startSignOutUser,
    successSignOutUser,
    failureSignOutUser,
    
} = userSlice.actions;

export default userSlice.reducer;