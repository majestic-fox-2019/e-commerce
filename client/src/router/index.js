import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/Account.vue';
import AdminRegister from '../views/AdminRegister.vue';
import AdminPage from '../views/AdminPage.vue';
import AdminView from '../views/AdminView.vue';
import TampilanUtama from '../views/TampilanUtama.vue';
import ErrorPage from '../views/ErrorPage.vue';
import cardDetail from '../components/cardDetail.vue';
import carts from '../components/carts.vue';
import historyCheckout from '../components/historyCheckout.vue';
import tableTransaction from '../components/tableTransaction.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        name: 'TampilanUtama',
        component: TampilanUtama
      },
      {
        path: 'cart',
        name: 'carts',
        component: carts
      },
      {
        path: 'history',
        name: 'historyCheckout',
        component: historyCheckout
      },
      {
        path: 'product/:id',
        name: 'cardDetail',
        component: cardDetail
      },
    ]
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
    name: 'adminView',
    component: AdminView,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminPage',
        component: AdminPage
      },
      {
        path: 'transaction',
        name: 'tableeTransaction',
        component: tableTransaction
      }
    ]
  },
  {
    path: '*',
    name: 'ErrorPage',
    component: ErrorPage
  }
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
