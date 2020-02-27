import dashboard from '@/components/Dashboard.vue';
import login from '@/components/Login.vue';
import Categories from '@/components/Categories.vue';
import Products from '@/components/Products.vue';
import VueRouter from 'vue-router';
import page404 from '@/components/404.vue';
import user from '@/components/User.vue';

const routes = [
  {
    path: '*',
    component: page404,
    name: '404',
  },
  {
    path: '/',
    component: dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'categories',
        component: Categories,
        name: 'categories',
        meta: {
          breadcrumb: [
            {
              text: 'Dashboard',
              class: 'grey--text',
            },
          ],
        },
      },
      {
        path: 'categories/:category',
        component: Products,
        name: 'categories.id',
        props: true,
        meta: {
          breadcrumb: [
            {
              text: 'Dashboard',
              exact: true,
              to: { name: 'categories' },
              class: 'indigo--text',
            },
            {
              text: 'Categories',
              class: 'grey--text',
            },
          ],
        },
      },
      {
        path: '/user',
        component: user,
        meta: {
          breadcrumb: [
            {
              text: 'User',
              class: 'grey--text',
            },
          ],
        },
      },
    ],
  },
  {
    path: '/login',
    component: login,
    name: 'login',
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('token')) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    if (to.name === 'login' && localStorage.getItem('token')) {
      next({ path: '/categories' });
    }
    next();
  }
});

export default router;
