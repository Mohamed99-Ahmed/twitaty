"use client"
import React, { useState, RefObject } from 'react'
import { commentType } from '@/types/post.type';
import Image from 'next/image';
import human from "../../../public/assets/imgs/human.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast from 'react-hot-toast';
import axios from 'axios';
// types interface for props
interface props {
  comment?: commentType,
  inputComment?: RefObject<HTMLInputElement | null>,
  setIdComment?: React.Dispatch<React.SetStateAction<string>>,
  getAllComments?: (postId: string) => void, postId: string
}

export default function Comment({ comment, postId, inputComment, setIdComment, getAllComments }: props) {
  // States
  const [settingComment, setSettingComment] = useState<boolean>(false);
  // handle img with path
  function handleImg(path: string | undefined) {
    // if not have path (come from api) of path include (undefien) return human relative image 
    if (!path || path.includes("undefined")) return human;
    // elese return path
    return path;
  }
  // update comment 
  function updateComment(id: string) {
    if (inputComment?.current) {
      if (comment) {
        // put input for comment content so now i can replace it or add some text to it
        inputComment.current.value = comment.content;
      }
    }
    // close the sitting comment bar
    setSettingComment(false);
    if (setIdComment) {
      // send id of comment to parent to update the comment
      setIdComment(id);
    }
    toast.success("تستطيع الان التعديل علي التعليق")
  }
  // Delete comment
  async function deleteComment(id: string) {
    // close the sitting comment bar
    setSettingComment(false);
    // options of api
    const options = {
      method: "DELETE",
      url: `https://linked-posts.routemisr.com/comments/${id}`,
      headers: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjc5MmFlNmQ4MDNmNzZiZjAwOTJhNzBkIiwiaWF0IjoxNzM3NjY2MTc5fQ.yxwiMUFGqDhwLaLNAmdOBR0QibkjH7NF9IKRaFhYfFQ",
      },
    };
    const toastBar = toast.loading(` محاولة مسح التعليق `);
    try {
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.dismiss(toastBar);
        // after delete comment getAllComments to display it after delete
        if (getAllComments) {
          getAllComments(postId);
        }
        toast.success(`تم مسح التعليق بنجاح`);
        console.log(data);
        return data;
      }
    } catch (data) {
      toast.dismiss(toastBar);
      toast.error("ليس لديك الصلاحية لمسح التعليق");
      console.log(data);
    }
  }
  if (comment) {
    return (
      <>
        <article
          key={comment._id}
          className="flex justify-between gap-4 mt-2 border-t-2 pt-4 items-start relative"
        >
          {/* figure of user that type comment + figcaption (name and date of create commment) */}
          <figure className="grid  gap-x-2 items-center  grid-cols-[40px,1fr,1fr]  grow-[1]">
            <Image
              src={handleImg(comment.commentCreator.photo)}
              alt="Human profile"
              className="col-span-1 "
              height={30}
              width={30}
            />
            {/* name of user that write post */}
            <figcaption className="col-span-2  ">
              <span>{comment.commentCreator.name}</span> <br />
              <span>
                {" "}
                {new Date(`${comment.createdAt}`).toLocaleDateString()}
              </span>
            </figcaption>
          </figure>
          {/* comment text */}
          <p className="text-center text-gray-900 p-2 grow-[1]">
            {comment.content}
          </p>
          {/* comment setting icon */}
          <HiOutlineDotsVertical
            className="text-2xl cursor-pointer font-bold"
            onClick={() => {
              setSettingComment(!settingComment);
            }}
          />
          {/* setting bar   */}
          {settingComment && (
            <div className="box-setting z-10 rounded-md border-gray-200 border-2 absolute left-2 top-8 mt-1 bg-white divide-y-2 ">
              {/* تعديل الكومنت */}
              <li>
                <button className="px-12 py-1" onClick={() => { updateComment(comment._id) }}>تعديل</button>
              </li>
              {/* مسح الكومنت */}
              <li>
                <button className="px-12 py-1" onClick={() => { deleteComment(comment._id) }}>مسج</button>
              </li>
            </div>
          )}
        </article>
      </>
    )
  }

}
