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
    component: () => import('../views/AuthPage.vue')
  },
  {
    path: '/category/:category',
    name: 'CategoryPage',
    component: () => import('@/views/CategoryPage')
  },
  {
    path: '/carts',
    name: 'Carts',
    component: () => import('@/views/CartPage')
  },
  {
    path: '/details/:id',
    name: 'DetailPage',
    component: () => import('@/views/ProductDetail')
  },
  {
    path: '/panel',
    name: 'AdminPanel',
    component: () => import('@/views/AdminPage'),
    children: [
      {
        path: 'income',
        name: 'IncomeHistory',
        component: () => import('@/components/Income')
      }
    ]
  },
  {
    path: '/user/transaction',
    name: 'TransactionHistory',
    component: () => import('@/views/TransactionPage')
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: () => import('@/views/ErrorPage')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
