import Vue from 'vue';
import VueRouter from 'vue-router';

import loginPage from '../views/login.vue';
import registerPage from '../views/register.vue';
import error from '../views/404.vue';

// Admin
import adminPage from '../views/adminPage.vue';
import productTable from '../views/productTable.vue';
import categories from '../views/categories.vue';
import detailProduct from '../views/detailProduct.vue';
import filterCategory from '../views/filterCategory.vue';

// User
import userNav from '../views/userView/navigation.vue';
import homeProducts from '../views/userView/homeProducts.vue'
import carts from '../views/userView/carts.vue'
import oneProduct from '../views/userView/showOne.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: userNav,
    meta: { isAuthenticated: false },
    children: [{
      path: '/',
      name: 'home',
      component: homeProducts
    }, {
      path: '/carts',
      name: 'carts',
      component: carts
    }, {
      path: '/product/:id',
      name: 'oneProduct',
      component: oneProduct
    }]
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
  }, {
    path: '*',
    name: 'error',
    component: error,
    meta: { isAuthenticated: false },
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
