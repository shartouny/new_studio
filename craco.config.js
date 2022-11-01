const path = require(`path`)

// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")]
    }
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@Components": path.resolve(__dirname, "src/components"),
      "@Utils": path.resolve(__dirname, "src/utils"),
      "@Helpers": path.resolve(__dirname, "src/helpers"),
      "@Assets": path.resolve(__dirname, "src/assets"),
      "@Data": path.resolve(__dirname, "src/data")
    }
  }
}
