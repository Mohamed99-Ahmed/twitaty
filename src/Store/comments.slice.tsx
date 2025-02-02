
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
       
}
const comments =  createSlice({
    name:"comments",
    initialState,
    reducers: {},
})
const commentsSlice = comments.reducer;
export default commentsSlice;