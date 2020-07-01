import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home"
import Front from "../views/Front"
import Register from "../components/Register"
import Login from "../components/Login"
import store from '../store'
import Products from '../components/Products'
import CreateProduct from '../components/CreateProduct'
import Cart from '../components/Cart'
import ProductDetail from '../components/ProductDetail'


Vue.use(VueRouter)

const routes = [
    {
      path: '/auth',
      name: 'front',
      component: Front
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth:true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products
        },
        {
          path: 'create-product',
          name: 'create-product',
          component: CreateProduct
        },
        {
          path : 'cart',
          name: 'cart',
          component: Cart
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'detail/:id',
          name: 'detail',
          component: ProductDetail
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach ((to, from, next) => {
 if (to.matched.some(record => record.meta.requiresAuth)){
   if(localStorage.getItem("token")){
     store.dispatch('checkLogin')
     console.log(store.state.isLogin)
     next()
   }
   else {
     router.push({name: 'front'})
   }
 }
 else {
   next()
 }
})
export default router
