import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import StorePage from '../views/StorePage.vue'
import ProductCard from '../components/ProductCard'
import Login from '../views/Login.vue'
import Cart from '../views/Cart.vue'
import History from '../views/History'
import Page404 from '../views/404.vue'
import axios from '../api/axios'

Vue.use(VueRouter)

const routes = [
  {
    path: "*",
    name: "Page404",
    component: Page404
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: '/',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Store',
        component: StorePage,
        children: [
          {
            path: '/category/:category',
            name: 'Products',
            component: ProductCard
          },
        ]
      },
      {
        path: '/cart',
        name: 'Cart',
        meta: { requiresAuth: true },
        component: Cart,
      },
      {
        path: '/activity',
        name: 'Activity',
        meta: { requiresAuth: true },
        component: History
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({ name: "Store" })
    } else {
      axios
        .get('/users/verify', {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          next()
        })
        .catch(() => {
          next({ name: "Login" })
        })
    }
  } else {
    if (to.name == 'Login' && localStorage.token) {
      axios
        .get('/users/verify', {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          next({ name: "Store" })
        })
        .catch(() => {
          next({ name: "Login" })
        })
    } else {
      next()
    }
  }
})

export default router
