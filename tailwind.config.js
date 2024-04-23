/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xss:"320px",
      xs: "420px",
      // => @media (min-width: 450px) { ... }

      sm: "575px",
      // => @media (min-width: 576px) { ... }

      md: "768px",

      mdb: "800px",
      // => @media (min-width: 768px) { ... }

      lg: "992px",
      // => @media (min-width: 992px) { ... }
      xl: "1201px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1420px",

      "3xl": "1620px",

      "4xl": "1820px",
      "4xxl":"2100px",
      "5xl": "2200px",  
      "6xl":"2510px",
      "7xl":"2820px"
    },
    extend: {
      colors: {
        current: "currentColor",
        transparent: "transparent",
        white: "#FFFFFF",
        black: "#121723",
        dark: "#1D2430",
        primary: "#C39D63",
        primary50: "#DBC4A1",
        yellow: "#FBB040",
        "body-color": "#788293",
        "body-color-dark": "#959CB1",
        "gray-dark": "#1E232E",
        "gray-light": "#F0F2F9",
        stroke: "#E3E8EF",
        "stroke-dark": "#353943",
        "bg-color-dark": "#171C28",
        secondary: "#F9FAFA",
        secondary50: "#E0E1E1",
        primaryDisabled: "#E1CEB1",
        tablebg: "#FCFAF7",
        tableBorder: "#E7D8C1",
        rowbg: "rgba(195, 157, 99, 0.05)",
        gray: "#444237",
        "text-gray": "#5C6574",
        footerBg: "#181410",
        cardbg: "#FEFDFB",
        textFieldBg: "rgba(139,137,135,0.5)",
        footerdiv: "rgba(210, 203, 173, 0.20)",
        textMain: "#4A423B",
        inputBorder: "#DDD",
        textRed: "#D93F21",
        lightGray: "#7E7E7E",
        buttonHover: "#B88B47",
        gray600: "#7D7D7D",
        footerText:"#F5F5F5",
        cardColor:"rgba(195, 157, 99, 0.40)",
        primaryMain:"#F3EBE0",
        textgrey:"#7B858F"
      },
      lineHeight:{
        '12':'4rem'
      },

      boxShadow: {
        signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
        one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
        two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
        sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
        "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
        "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
        submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
        "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
        btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
        "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
      },
      spacing: {
        76:"18.75rem",
        86: "23rem",
        90: "23.73rem",
        92: "23.9rem",
        98: "26rem",
        100: "27rem",
        102: "28rem",
        103: "29rem",
        104: "31rem",
        105:"32rem",
        106: "38rem",
        108: "40rem",
        112: "42rem",
        116: "44rem",
        120: "48rem",
        124: "50rem",
        126: "52rem",
        127: "55rem",
        128: "60rem",
        130: "68rem",
        135: "79rem",
        140: "89rem",
        145:"99rem",
        160: "137rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("@tailwindcss/typography"),
  ],
};
