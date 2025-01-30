import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./Posts.slice";
import  userSlice  from './user.slice'; // Changed to named import

export const store = configureStore({
    reducer:{
           postSlice,
           userSlice // Moved userSlice to the correct position
    }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']