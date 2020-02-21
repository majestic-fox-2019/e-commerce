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
    path: '/category',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RegisterLogin.vue')
  },
  {
    path: '/additem',
    name: 'addItem',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AddItem.vue')
  },
  {
    path: '/category/:category',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Category.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
