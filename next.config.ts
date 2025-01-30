import type { NextConfig } from "next";
// https://linked-posts.routemisr.com/uploads/default-profile.png
const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[{
      protocol:"https",
      hostname:"linked-posts.routemisr.com",
      pathname:"/uploads/**"
    }]
  }
};

export default nextConfig;
