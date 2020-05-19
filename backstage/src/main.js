import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/config/http';
import './assets/app.scss'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import "mavon-editor/dist/highlightjs/highlight.min.js";
import "mavon-editor/dist/katex/katex";
import '../src/assets/css/markdown/dark.css' //引入代码高亮的css
import hljs from 'highlight.js'
Vue.use(mavonEditor)
Vue.use(ElementUI);
Vue.prototype.$http = http;

Vue.config.productionTip = false
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
})



router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    sessionStorage.removeItem('Authorization');
    next();
    return;
  }
  if(sessionStorage.getItem('Authorization')){
    next();
  }else{
    next('/login')
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
