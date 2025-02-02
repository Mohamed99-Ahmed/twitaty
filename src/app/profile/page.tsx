
"use client"
import CreatePost from './../../components/CreatePost/CreatePost';
import axios from "axios";
import Post from "@/components/Post/Post";
import { postType } from "@/types/post.type";
import { Suspense, useEffect, useState } from "react";
import Loading from "../loading";
import { userType } from '@/types/user.type';
import ProfileUserContent from '@/components/ProfileUserContent/ProfileUserContent';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import { getMyPosts, getUserData } from '@/Store/user.slice';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
export default  function Porfile() {
  const dispatch = useAppDispatch()
  const {posts} = useAppSelector((store)=> store.userSlice);
    const {token} = useAppSelector((store)=> store.userSlice);
 
  // call all api function in mount phase
  useEffect(()=>{
    dispatch( getMyPosts())
  },[])
 

  return (
  <>
    {token ? <section className="profile">
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
    </section>:  <div className='flex justify-center h-[70vh] items-center text-main'>
    <Link href="/signup" className='underline'> ليس لديك حساب قم بانشاء حساب</Link>
      </div>}
  </>
  );
}
