import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Dashboard from '../components/Dashboard.vue'
import Category from '../components/category/Category.vue'
import Login from '../components/customer/Login.vue'
import jwt from 'jsonwebtoken'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('token')) {
        console.log('404')
      } else {
        const token = localStorage.getItem('token')
        const user = jwt.verify(token, 'edo tensi')
        console.log(user.role)
        if (user.role == 'admin') {
          next()
        } else {
          console.log('404')
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
