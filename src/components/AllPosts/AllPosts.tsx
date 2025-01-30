"use client"
import React from 'react'
import axios from 'axios';
import { postType } from '@/types/post.type';
import { useAppSelector } from '@/hooks/store.hooks';
import { useEffect, useState } from 'react';
import Post from './../Post/Post';
export default function AllPosts() {
    const [posts, setPosts] = useState<postType[] | null>(null)
    const {token} = useAppSelector((store)=> store.userSlice);
      useEffect(()=>{
        async function getAllPosts(){
          const options = {
            method:"GET",
            url : "https://linked-posts.routemisr.com/posts",
            headers:{
              token 
            }
          }
          const {data} = await axios.request(options);
          console.log(data);
          setPosts(data.posts)
          return data.posts
      }
      getAllPosts();
    },[])
  return (
    <>
         <div className='space-y-8'>
        { posts?.map((post:postType)=>{return(
              <Post key={post._id} post={post}/>
       )})}
        </div>
    </>
  )
}
