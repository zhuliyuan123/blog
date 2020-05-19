module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    productionSourceMap: false,
    devServer: {
      open: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true
        },
      }
    }
  }