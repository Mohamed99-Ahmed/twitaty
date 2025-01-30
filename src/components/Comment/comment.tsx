"use client"
import React, { ReactElement, useState } from 'react'
import { commentType } from '@/types/post.type';
import Image from 'next/image';
import human from "../../../public/assets/imgs/human.png";
import { HiOutlineDotsVertical } from "react-icons/hi";
import toast from 'react-hot-toast';
import axios from 'axios';



export default function Comment({comment,inputComment,setIdComment}:{comment:commentType,inputComment:HTMLInputElement,setIdComment:React.Dispatch<React.SetStateAction<string>>}) {
    // States
const [settingComment, setSettingComment] = useState<boolean>(false);
// handle img with path
   function handleImg(path: string | undefined) {
    if (!path || path.includes("undefined")) return human;
    return path;
  }
    // update comment 
    function updateComment(id:string){
      inputComment.current.value = comment.content;  // change the input value to oldest values
      setSettingComment(false);
      setIdComment(id)  // send id of comment 
      toast.success("تستطيع الان التعديل علي التعليق")
    }
    // Delete comment
    async function deleteComment(id: string) {
        console.log(id);
        setSettingComment(false);
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
  return (
    <>  
           <article
                          key={comment._id}
                          className="flex justify-between gap-4 mt-2 border-t-2 pt-4 items-start relative"
                          >
                          <h3 className="grid  gap-x-2 items-center  grid-cols-[40px,1fr,1fr]  grow-[1]">
                            <Image
                              src={handleImg(comment.commentCreator.photo)}
                              alt="Human profile"
                              className="col-span-1 "
                              height={30}
                              width={30}
                            />
                            {/* name of user that write post */}
                            <p className="col-span-2  ">
                              <span>{comment.commentCreator.name}</span> <br />
                              <span>
                                {" "}
                                {new Date(`${comment.createdAt}`).toLocaleDateString()}
                              </span>
                            </p>
                          </h3>
                          <p className="text-center text-gray-900 p-2 grow-[1]">
                            {comment.content}
                          </p>
                          <HiOutlineDotsVertical
                            className="text-2xl cursor-pointer font-bold"
                            onClick={() => {
                              setSettingComment(!settingComment);
                            }}
                          />
                          {settingComment && (
                            <div className="box-setting z-10 rounded-md border-gray-200 border-2 absolute left-2 top-8 mt-1 bg-white divide-y-2 ">
                              {/* تعديل البوست */}
                              <li>
                                <button className="px-12 py-1" onClick={()=>{updateComment(comment._id)}}>تعديل</button>
                              </li>
                              {/* مسح البوست */}
                              <li>
                                <button className="px-12 py-1" onClick={()=>{deleteComment(comment._id)}}>مسج</button>
                              </li>
                            </div>
                          )}
                        </article>
    </>
  )
}
