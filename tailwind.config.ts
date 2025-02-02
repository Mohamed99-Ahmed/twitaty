import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
       // change in some style of tailwind 
       container: {
        center: true, // Center the container
        padding: '1rem', // Default padding for all screens
        screens: {
          sm: '600px', // Full width on small screens
          md: '550px', // Custom width on medium screens
          lg: '700px', // Custom width on large screens
          xl: '750px', // Custom width on extra-large screens
          '2xl': '800px', // Custom width on 2XL screens
        },
      },
    extend: {
        // Adding some style to my tailwind utilites
        boxShadow: {
          'bottom': ' 0 1px 7px #bdbdbd ',
          'top': ' 0 -1px 7px #bdbdbd ',

        },
        colors:{
          main:"#DC3545",
          sec : "#FE6A59",
          back : "#F5F4F4"
        },
    },
  },
  plugins: [],
} satisfies Config;
