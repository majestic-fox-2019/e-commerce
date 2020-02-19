import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Cart from '../views/Cart.vue';
import Product from '../views/ProductList.vue';

Vue.use(VueRouter);

const beforeEnter = (to, from, next) => {
  if (localStorage.token) {
    next({ path: from.path });
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter,
  },
  {
    path: '/carts',
    name: 'Cart',
    component: Cart,
    meta: { isLoggedIn: true },
  },
  {
    path: '/products',
    name: 'Products',
    component: Product,
    meta: { isLoggedIn: true },
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
  } else {
    next();
  }
});

export default router;
