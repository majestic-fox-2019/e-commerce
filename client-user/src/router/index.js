import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import History from '../views/History.vue'
import List from '../components/List.vue'
import page404 from '../components/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: page404,
    name: '404',
  },
  {
    path: '/history',
    name:'History',
    component: History,
    meta: { requiresAuth: true },
  },
  {
    path: '/',
    component: Home,
    props:true,
    children:[
      {
        path:'/',
        name:'Home',
        component: List
      },
      {
        path:'/:id',
        name:'Home.id',
        component: List,
        props:true,
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
