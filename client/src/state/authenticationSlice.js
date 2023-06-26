import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedIn : false,
    token : null,
    userData : {}
}

const authenticationSlice = createSlice({
    name : "authentication",
    initialState,
    reducers : {
        LOGIN : (state, {payload : datas}) => {
            state.loggedIn = true;
            state.token = datas.accessToken;
            state.userData = datas.user;
            console.log(datas.accessToken)
        },
        LOGOUT : (state) => {
            state.loggedIn = false;
            state.token = null;
        },
    }
})

export const authenticationReducer = authenticationSlice.reducer;
export const { LOGIN, LOGOUT } = authenticationSlice.actions;

export const loggedIn = (state) => state.authentication.loggedIn;

export const userId = (state) => state.authentication.userData.id;
export const token = (state) => state.authentication.token;

export const userName = (state) => state.authentication.userData.fullname;
export const userMail = (state) => state.authentication.userData.email;