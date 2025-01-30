"use client"
import { Formik, useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import Button from '../../components/Button/Button';

import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/store.hooks';
import { login } from '@/Store/user.slice';


// import { login } from './../../Store/user.slice';



export default function Login() {
    const dispatch = useAppDispatch();
    const navigate = useRouter();
          
    // vlaidation
    const validationSchema = Yup.object({
        email: Yup.string().required("Your Email is required").email("Not Valid email"),
        password: Yup.string().required("password  is required").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,"At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"),
      })
    //   formik
    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        onSubmit:async function (values){  
          const data = await dispatch(login(values));
            console.log(data)
           if(data.payload.message == "success"){
            setTimeout(()=>{
              navigate.push("/")
             },3000)
           }
            
        },
        validationSchema
    })
  return (
    <section className='signin  '>
        <div className="container min-h-[70vh] flex items-center justify-center">
            <form onSubmit={formik.handleSubmit} className='bg-white p-12 w-full md:w-[80%] space-y-8 rounded-md shadow-md border-sec border-1'>
            <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              value={formik.values.email}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sec peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sec  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              البريد الالكتروني
            </label>
             </div>
             <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sec peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sec  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              الباسورد
            </label>
          </div>
           {formik.touched.email && formik.errors.email? <p className="error text-main m-4 capitalize"> * {formik.errors.email}</p>:""}
            {formik.touched.password && formik.errors.password? <p className="error text-main m-4 capitalize"> * {formik.errors.password }</p>:""}
          <Button className='w-full ' >تسجيل الدخول</Button>
            </form>
        </div>

    </section>
  )
}
