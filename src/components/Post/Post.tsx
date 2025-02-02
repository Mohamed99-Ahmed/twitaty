"use client";
import React, { useRef, useState } from "react";
import human from "../../../public/assets/imgs/human.png";
import { TfiComments } from "react-icons/tfi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Button from "../Button/Button";
import Image from "next/image";
import { IoSendSharp } from "react-icons/io5";
import { commentType, postType } from "@/types/post.type";
import axios from "axios";
import toast from "react-hot-toast";
import Comment from "../Comment/comment";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { getMyPosts } from "@/Store/user.slice";
import { updateDataPost } from "@/Store/Posts.slice";

// start Post component
export default function Post({ post, myPost }: { post: postType; myPost: boolean }) {
  const [settingPost, setSettingPost] = useState<boolean>(false);
  const [fComment, setFComment] = useState<boolean>(false);
  const [allComments, setAllComments] = useState<commentType[]>(post.comments);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const inputComment = useRef<HTMLInputElement | null>(null);
  const [idComment, setIdComment] = useState<string>("");
  const dispatch = useAppDispatch();
  const { postText, postImage } = useAppSelector((store) => store.postSlice);
  const { token } = useAppSelector((store) => store.userSlice);

  // Get comments of post
  async function getAllComments(id: string) {
    const options = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts/${id}/comments`,
      headers: {
        token,
      },
    };

    try {
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message == "success") {
        setAllComments(data.comments);
        return data;
      }
    } catch (data) {
      toast.error("هناك خطا");
    }
  }

  // delete Post
  async function deletePost(id: string) {
    const options = {
      method: "DELETE",
      url: `https://linked-posts.routemisr.com/posts/${id}`,
      headers: {
        token,
      },
    };
    try {
      const loadingToast = toast.loading("جاري مسح البوست");
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("تم مسح البوست");
        dispatch(getMyPosts());
        toast.dismiss(loadingToast);
      } else if (data.error == "user not found") {
        toast.error("ليس لديك احقية مسح هذا البوست");
        toast.dismiss(loadingToast);
      }
    } catch (data) {
      toast.error(data);
      console.log(data);
    }
  }

  // update Post
  function updatePost(id: string, text: string, img: string) {
    dispatch(updateDataPost({ postId: id, postText: text, postImage: img }));
    if (window.top) {
      window.top.scrollTo(0, 0);
    }
  }

  // update comment
  async function updateComment(idComment: string) {
    const options = {
      method: "PUT",
      url: `https://linked-posts.routemisr.com/comments/${idComment}`,
      headers: {
        token,
      },
      data: {
        content: `${inputComment?.current?.value}`,
      },
    };
    const toastBar = toast.loading(`  تعديل تعليقك`);
    try {
      const { data } = await axios.request(options);
      console.log(data);
      if (data.message == "success") {
        toast.dismiss(toastBar);
        await getAllComments(post._id);
        toast.success(`تم تعديل التعليق `);
        setIdComment("");
        return data;
      }
    } catch (data) {
      toast.dismiss(toastBar);
      toast.error("ليس لديك احقية تغير تعليك غيرك");
    }
  }

  // create comment
  async function createComment(id: string) {
    const options = {
      method: "POST",
      url: "https://linked-posts.routemisr.com/comments",
      headers: {
        token,
      },
      data: {
        content: inputComment?.current?.value,
        post: id,
      },
    };
    const toastBar = toast.loading(` اضافة تعليقك`);
    try {
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.dismiss(toastBar);
        setAllComments(data.comments);
        toast.success(`تم اضافة تعليقك "${inputComment?.current?.value}"`);
        return data;
      }
    } catch ({ data }: { message: string }) {
      toast.dismiss(toastBar);
      toast.error(data.message);
    }
  }

  // handle Send (update comment or create comment )
  async function handleSend() {
    // if i have id of comment so update comment
    if (idComment) {
      await updateComment(idComment);
    } else {
      // else so create comment
      await createComment(post._id);
    }
  }

  return (
    <div className="post space-y-5 p-3 rounded-md bg-white shadow-md">
      {/* information about autor */}
      <article className="flex justify-between gap-4 items-center relative">
        <Image src={post.user.photo || human} alt="human face logo" height={30} width={30} className="w-[50px] h-[50px] object-cover rounded-full" />
        <h3 className="flex flex-col gap-1 grow-[1]">
          <span>{post.user.name}</span>
          <span>{new Date(`${post.createdAt}`).toLocaleDateString()}</span>
        </h3>
        {myPost && (
          <HiOutlineDotsVertical
            className="text-2xl cursor-pointer font-bold"
            onClick={() => {
              setSettingPost(!settingPost);
            }}
          />
        )}
        {settingPost && myPost && (
          <div className="box-setting z-10 rounded-md border-gray-200 border-2 absolute left-2 top-full mt-1 bg-white divide-y-2 ">
            {/* تعديل البوست */}
            <li>
              <button className="px-12 py-1" onClick={() => updatePost(post._id, post.body, post.image)}>
                تعديل
              </button>
            </li>
            {/* مسح البوست */}
            <li>
              <button className="px-12 py-1" onClick={() => deletePost(post._id)}>
                مسج
              </button>
            </li>
          </div>
        )}
      </article>
      {/* message of post */}
      <p className="text-center text-gray-700 p-2">{post.body}</p>
      {/* img of post */}
      {post.image && (
        <figure className="bg-cover">
          <Image
            src={post.image || ""}
            alt="image of post "
            className="object-cover w-full max-h-96 h-52 sm:h-80 lg:h-[24rem]"
            width={150}
            height={100}
          />
        </figure>
      )}
      {/* start comments */}
      <div className="pt-5 bg-back p-4">
        <header className="flex justify-between items-center gap-4">
          {/* close and open comment by this button */}
          <TfiComments
            className="text-2xl font-semibold cursor-pointer"
            onClick={() => {
              setFComment(!fComment);
            }}
          />

          <input
            type="text"
            ref={inputComment}
            className="bg-gray-50 border grow-[1] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
            aria-label="write your comment here"
            required
          />

          <IoSendSharp
            className="rotate-180 cursor-pointer text-xl"
            onClick={() => {
              handleSend();
            }}
          />
        </header>
        <div
          className={`overflow-hidden scale-y-0 h-0 opacity-0 origin-top transition-all duration-[1s] ${
            fComment == true ? "scale-y-100 h-auto opacity-[1] overflow-auto" : ""
          }`}
        >
          {/* appear the first comment */}
          {post.comments.length > 0 && (
            <Comment comment={post.comments[0]}  inputComment={inputComment} setIdComment={setIdComment} />
          )}
          {/* all of comments */}
          {showAllComments &&
            allComments?.map((comment) => {
              return (
                <Comment key={comment._id} postId={post._id} comment={comment} getAllComments ={getAllComments} inputComment={inputComment} setIdComment={setIdComment} />
              );
            })}

          <Button
            className="mt-8 w-full"
            onClick={() => {
              setShowAllComments(!showAllComments);
            }}
            aria-label="اقرا لمزيد"
          >
            {!showAllComments ? "اقرا المزيد" : "اقرا اقل"}
          </Button>
        </div>
      </div>
    </div>
  );
}