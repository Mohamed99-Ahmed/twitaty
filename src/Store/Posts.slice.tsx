import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    postText:"",
    postImage:"",
    postId:"",
}
const posts =  createSlice({
    name:"postst",
    initialState,
    reducers: {
        updateDataPost: (state, action) => {
            state.postText = action.payload.postText;
            state.postImage = action.payload.postImage;
            state.postId = action.payload.postId;
        },
        resetPostId:(state)=>{
            state.postId = "";
        }
    },
})
const postSlice = posts.reducer;
export const {updateDataPost,resetPostId} = posts.actions;
export default postSlice;