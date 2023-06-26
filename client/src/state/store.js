import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { surveyApiSlice } from "./surveyApiSlice";
import { authenticationReducer } from "./authenticationSlice"

const reducer = combineReducers({
    authentication : authenticationReducer,
    [surveyApiSlice.reducerPath] : surveyApiSlice.reducer,
});

export const store = configureStore({
    reducer: reducer,
    middleware : (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(surveyApiSlice.middleware)
});