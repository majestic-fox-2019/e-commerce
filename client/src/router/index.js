import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

function auth(to, from, next) {
  if (localStorage.getItem('token')) {
    next();
  } else {
    next({ name: 'login' });
  }
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: auth,
    children: [
      {
        path: '/sold',
        name: 'sold',
        component: () => import('../views/tableSold.vue'),
      },
      {
        path: '/',
        name: 'product',
        component: () => import('../views/product.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});


// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem('token')) {
//     next('/');
//   } else {
//     next('/login');
//   }
// });

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.isAdmin)) {
//     if (true) {
//       next();
//     } else {
//       next({ name: 'login' });
//     }
//   } else {
//     next({ name: 'login' });
//   }
// });

export default router;
