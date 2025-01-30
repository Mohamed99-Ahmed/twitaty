
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
import { getUserData } from '@/Store/user.slice';
export default  function Porfile() {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState<userType | any>(null)
  const [posts, setPosts] = useState<postType[] | null>(null)
  const {token} = useAppSelector((store)=> store.userSlice);
  const {userData} = useAppSelector((store)=> store.userSlice);
  

  const formData = new FormData();
  useEffect(()=>{
    // Get my Data (user Data)
    async function userData(){
      await dispatch(getUserData());
      setUser(userData)
    }
  // Get all My Post
   async function getUserPosts(){
    const options = {
      method:"GET",
      url : "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts",
      headers:{
        token 
      }
    }
    const {data} = await axios.request(options);
    setPosts(data.posts)
    return data.posts;
  }
  // call all api function in mount phase
  (async function callApiFuc(){
    await userData();
      await getUserPosts();
  })();
  },[])
 

  return (
    <section className="profile">
      <div className="container space-y-16">
        {userData && <ProfileUserContent user={userData}/>}
        <main className="flex flex-col md:flex-row relative gap-4 md:items-start  justify-between">
            <CreatePost className="md:sticky top-20"/>
             <Suspense fallback={<Loading/>}>
             <div className='space-y-8'>
                    { posts?.map((post:postType)=>{return(
                          <Post key={post._id} post={post}/>
                   )})}
              </div>
             </Suspense>
        </main>
      </div>
    </section>
  );
}
