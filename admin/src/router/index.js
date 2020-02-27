import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/product',
    name: 'Product',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/registerlogin',
    name: 'registerLogin',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RegisterLogin.vue')
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Transaction.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
