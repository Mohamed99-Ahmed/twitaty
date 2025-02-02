"use client"
import Link from "next/link";
import { useState,  } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { CiLogout } from "react-icons/ci";
import { Kufam  } from 'next/font/google';
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/store.hooks";
import { store } from './../../Store/Store';
import { actions } from "@/Store/user.slice";

const kufam = Kufam({
  subsets: ['arabic'],
  weight: ['400', '700'], // Add weights as needed
});

export default function NavBar() {
  const path = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  let {token} = useAppSelector((store)=> store.userSlice);
  const {LogOut} = actions;
  const dispatch = useAppDispatch();
  // in updatin phase of component

  function toggleNav() {
    setIsOpen((prev) => !prev);
  }
  //logout funciton 
  function logOut(){
    if(token){
      dispatch(LogOut())
      localStorage.removeItem("token")
    setTimeout(()=>{
      router.push("/login")
    },3000)
    }
    else{
      router.push("/signup")
    }
    
    
  } 

  return (
    <>
  
      <nav className={`fixed top-0 left-0 right-0 shadow-bottom bg-white w-full z-40 border-b border-gray-200 ${kufam.className}`}>
        <div className="flex gap-6 flex-wrap md:flex-nowrap items-center justify-between p-4">
          {/* start logo */}
          <a href="/" className="logo">
            <h1 className="text-main uppercase font-bold text-2xl">تويتاتي</h1>
          </a>
          {/* toggle nav */}
          <div className=" m-0 inline-flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
             {/* logout */}
             <a className="logout flex gap-3 items-center cursor-pointer">
                  <button onClick={()=>logOut()}>{token?"تسجيل الخروح":"انشاء حساب"}</button>  
                  <CiLogout  className="text-xl"/>
               </a>
            {/* start toggle  */}
            <div
              className="toogle button flex font-semibold text-xl items-center justify-center cursor-pointer md:hidden"
             
                 >
                  <HiMiniBars3BottomLeft className=" text-2xl font-bold "  onClick={toggleNav}/>
    
            </div>
          </div>
            {/* start items in nav */}
            <div
              className={`items-center grow-[1] justify-center w-full md:flex md:w-auto  md:order-1 ${isOpen?"h-0 overflow-hidden ":""} md:h-auto `}
              id="navbar-sticky"
                  >
              <ul  className="flex flex-col md:p-0  mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white  ">
                <li>
                  <Link
                    href="/"
                    className={ `${path === "/" ? "text-sec font-semibold":""}navLink block py-2 px-3 rounded md:bg-transparent hover:text-main `}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                      الرئيسة 
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className={ `${path === "/profile" ? "text-sec font-semibold":""}navLink block py-2 px-3 rounded md:bg-transparent hover:text-main `}
                    onClick={(e) => 
                      setIsOpen(!isOpen)}
                  >
                    بروفايلي
                  </Link>
                </li>
             
                <li>
              
                </li>
              </ul>
            </div>
            
        </div>

      </nav>
    </>
  );
}
