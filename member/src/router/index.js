import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../components/Auth'
import Cart from '../views/Cart'
import Payment from '../views/Payment'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth
  },
  {
    path: '/carts',
    name: 'Carts',
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) {
        next()
      } else {
        next('/login')
      }
    },
    component: Cart
  },
  {
    path: '/payment',
    name: 'Payment',
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) {
        next()
      } else {
        next('/login')
      }
    },
    component: Payment
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
