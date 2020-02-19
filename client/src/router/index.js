import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import DetailProduct from '../views/DetailProduct.vue';
// Admin
import LoginAdmin from '../views/admin/Login.vue';
import Dashboard from '../views/admin/Dashboard.vue';
import AddProduct from '../views/admin/AddProduct.vue';
import HomeAdmin from '../views/admin/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/detail_product',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: LoginAdmin,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: HomeAdmin,
      },
      {
        path: 'add_product',
        component: AddProduct,
      },
    ],
  },

  // {
  //   path: '',
  //   name: 'AddProduct',
  //   component: AddProduct,
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
