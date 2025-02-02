import { postType } from "./post.type";

export interface  userType  {
    _id: string;
    name: string;
    email: string;
    dateOfBirth: string; // Use Date if you want a Date object instead of a string.
    gender: "male" | "female"; // You can use a union for predefined gender values.
    photo: string; // URL for the user's profile photo.
    createdAt: string; // Use Date if you want to represent it as a Date object.
  }
  export interface userState{
    token : string | null,
    userData: userType | null,
    posts : postType[] | null,
    loadingPosts: boolean,
    errorPosts: boolean
  }