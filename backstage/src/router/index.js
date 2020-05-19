import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import articleList from '../views/articleList.vue'
import details from '../views/details.vue'
import update from '../views/update.vue'
import setting from '../views/setting.vue'
import publish from '../views/publish.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: {
      name:'articlelist'
    },
    children:[
      {
        path:'articleList',
        name:'articlelist',
        component:articleList
      },
      {
        path:'details/:id',
        name:'details',
        component:details
      },
      {
        path:'update/:id',
        name:'update',
        component:update
      },
      {
        path:'setting',
        name:'setting',
        component:setting,
      },
      {
        path:'publish',
        name:'publish',
        component:publish
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
