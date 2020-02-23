import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductList from '../views/ProductList.vue'
import Admin from '../views/Admin.vue'
import AdminProductMenu from '../views/AdminProductMenu.vue'
import Register from '../views/Register.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Cart from '../views/Cart.vue'
import AdminUsers from '../views/AdminUsers.vue'
import UserShop from '../views/UserShop.vue'
import UserProducts from '../views/UserProducts.vue'
import UserAddProduct from '../views/UserAddProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/products/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin/products',
        component: AdminProductMenu
      },
      {
        path: '/admin/users',
        component: AdminUsers
      }
    ]
  },
  {
    path: '/shop/:userId',
    name: 'UserShop',
    component: UserShop,
    children: [
      {
        path: '/shop/products',
        component: UserProducts
      },
      {
        path: '/shop/addProduct',
        component: UserAddProduct
      }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/:category',
        component: ProductList
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
