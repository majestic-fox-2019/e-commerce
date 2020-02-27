import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Detail from '../views/Detail.vue'
import AddProduct from '../views/AddProduct.vue'
import zFilter from '../views/Filter.vue'
import CustRegis from '../views/CustRegis.vue'
import CustMain from '../views/CustMain.vue'
import Error404 from '../views/error404.vue'
import DetailUser from '../views/DetailUser.vue'
import Cart from '../views/Cart'
import FilterUser from '../views/FilterUser.vue'
import Profile from '../views/Profile'

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
    meta: {Auth: true, Role:true}
  },
  {
    path: '/user',
    name:'CustMain',
    component: CustMain
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
    path: '/user-register',
    name: 'CustRegis',
    component: CustRegis,
    beforeEnter
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {Auth: true , Role:true}
  },
  {
    path: '/products/:id',
    name: 'Detail',
    component: Detail,
    meta: {Auth: true, Role:true}
  },
  {
    path: '/user-products/:id',
    name:'DetailUser',
    component: DetailUser
  },
  {
    path:'/user-cart',
    name:"Cart",
    component: Cart
  },
  {
    path:'/add',
    name:'AddProduct',
    component: AddProduct,
    meta: {Auth: true, Role:true}
  },
  {
    path:'/filter/:category',
    name:'zFilter',
    component: zFilter,
    meta: {Auth: true, Role:true}
  },
  {
    path:'/filter-user/:category',
    name:'FilterUser',
    component: FilterUser
  },
  {
    path:'/user-profile',
    name:'Profile',
    component: Profile
  },
  {
    path: '*',
    name: 'Error404',
    component: Error404,
    meta: {Auth:false, Role: false}
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
      if(to.matched.some(record => record.meta.Role)) {
        if(localStorage.role === "admin") {
          next()
        } else {
          next({name: 'CustMain'})
        }
      } 
    } else {
      next({name:'CustMain'});
    }
  } else {
    next();
  }
})

export default router
