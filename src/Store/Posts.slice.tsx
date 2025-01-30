import { createSlice } from "@reduxjs/toolkit";

const posts =  createSlice({
    name:"postst",
    initialState:{data:null},
    reducers: {},
})
const postSlice = posts.reducer;
export default postSlice;