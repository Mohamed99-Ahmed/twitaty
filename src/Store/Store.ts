import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Posts.slice";
import  userSlice  from './user.slice';

export const store = configureStore({
    reducer:{
           postSlice,
           userSlice 
    }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']