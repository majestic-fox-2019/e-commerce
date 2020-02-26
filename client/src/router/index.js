import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Login from '@/components/Login/Login.vue'
import Dashboard from '@/components/Dashboard/Dashboard.vue'
import Users from '@/components/Users/Users.vue'
import Categories from '@/components/Categories/Categories.vue'
import Products from '@/components/Products/Products.vue'
import Transactions from '@/components/Transactions/Transactions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: '/',
    redirect: '/dashboard',
    name: 'mainlayout',
    component: MainLayout,
    meta: { 
      requiresAuth: true,
      role: true
    },
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: { 
          requiresAuth: true,
          role: true
        }
      },
      {
        path: '/users',
        name: 'users',
        component: Users,
        meta: { 
          requiresAuth: true,
          role: true
        }
      },
      {
        path: '/categories',
        name: 'categories',
        component: Categories,
        meta: { 
          requiresAuth: true,
          role: true
        }
      },
      {
        path: '/products',
        name: 'products',
        component: Products,
        meta: { 
          requiresAuth: true,
          role: true
        }
      },
      {
        path: '/transactions',
        name: 'transactions',
        component: Transactions,
        meta: { 
          requiresAuth: true,
          role: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if(!localStorage.getItem('token')) {
      next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      })
    }else{
      let user = JSON.parse(localStorage.getItem('user'))
      if(to.matched.some(record => record.meta.role)) {
        if(user.role == 'superadmin' || user.role == 'admin'){
          next()
        }
        else{
          next({ path: '/dashboard'})
        }
      }else {
        next({ path: '/dashboard'})
      }
    }
  }else{
    next()
  }
})

export default router
