import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

function login (to, from, next) {
  if (localStorage.getItem('token')) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    beforeEnter: login,
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/cart',
        name: 'Cart',
        component: Cart
      },
      {
        path: '/',
        name: 'Product',
        component: () => import('../views/Product.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
