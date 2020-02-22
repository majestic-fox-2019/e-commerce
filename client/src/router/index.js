import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth',
    name: 'Auth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AuthPage.vue')
  },
  {
    path: '/category/:category',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPage')
  },
  {
    path: '/panel',
    name: 'AdminPanel',
    component: () => import('@/views/AdminPage')
  },
  {
    path: '/details/:id',
    name: 'DetailPage',
    component: () => import('@/views/ProductDetail')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
