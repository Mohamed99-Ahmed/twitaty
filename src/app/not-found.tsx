import React from 'react';
import notfound from "../../public/assets/imgs/notfound.svg";
import Image from 'next/image';
export default function NotFoundProps () {
  return (
    <figure className='flex justify-center items-center min-h-[50vh]'>
        <Image src={notfound.src} alt="not found page" />
    </figure> 
  )
}