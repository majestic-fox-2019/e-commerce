import loginregister from './components/loginregister.vue';
import homepage from './components/homepage.vue';


export default [
  {
    path: '/',
    name: 'loginregister',
    component: loginregister,
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: homepage,
  },
];
