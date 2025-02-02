
"use client"
import CreatePost from './../../components/CreatePost/CreatePost';

import Post from "@/components/Post/Post";
import { postType } from "@/types/post.type";
import {  useEffect } from "react";
import Loading from "../loading";

import ProfileUserContent from '@/components/ProfileUserContent/ProfileUserContent';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import {  getMyPosts } from '@/Store/user.slice';
export default  function Porfile() {
  const dispatch = useAppDispatch()
  const {posts} = useAppSelector((store)=> store.userSlice);
    const {token} = useAppSelector((store)=> store.userSlice);
  // call all api function in mount phase
  useEffect(()=>{
    // get MyPosts 
    dispatch( getMyPosts(token));
  },[])
 
  return (
  <>
    {token && <section className="profile">
      <div className="container space-y-16">
         <ProfileUserContent />
        <main className="flex flex-col md:flex-row relative gap-4 md:items-start  justify-between">
            <CreatePost className="md:sticky top-20"/>
             {posts?<div className='space-y-8 grow-[1]'>
                    { posts.map((post:postType)=>{return(
                          <Post key={post._id} post={post} myPost={true}/>
                   )})}
              </div>:<Loading className='flex grow-[1] justify-center'/>}
        
        </main>
      </div>
    </section>}
  </>
  );
}
