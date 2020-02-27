import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from "../views/Admin.vue"
import Detail from "../views/Detail.vue"
import Cart from "../views/Cart.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/:id',
    name: 'Detail',
    component: Detail,
  }


]

const router = new VueRouter({
  routes
})

export default router
