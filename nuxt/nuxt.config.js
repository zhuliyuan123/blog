
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'maximum-scale=1.0,minimum-scale=1.0,user-scalable=no,width=device-width,initial-scale=1.0'},
      { hid: 'description', name: 'description', content: process.env.npm_package_description || 'julian的个人博客' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Global CSS
  */
  css: ['@/assets/css/main.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules:[],
  loader:[
    {
      test:/\.scss$/,
      loaders:'style-loader!css-loader!sass-loader'
    }
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    vendor:['axios'],
    postcss:{
      plugins: {
        'autoprefixer':{
          overrideBrowserslist: ['iOS >= 7', 'Android >= 4','ie >= 8']
        },
        'postcss-pxtorem':{
          rootValue: 32,
          propWhiteList: ['*'],
        }
      }
    }

  }
}
