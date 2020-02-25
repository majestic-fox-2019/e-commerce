import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue';
import AdminRegister from '../views/AdminRegister.vue';
import AdminPage from '../views/AdminPage.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
  },
  {
    path: '/adminRegister',
    name: 'adminRegister',
    component: AdminRegister,
  },
  {
    path: '/seller',
    name: 'adminPage',
    component: AdminPage,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token') || localStorage.getItem('role') === "customer") {
      router.push('/adminRegister')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
