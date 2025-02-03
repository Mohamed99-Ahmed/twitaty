"use client"
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from "yup"
import Button from '../../components/Button/Button';

import { useRouter } from 'next/navigation';

import { useAppDispatch } from '@/hooks/store.hooks';
import { login } from '@/Store/user.slice';
import Link from 'next/link';


export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  // vlaidation
  const validationSchema = Yup.object({
    email: Yup.string().required("يجب كتابة اسمك").email("ايميل عير صحيح"),
    password: Yup.string().required("يجب كتابة الباسورد").matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm, "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، حرف صغير واحد على الأقل، رقم واحد على الأقل، رمز خاص واحد على الأقل، ويجب أن تكون مكونة من 8 أحرف على الأقل مثل Mona4567@"),
  })
  //   formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: async function (values) {
      // call a funciton login from user slice then if success navigate to home page
      const data = await dispatch(login(values));
      if (data.payload.message == "success") {
        setTimeout(() => {
          navigate.push("/")
        }, 3000)
      }

    },
    validationSchema
  })
  return (
    <section className='signin  '>
      <div className="container min-h-[70vh] flex items-center justify-center">
        <form onSubmit={formik.handleSubmit} className='bg-white p-12 w-full md:w-[80%] space-y-8 rounded-md shadow-md border-sec border-1'>
          {/* email input */}
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
          {/* password input */}
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
          {/* errors messege for email and password */}
          {formik.touched.email && formik.errors.email ? <p className="error text-main m-4 capitalize"> * {formik.errors.email}</p> : ""}
          {formik.touched.password && formik.errors.password ? <p className="error text-main m-4 capitalize"> * {formik.errors.password}</p> : ""}
          {/* button submit or go to sign up */}
          <Button className='w-full ' >تسجيل الدخول</Button>
          <p className='uppercase font-semibold  text-gray-800 text-lg text-center'>اذا لم  تملك حساب</p>
          <Link href="/signup" className='signup text-xl underline text-center block  '>انشاء حساب</Link>
        </form>
      </div>

    </section>
  )
}
