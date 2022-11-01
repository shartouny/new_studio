module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    placeholderColor: {
      purple2B3377: "#2B3377"
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
      0.25: "0.25px",
      1.5: "1.50px"
    },
    extend: {
      colors: {
        purple2B3377: "#2B3377",
        purple1E2351: "#1E2351",
        grayF0F0F0: "#F0F0F0",
        grayC4C4C4: "#C4C4C4",
        grayFAFAFA: "#FAFAFA",
        darkGray: "#AFAFAF",
        grayEBEBEB: "rgb(235, 235, 235,0.4)"
      },
      spacing: {
        100: "28rem"
      }
    },
    fontFamily: {
      Rubik: ["Rubik"],
      Bison: ["Bison"]
    },
    fill: {
      gray: "#C4C4C4",
      selected: "#2B3377",
      white: "#fff",
      darkGray: "#AFAFAF"
    },
    stroke: {
      gray: "#C4C4C4",
      selected: "#2B3377",
      white: "#fff",
      darkGray: "#AFAFAF"
    }
  },
  variants: {
    extend: {
      fill: ["hover", "focus"],
      stroke: ["hover", "focus"]
    }
  },
  plugins: []
}
