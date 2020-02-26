import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Dashboard from '../components/Dashboard.vue'
import Category from '../components/category/Category.vue'
import Menu from '../components/customer/Menu.vue'
import Login from '../components/customer/Login.vue'
import Register from '../components/customer/Register.vue'
import Cart from '../components/customer/Cart.vue'
import jwt from 'jsonwebtoken'
import NotFound from '../components/customer/NotFound404.vue'

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
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next('/404')
      } else {
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'edo tensi')
        console.log(user.role)
        if (user.role == 'admin') {
          next()
        } else if (user.role == 'member') {
          // console.log('404')
          next('/menu/baju')
        } else {
          next('/404')
        }
      }
    },
    children: [
      {
        path: ':category',
        name: 'Category',
        component: Category
      }
    ]
  },
  {
    path: '/menu/:category',
    name: 'Menu',
    component: Menu,
    props: true
    // children: [
    //   {
    //     path: ':category',
    //     props: true
    //     // name: 'Category',
    //     // component: Category
    //   }
    // ]
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        next('/404')
      } else {
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'edo tensi')
        console.log(user.role)
        if (user.role == 'member') {
          next()
        } else {
          // console.log('404')
          next('/404')
        }
      }
    },
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
