import loginregister from './components/loginregister.vue';
import homepageadmin from './components/homepageadmin.vue';
import update from './components/update.vue';


export default [
  {
    path: '/',
    name: 'loginregister',
    component: loginregister,
    beforeEnter(to, from, next) {
      if (localStorage.token) {
        next({
          path: '/homepage',
        });
      } else {
        next({
          path: '/loginregister',
        });
      }
    },
  },
  {
    path: '/homepage',
    name: 'homepage',
    component: homepageadmin,
  },
  {
    path: '/update',
    name: 'update',
    component: update,
  },
];
