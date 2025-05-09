/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        gray: {
          "100": "#111",
          "200": "#030b0d",
          "300": "rgba(0, 0, 0, 0.5)",
          "400": "rgba(0, 0, 0, 0.03)",
          "500": "rgba(0, 0, 0, 0.3)",
          "600": "rgba(0, 0, 0, 0.8)",
        },
        snow: "#fff5f5",
        red: {
          "100": "#ff0202",
          "200": "#ff0000",
        },
        gainsboro: {
          "100": "#d9d9d9",
          "200": "rgba(217, 217, 217, 0.2)",
        },
        steelblue: "#7f9cc6",
        darkslategray: {
          "100": "#204b51",
          "200": "#2c3f51",
          "300": "#333",
        },
        whitesmoke: "#f0f5f6",
        lightsteelblue: "#8fa9c8",
        dimgray: "#666",
        "line-icon": "#33363f",
      },
      spacing: {},
      fontFamily: {
        "sf-pro-text": "'SF Pro Text'",
        roboto: "Roboto",
        comfortaa: "Comfortaa",
        "roboto-flex": "'Roboto Flex'",
        "roboto-mono": "'Roboto Mono'",
        poppins: "Poppins",
      },
      borderRadius: {
        "3xs": "10px",
        "167xl": "186px",
        "11xl": "30px",
        "124xl": "143px",
        mini: "15px",
        xl: "20px",
        "12xs": "1px",
      },
    },
    fontSize: {
      mini: "0.94rem",
      base: "1rem",
      smi: "0.81rem",
      "17xl": "2.25rem",
      "2xs": "0.69rem",
      "3xs": "0.63rem",
      mid: "1.06rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};