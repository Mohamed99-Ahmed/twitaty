"use client"
import { userType } from '@/types/user.type'
import React, { useRef } from 'react'
import Image from "next/image";
import human from "../../../public/assets/imgs/human.png";
import { FiUploadCloud } from "react-icons/fi";
import Loading from '@/app/loading';
import { useAppSelector } from '@/hooks/store.hooks';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfileUserContent({user}:{user:userType | null}) {
  const {token} = useAppSelector((store)=> store.userSlice);
  const inputFile = useRef<HTMLInputElement>(null);
  // Change profile photo
  async function changeProfilePhoto(){
     const formData = new FormData()
    if (inputFile.current?.files?.[0]) {
      formData.append("photo", inputFile.current.files[0]);
      console.log(inputFile.current.files[0])
    }

    const options = {
      method:"PUT",
      url : "https://linked-posts.routemisr.com/users/upload-photo",
      headers:{
        token 
      },
      data:formData
    }
    try{
    const toastLoading = toast.loading("يتم الان تغيير صورة البروفايل"); 
    const {data} = await axios.request(options);
    console.log(data)
  
      if(data.message == "success"){
        toast.dismiss(toastLoading);
        toast.success("تم تغير صورة البروفايل")
      }
    }catch(data){
        console.log(data);
        toast.error(data)
    }
  }
  if(user){
    return (
      <>
         <header className="rounded bg-white shadow-md flex flex-col gap-4 md:flex-row items-center p-4">
        <figure>
        <input
              id="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.webp"
              className="-z-10 opacity-0 absolute"
              ref={inputFile}
              onChange={()=> changeProfilePhoto()}
            />
            <label 
              className="relative group/parent  cursor-pointer" 
              htmlFor="file-upload"
            >
              <Image
               src={user.photo || human}
                alt="human face logo"
                height={150}
                width={150}
                className=" self-center rounded-full bg-cover"
              />
              {/* upload img icon */}
              <div className="absolute inset-0 bg-gray-300 opacity-80 hidden  group-hover/parent:flex   justify-center items-center" >
                <FiUploadCloud size={20}/>
              </div>
            </label>
        </figure>
            <article className="space-y-4">
              <p className="font-semibold ">الاسم: <span className="text-gray-600 mr-3 font-normal">{user.name}</span></p>
              <p className="font-semibold ">البريد الالكتروني <span className="text-gray-600 mr-3 font-normal">{user.email}</span></p>
              <p className="font-semibold ">تاريخ الميلاد <span className="text-gray-600 mr-3 font-normal">{new Date(`${user.dateOfBirth}`).toLocaleDateString()}</span></p>
              <p className="font-semibold ">تاريخ التسجيل <span className="text-gray-600 mr-3 font-normal">{new Date(`${user.createdAt}`).toLocaleDateString()}</span></p>
            </article>
          </header>
      </>
    )
  }
  else{
    <Loading/>
  }
 
}
