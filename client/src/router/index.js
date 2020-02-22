import Vue from 'vue';
import VueRouter from 'vue-router';

import homePage from '../views/home.vue';
import loginPage from '../views/login.vue';
import registerPage from '../views/register.vue';
import adminPage from '../views/adminPage.vue';
import productTable from '../views/productTable.vue';
import categories from '../views/categories.vue';
import detailProduct from '../views/detailProduct.vue';
import filterCategory from '../views/filterCategory.vue';
import error from '../views/404.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage,
    meta: { isAuthenticated: false },
  },
  {
    path: '/login',
    name: 'loginPage',
    component: loginPage,
    meta: { isAuthenticated: false },
  },
  {
    path: '/register',
    name: 'registerPage',
    component: registerPage,
    meta: { isAuthenticated: false },
  },
  {
    path: '/error',
    name: 'error',
    component: error,
    meta: { isAuthenticated: false },
  },
  {
    path: '/admin',
    component: adminPage,
    meta: { isAuthenticated: true, isAdmin: true },
    children: [
      {
        path: '/',
        component: productTable,
        name: 'productTable',
      },
      {
        path: '/categories',
        component: categories,
        name: 'categories',
      },
      {
        path: '/detail/:id',
        component: detailProduct,
        name: 'detailProduct',
      },
      {
        path: '/filter',
        component: filterCategory,
        name: 'filterCategory',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
