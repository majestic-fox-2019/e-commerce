import Vue from 'vue';
import VueRouter from 'vue-router';
import Ebooks from './components/Ebooks.vue';
import Tutorials from './components/Tutorials.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Users from './components/Users.vue';
import Register from './components/Register.vue';
import Banners from './components/Banners.vue';
import TutorialsFront from './components/TutorialsFront.vue';
import Carts from './components/Carts.vue';
import PaymentSuccess from './components/PaymentSuccess.vue';
import EbooksFront from './components/EbooksFront.vue';
import Loves from './components/Loves.vue';
import Bookmarks from './components/Bookmarks.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
  },
  {
    path: '/register',
    component: Register,
    name: 'register',
  },
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/ebooks',
    component: Ebooks,
    name: 'ebooks',
    meta: { requiresAuth: true },
  },
  {
    path: '/admin/tutorials',
    component: Tutorials,
    name: 'tutorials',
    meta: { requiresAuth: true },
  },
  {
    path: '/users',
    component: Users,
    name: 'users',
    meta: { requiresAuth: true },
  },
  {
    path: '/banners',
    component: Banners,
    name: 'banners',
    meta: { requiresAuth: true },
  },
  {
    path: '/ebooks',
    component: EbooksFront,
    name: 'ebooks_front',
    meta: { requiresAuth: true },
  },
  {
    path: '/tutorials',
    component: TutorialsFront,
    name: 'tutorials_front',
    meta: { requiresAuth: true },
  },
  {
    path: '/carts',
    component: Carts,
    name: 'carts',
    meta: { requiresAuth: true },
  },
  {
    path: 'payment_success',
    component: PaymentSuccess,
    name: 'payment_success',
    meta: { requiresAuth: true },
  },
  {
    path: '/loves',
    component: Loves,
    name: 'loves',
    meta: { requiresAuth: true },
  },
  {
    path: '/bookmarks',
    component: Bookmarks,
    name: 'bookmarks',
    meta: { requiresAuth: true },
  },
];

// Vue Router Config
const router = new VueRouter({
  mode: 'history',
  routes,
  linkActiveClass: 'active',
});
// End Router Config

// Redirect before login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next({
        name: 'login',
      });
    }
  } else if (['/login', '/register'].includes(to.path) && token) {
    next({
      name: 'home',
    });
  } else {
    next();
  }
});
// End Redirect


export default router;
