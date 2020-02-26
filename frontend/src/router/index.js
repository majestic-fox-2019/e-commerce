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
    component: Cart
  },
  {
    path: '/payment/:id',
    name: 'Payment',
    component: Payment,
    props: true
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
