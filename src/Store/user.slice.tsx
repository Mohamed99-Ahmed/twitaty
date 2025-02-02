import { userState } from "@/types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";

// Initial State
const initialState: userState = {
    token: null, // Initialize as null
    userData: null,
    posts: null,
    loadingPosts: false,
    errorPosts: false,
};

// Get My All Posts
export const getMyPosts = createAsyncThunk(
    "user/getMyPosts",
    async (token: string | null) => {
        const options = {
            method: "GET",
            url: "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts",
            headers: {
                token: token || null,
            },
        };
        const { data } = await axios.request(options);
        return data.posts;
    }
);

// Login Function
export const login = createAsyncThunk(
    "user/login",
    async (values: { email: string; password: string }) => {
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
        } catch (data) {
            toast.dismiss(loadToast);
            console.log(data);
            toast.error("هناك خطا في السيرفر");
        }
    }
);

// Get User Data
export const getUserData = createAsyncThunk(
    "user/getUserData",
    async (token: string | null) => {
        const options = {
            method: "GET",
            url: "https://linked-posts.routemisr.com/users/profile-data",
            headers: {
                token: token || null,
            },
        };
        try {
            const { data } = await axios.request(options);
            if (data.message == "success") {
                return data.user;
            }
        } catch (data) {
            toast.error("هناك خطا");
            console.log(data);
        }
    }
);

// Slice
const user = createSlice({
    name: "user",
    initialState,
    reducers: {
        LogOut: (state) => {
            state.token = null;
            localStorage.removeItem("token"); // Clear token from localStorage
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload) {
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token); // Set token in localStorage
            }
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
        builder.addCase(getMyPosts.pending, (state) => {
            state.loadingPosts = true;
            state.errorPosts = false;
            state.posts = null;
        });
        builder.addCase(getMyPosts.rejected, (state) => {
            state.loadingPosts = false;
            state.errorPosts = true;
            state.posts = null;
        });
    },
});

export default user.reducer;
export const actions = user.actions;