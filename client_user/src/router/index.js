import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: '/detail-product/:product_id',
        name: 'DetailProduct',
        component: () => import('../views/DetailProduct.vue')
      },
      {
        path: '/cart-list',
        name: 'Cart',
        component: () => import('../views/Cart.vue')
      },
      {
        path: '/product-list/:category',
        name: 'ProductList',
        component: () => import('../views/ProductList.vue')
      },
    ]
  },
  {
    path: '/authpage',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    beforeEnter: (to, from, next) => {
      if(localStorage.token){
        next({ name: 'Dashboard' })
      }else{
        next()
      }
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
