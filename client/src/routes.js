import loginregister from './components/loginregister.vue';
import homepage from './components/homepage.vue';
import update from './components/update.vue';


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
    // beforeEnter(to, from, next) {
    //   if (this.localstorage.token) {
    //     next();
    //   } else {
    //     next({
    //       name: 'loginregister',
    //     });
    //   }
    // },
  },
  {
    path: '/update',
    name: 'update',
    component: update,
  },
];
