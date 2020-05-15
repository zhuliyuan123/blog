import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import http from '@/config/http';
import './assets/app.scss'


Vue.use(ElementUI);
Vue.prototype.$http = http;

Vue.config.productionTip = false


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
