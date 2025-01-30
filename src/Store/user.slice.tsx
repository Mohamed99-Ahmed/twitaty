import { userType,userState } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import axios from 'axios';

 // Removed TypeScript type annotation for compatibility
const initialState:userState = {
    token: localStorage.getItem("token"),
    userData: null
};

// login function
export const login = createAsyncThunk("user/login", async (values) => {
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
            console.log(data);
            return data;
        } else {
            throw new Error(data.message || "Login failed");
        }
    } catch (error: unknown) {
        toast.dismiss(loadToast);
        const errorMessage = (error instanceof Error) ? error.message : "An error occurred";
        toast.error(errorMessage);
        throw error;
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
        console.log(data.user)
        return data.user;
      }
     }catch(data){
    //   console.log(data)
     }
})
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
    }
});

export  default user.reducer;
export const actions = user.actions;