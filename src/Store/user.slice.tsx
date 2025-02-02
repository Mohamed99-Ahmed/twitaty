import { userType,userState } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from 'axios';

 // inisial State
const initialState:userState = {
    token: localStorage.getItem("token"),
    userData: null,
    // posts
    posts : null,
    loadingPosts: false,
    errorPosts: false
};
// Get My All Posts
export const getMyPosts = createAsyncThunk("user/getMyPosts",async ()=>{
    const options = {
        method:"GET",
        url : "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts",
        headers:{
            token: localStorage.getItem("token") || null,
        }
      }
      const {data} =  await axios.request(options);
      return data.posts;
     
})
// login function
export const login = createAsyncThunk("user/login", async (values:{email:string, password:string}) => {
    const loadToast = toast.loading("Sending your data...");
    
    try {
        const { data } = await axios.post(
            "https://linked-posts.routemisr.com/users/signin",
            {
                email: values.email,
                password: values.password,
            }
        );
        
        toast.dismiss(loadToast);
        
        if (data.message === "success") {
            toast.success("Successful login!");
            return data;
        } else {
            throw new Error(data.message || "Login failed");
        }
    } catch (error: unknown) {
        toast.dismiss(loadToast);
    }
});
// Get User Data 
export const getUserData = createAsyncThunk("user/getUserData",async ()=>{
    const options = {
        method:"GET",
        url : "https://linked-posts.routemisr.com/users/profile-data",
        headers:{
          token: localStorage.getItem("token") || null,
        }
      }
     try{
      const {data} = await axios.request(options);
      if(data.message == "success"){
        return data.user;
      }
     }catch(data){
    
     }
})
// Update Post
// export const updatePost = createAsyncThunk("user/getUserData",async (id:string,formData)=>{
//     const options = {
//         method:"PUT",
//         url : `https://linked-posts.routemisr.com/posts/${id}`,
//         headers:{
//           token: localStorage.getItem("token") || null,
//         },
//         data:formData
//       }
//      try{
//       const {data} = await axios.request(options);
//       if(data.message == "success"){
//             toast.success("تم تعديل البوست بنجاح");
//       }
//      }catch(data){
//         toast.error("هناك خطا");
//         console.log(data)
//      }
// })
// Slice 
const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        LogOut : (state)=>{
                state.token = null;
        }
    },
    extraReducers: (builder) => {
        // login 
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token)
        });
        // Get User Data
        builder.addCase(getUserData.fulfilled, (state, action) => {
            state.userData = action.payload;

        });
        // Get My Posts
        builder.addCase(getMyPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loadingPosts = false;
            state.errorPosts = false;
        });
        builder.addCase(getMyPosts.pending, (state, action) => {
            state.loadingPosts = true;
            state.errorPosts = false;
            state.posts = null
        });
        builder.addCase(getMyPosts.rejected, (state, action) => {
            state.loadingPosts = false;
            state.errorPosts = true;
            state.posts = null
        });
        // Update Post
        // builder.addCase(updatePost.fulfilled, (state, action) => {
        //     state.posts = action.payload;
        //     }
        // )
        

    }
});

export  default user.reducer;
export const actions = user.actions;