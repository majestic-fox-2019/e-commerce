import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Product from '../views/Product.vue'
import RegisterAdmin from '../views/RegisterAdmin.vue'
import CardProduct from '@/components/CardProduct.vue'
import Cart from '../views/Cart.vue'
import Transaction from '../views/Transaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: CardProduct
      },
      {
        path: '/cart',
        component: Cart
      }
    ]
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
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Login
  },
  {
    path: '/admin',
    name: 'RegisterAdmin',
    component: RegisterAdmin
  },
  {
    path: '/product',
    name: 'Product',
    component: Product
  },
  {
    path: '/transaction',
    name: 'Transaction',
    component: Transaction
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
