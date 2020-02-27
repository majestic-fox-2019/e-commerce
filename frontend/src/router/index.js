import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Category from '../views/Category/Category.vue'
import ContentCategory from '../views/Category/ContentCategory.vue'
import ProductDetail from '../views/Product/ProductDetail.vue'
import Register from '../views/Register/Register.vue'
import Cart from '../views/Cart/Cart.vue'
import Payment from '../views/Payment/Payment.vue'
import Setting from '../views/Setting/Setting.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/'
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    component: Category,
    children: [
      {
        path: ':catname',
        name: 'CategoryName',
        component: ContentCategory,
        props: true
      }
    ]
  },
  {
    path: '/product/detail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { 
      requiresAuth: true,
      role: true
    }
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: Payment,
    props: true,
    meta: { 
      requiresAuth: true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting,
    meta: { 
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({
        path: '/',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
