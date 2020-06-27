import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import AdminPage from '../views/AdminPage.vue'
import Dashboard from '../components/Admin/Dashboard.vue'
import Products from '../components/Admin/ProductList.vue'
import Banners from '../components/Admin/BannerList.vue'
import DetailPage from '../views/DetailPage.vue'
import Cart from '../views/Cart.vue'
import ConfirmOrder from '../views/ConfirmOrder.vue'
import OrderList from '../views/OrderList'
import Order from '../components/Admin/OrderList'
import ConfirmedOrder from '../components/User/ConfirmedOrder.vue'
import ArrivedOrder from '../components/User/ArrivedOrder.vue'
import OrderDone from '../components/User/OrderDone.vue'
import TransactionList from '../components/Admin/TransactionList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.token && localStorage.isAdmin) {
        next('/admin/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: '/admin',
    name: 'AdminPage',
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      if (!localStorage.token) {
        next('/')
      } else if (localStorage.token && localStorage.isAdmin) {
        next()
      } else {
        next('/')
      }
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard
      },
      {
        path: 'products',
        name: 'Products',
        component: Products
      },
      {
        path: 'banners',
        name: 'Banners',
        component: Banners
      },
      {
        path: 'orders',
        name: 'Orders',
        component: Order
      },
      {
        path: 'transactions',
        name: 'Transactions',
        component: TransactionList
      }
    ]
  },
  {
    path: '/order-list',
    component: OrderList,
    children: [
      {
        path: '',
        component: ConfirmedOrder
      },
      {
        path: 'arrived',
        component: ArrivedOrder
      },
      {
        path: 'done',
        component: OrderDone
      }
    ]
  },
  {
    path: '/:id/:name',
    name: 'DetailPage',
    component: DetailPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (localStorage.token && !localStorage.isAdmin) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/checkout/:username/confirm',
    name: 'ConfirmOrder',
    component: ConfirmOrder,
    beforeEnter: (to, from, next) => {
      if (localStorage.token && !localStorage.isAdmin) {
        next()
      } else {
        next('/')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
