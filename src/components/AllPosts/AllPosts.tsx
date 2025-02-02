"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { postType } from '@/types/post.type';
import { useAppDispatch, useAppSelector } from '@/hooks/store.hooks';
import Post from './../Post/Post';
import Loading from '@/app/loading';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
// swiper library
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { actions } from '@/Store/user.slice';

export default function AllPosts() {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
  const { token } = useAppSelector((store) => store.userSlice);
  const {setToken} = actions
// get token
useEffect(() => {
  const token = localStorage.getItem("token");
  dispatch(setToken(token)); // Dispatch an action to set the token
}, [ dispatch(setToken(token))]);
  // Fetch posts for the current page
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts", currentPage], // Include currentPage in the query key
    queryFn: () => getAllPosts(currentPage), // Fetch data for the current page
  });

  // Function to fetch posts
  async function getAllPosts(page: number) {
    const options = {
      method: "GET",
      url: `https://linked-posts.routemisr.com/posts?page=${page}`,
      headers: {
        token,
      },
    };
    const response = await axios.request(options);
    return response.data; // Return the data directly
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <Loading className="flex justify-center" />;
  if (isError)
    return (
      <div className="flex justify-center text-main">
        <Link href="/signup" className="underline">
          ليس لديك حساب قم بانشاء حساب
        </Link>
      </div>
    );

  return (
    <>
      <div className="space-y-8">
        {data?.posts.map((post: postType) => (
          <Post key={post._id} post={post} myPost={false} />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center mt-8 space-x-4 w-[80%]  mx-auto ">
        <button
          onClick={() => handlePageChange(currentPage -  1)}
           disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <Swiper
          spaceBetween={30}
    
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          
        >
          {Array.from({ length: data?.paginationInfo.numberOfPages || 1 }, (_, i) => (
            <SwiperSlide key={i + 1}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 ${currentPage === i + 1 ? 'bg-main text-white' : 'bg-sec text-white'
                  } rounded`}
              >
                {i + 1}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === data?.paginationInfo.numberOfPages}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}