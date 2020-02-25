import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from "../views/Register.vue"
import AdminPage from "../views/AdminPage.vue"
import DetailProduct from "../views/DetailProduct.vue"
import Category from "../views/PerCategory.vue"
import UserPage from "../views/UserProfile.vue"
import Cart from "../views/Cart.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/admin",
    name: "AdminPage",
    component: AdminPage
  },
  {
    path: "/detail/:idProduct",
    name: "detail",
    component: DetailProduct
  },
  {
    path: "/category/:category",
    name: "category",
    component: Category
  },
  {
    path: "/user",
    name: "userpage",
    component: UserPage
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
