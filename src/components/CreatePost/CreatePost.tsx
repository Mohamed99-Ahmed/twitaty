"use client"
import React, { useRef, useState } from "react";
import Button from '../Button/Button';
import toast from "react-hot-toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";

export default function CreatePost({className}:{className?:string}) {
  const text = useRef<HTMLTextAreaElement>(null);
  const inputFile = useRef<HTMLInputElement>(null);
  const [nameImg, setNameImg] = useState<string>("");
  const {token} = useAppSelector((store)=> store.userSlice);

  // create post function
  async function createPost() {
    const formData = new FormData();
    
    if (text.current) {
      formData.append("body", text.current.value);
    }
    
    if (inputFile.current?.files?.[0]) {
      formData.append("image", inputFile.current.files[0]);
      console.log(inputFile.current.files[0].name)
    }

    const options = {
      method: "POST",
      url: "https://linked-posts.routemisr.com/posts",
      headers: {
        token
      },
      data: formData,
    };
    const toastBar = toast.loading(` اضافة بوست`);
    try {
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.dismiss(toastBar);
        console.log(data);
        return data;
      }
    } catch (data) {
      toast.dismiss(toastBar);
      console.log(data)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setNameImg(event.target.files[0].name);
      console.log(nameImg)
    }
  };

  return (
    <section className={`create-post bg-white p-4 flex flex-col gap-4 mb-20 ${className}`}>
      <textarea
        id="message"
        rows={4}
        className="block p-2.5 max-h-60 min-h-30 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="اكتب ها محتوي البوست"
        ref={text}
      ></textarea>

      <div className="put img flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 "
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            />
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round" // Changed from strokeLinecap to strokeLinejoin
                strokeWidth="2" // Changed from stroke-width to strokeWidth
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            { nameImg ? `${nameImg}` : <><span className="font-semibold">Click to upload</span> or drag and drop</>}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG , PNG , jpeg , bmp, webp ,  JPG or GIF 
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.webp"
            className="hidden"
            ref={inputFile}
            onChange={handleFileChange}
          />
        </label>
      </div>
      <Button onClick={()=>{createPost()}}> انشاء بوست</Button>
    </section>
  );
}
