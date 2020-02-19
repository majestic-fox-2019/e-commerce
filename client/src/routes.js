import Ebooks from './components/Ebooks.vue';
import Tutorials from './components/Tutorials.vue';
import Login from './components/Login.vue';

export default [
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
];
