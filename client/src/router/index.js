import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';
import Product from '../views/ProductList.vue';
import ProductDetails from '../views/ProductDetails.vue';
import Error from '../views/Error.vue';
import Transactions from '../views/Transactions.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (localStorage.admin && localStorage.token) {
        next({ name: 'Admin' });
      } else {
        next();
      }
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.token) {
        if (localStorage.admin) {
          next({ name: 'Admin' });
        } else {
          next({ path: from.path });
        }
      } else {
        next();
      }
    },
  },
  {
    path: '/carts',
    name: 'Cart',
    component: Cart,
    meta: { isLoggedIn: true },
    beforeEnter: (to, from, next) => {
      if (localStorage.admin && localStorage.token) {
        next({ name: 'Admin' });
      } else {
        next();
      }
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Product,
    meta: { isAdmin: true },
  },
  {
    path: '/product/:productId',
    name: 'Product',
    component: ProductDetails,
    beforeEnter: (to, from, next) => {
      if (localStorage.admin && localStorage.token) {
        next({ name: 'Admin' });
      } else {
        next();
      }
    },
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: Transactions,
    beforeEnter: (to, from, next) => {
      if (localStorage.admin && localStorage.token) {
        next({ name: 'Admin' });
      } else {
        next();
      }
    },
  },
  {
    path: '*',
    name: 'Error',
    component: Error,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isLoggedIn)) {
    if (localStorage.token) {
      next();
    } else {
      next({ name: 'Home' });
    }
  } else if (to.matched.some((record) => record.meta.isAdmin)) {
    if (localStorage.token) {
      if (localStorage.admin) {
        next();
      } else {
        next({ name: 'Home' });
      }
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router;
