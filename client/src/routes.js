import Ebooks from './components/Ebooks.vue';
import Tutorials from './components/Tutorials.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Register from './components/Register.vue';

export default [
  {
    path: '/',
    component: Home,
    name: 'home',
    meta: { requiresAuth: true },
  },
  {
    path: '/ebooks',
    component: Ebooks,
    name: 'ebooks',
    meta: { requiresAuth: true },
  },
  {
    path: '/tutorials',
    component: Tutorials,
    name: 'tutorials',
    meta: { requiresAuth: true },
  },
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
];
