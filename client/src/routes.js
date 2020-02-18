import Ebooks from './components/Ebooks.vue';
import Tutorials from './components/Tutorials.vue';

export default [
  {
    path: '/ebooks',
    component: Ebooks,
    name: 'ebooks',
  },
  {
    path: '/tutorials',
    component: Tutorials,
    name: 'tutorials',
  },
];
