import Vue from 'vue'
import VueRouter from 'vue-router'
import Navbar from '../views/components/Navbar.vue';
import Home from '../views/Home.vue'
import About from '../views/About.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      navbar: Navbar
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // components: {
    //   default: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    //   navbar: () => 
    // }
    components: {
      default: About,
      navbar: Navbar
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
