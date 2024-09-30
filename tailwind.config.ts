import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '16px',
        screens: {
          '2xl': '1272px'
        },
      },
      screens: {
        'tablet': '1367px',
        'lg': '1025px',
        'mobile': '450px',
        'mobile-xs': '380px',
      },
      backgroundImage: {
        "m-blue-green-gradient": "linear-gradient(90deg, #08FFB8 0%, #1EB6DA 42%, #477FF7 100%)",
      },
      colors: {
        //template's catalog colors
        'm-blue-dark': '#2B2548',
        'm-green-light': '#07F6BA',
        //template's catalog colors
        't-dark-text': '#1E1E1E',
        't-blue-dark': '#0E0050',
        't-blue': '#3372F9',
        't-gray': '#BFC1CA',
        't-gray-text': '#B3B5BE',
        't-green': '#1EBF91',
        't-red': '#FF0A0A',
        't-pale': '#F6F5F8',
      },
      fontSize: {
        '3xs': '8px',
        'xxs': '10px',
      },
      keyframes: {
        fillBar: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        fillBar: 'fillBar forwards linear',
        blink: 'blink 1s step-end infinite',
      },
      content: {
        'arrow': 'url("/assets/images/content-arrow.svg")',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
