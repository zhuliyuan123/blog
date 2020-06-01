module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
    productionSourceMap: false,
    devServer: {
      open: true,
      proxy: {
        "/api": {
          target: "http://api.zhuliyuan123.com",
          changeOrigin: true
        },
      }
    }
  }