import type { Metadata } from "next";
import {Rubik  } from 'next/font/google';
import "./globals.css";
import { Toaster } from "react-hot-toast";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/components/ReduxPorvider/ReduxProvider";

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Specify desired weights
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={rubik.className}
      >
        <Toaster position="top-right" />
        <ReduxProvider>
          <NavBar />
          <div className="min-h-screen  bg-back">
            <div className="mt-[68px]  py-10 flex-grow relative ">
         
                 {children}
               
            </div>
          </div>
            <Footer />
            </ReduxProvider>
      </body>
    </html>
  );
}
