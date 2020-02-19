import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import AddProduct from '../views/AddProduct.vue'
import Filter from '../views/Filter.vue'

Vue.use(VueRouter)

const beforeEnter = (to, from, next) => {
  if (localStorage.getItem('token')) {
    next({name: 'Home'});
  } else {
    next();
  }
};

const routes = [
  {
    path: '/admin',
    name: 'Home',
    component: Home,
    meta: {Auth: true}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/',
    name:'Login',
    component: Login,
    beforeEnter,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {Auth: true}
  },
  {
    path: '/products/:id',
    name: 'Detail',
    component: Detail,
    meta: {Auth: true}
  },
  {
    path:'/add',
    name:'AddProduct',
    component: AddProduct,
    meta: {Auth: true}
  },
  {
    path:'/filter/:category',
    name:'Filter',
    component: Filter,
    meta: {Auth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.Auth)) {
    if(localStorage.token) {
      if(localStorage.role === "admin") {
        next()
      } else {
        next({path: from.path});
      }
    } else {
      next({name:'Login'});
    }
  } else {
    next();
  }
})

export default router
