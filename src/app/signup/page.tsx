"use client";
import { Formik, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import Button from "../../components/Button/Button";

import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/hooks/store.hooks";
import { login } from "@/Store/user.slice";
import axios from "axios";
import toast from "react-hot-toast";

// import { login } from './../../Store/user.slice';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useRouter();

  // vlaidation
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("يجب كتابة اسمك")
      .matches(/^[A-Za-zأ-ي]{4,}$/, "يجب ان يحتوي اسمك علي 4 حروف حتي 20 حرف"),
    email: Yup.string().required("الايميل يجب كتابته").email("ايميل خاطي"),
    password: Yup.string()
      .required("الباسورد يجب كتابته")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm,
        "At least One (UpperCase , LowerCase , degit, character space) and at least 8 letters"
      ),
    rePassword: Yup.string()
      .required("الباسورد يجب كتابته")
      .oneOf([Yup.ref("password")], "الباسوردات يجب أن تتطابق"),
  });
  //   formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "2018-07-22",
      gender: "male",
    },
    onSubmit: async function (values) {
      const loadToast = toast.loading("انشاء حساب ...........");
      try {
        const { data } = await axios.post(
          "https://linked-posts.routemisr.com/users/signup",
          {
            name: values.name,
            email: values.email,
            password: values.password,
            rePassword: values.rePassword,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
          }
        );

        toast.dismiss(loadToast);

        if (data.message === "success") {
          toast.success("تهانينا تم انشاء حساب بنجاح قم بتسجيل الدخول");
          console.log(data);
          setTimeout(() => {
            navigate.push("/login");
          }, 3000);
          return data;
        } else if ((data.message = "Request failed with status code 409")) {
          toast.error("هذا الحساب مسجل مسبقا برجاء ادخال حساب اخر ");
        } else {
          throw new Error(data.message || "Login failed");
        }
      } catch (error) {
        toast.dismiss(loadToast);
        toast.error("هذا الحساب مسجل مسبقا برجاء ادخال حساب اخر ");
      }
    },
    validationSchema,
  });
  return (
    <section className="signin min-h-[70vh] flex  items-center">
      <div className="container ">
        <form
          onSubmit={formik.handleSubmit}
          className="bg-white p-12 space-y-8 rounded-md shadow-md border-sec border-1"
        >
          {/* name */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              value={formik.values.name}
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sec peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sec  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              الاسم
            </label>
          </div>
          {formik.touched.name && formik.errors.name ? (
            <p className="error text-main m-4 capitalize">
              {" "}
              * {formik.errors.name}
            </p>
          ) : (
            ""
          )}
          {/* email */}
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
          {formik.touched.email && formik.errors.email ? (
            <p className="error text-main m-4 capitalize">
              {" "}
              * {formik.errors.email}
            </p>
          ) : (
            ""
          )}
          {/* password */}
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
          {formik.touched.password && formik.errors.password ? (
            <p className="error text-main m-4 capitalize">
              {" "}
              * {formik.errors.password}
            </p>
          ) : (
            ""
          )}
          {/* rePassword */}
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="floating_rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-sec peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_rePassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sec  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              اعد كتابة الباسورد
            </label>
          </div>
          {formik.touched.rePassword && formik.errors.rePassword ? (
            <p className="error text-main m-4 capitalize">
              {" "}
              * {formik.errors.rePassword}
            </p>
          ) : (
            ""
          )}

          {/* date of Birth */}

          <div className=" group">
            <label
              htmlFor="dateOfBirth"
              className=" text-sm text-gray-500 mb-2"
            >
              تاريح الميلاد
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="dateOfBirth"
              aria-label="date of birth"
              min="1920-01-01"
              max="2024-12-31"
              className="block"
              required
            />
          </div>
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <p className="error text-main m-4 capitalize">
              {" "}
              * {formik.errors.dateOfBirth}
            </p>
          ) : (
            ""
          )}
          {/* gender  */}
          <div className="gender">
            <p className="text-sm text-gray-500 ">الجنس</p>  
            {/*male */}
            <div className="flex items-center mb-4 mt-1">
              <input
                id="default-radio-1"

                type="radio"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="gender"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
              />
              <label
                htmlFor="default-radio-1"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                ذكر
              </label>
            </div>
          {/* female */}
            <div className="flex items-center mt-1 ">
              <input
                id="default-radio-2"
                type="radio"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="gender"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
              />
              <label
                htmlFor="dateOfBirth"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                أنثس
              </label>
            </div>
          </div>
          <Button className="w-full ">انشاء حياب</Button>
        </form>
      </div>
    </section>
  );
}
