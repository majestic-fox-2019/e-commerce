import Vue from 'vue';
import VueRouter from 'vue-router';
// import axios from 'axios';
// USER
import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import Register from '@/views/Register.vue';
import DetailProduct from '@/components/DetailProduct.vue';
import Carts from '@/components/Carts.vue';
// Admin
import LoginAdmin from '@/views/admin/Login.vue';
import Dashboard from '@/views/admin/Dashboard.vue';
import HomeAdmin from '@/views/admin/Home.vue';
import AddProduct from '@/views/admin/AddProduct.vue';
import AllProduct from '@/components/admin/AllProduct.vue';
import DetailProductAdmin from '@/components/admin/DetailProduct.vue';
import EditProductAdmin from '@/components/admin/FormEdit.vue';

// const api = axios.create({
//   baseURL: 'http://localhost:3000',
// });

Vue.use(VueRouter);
// cek login

const beforeEnter = async (to, from, next) => {
  if (localStorage.getItem('token')) {
    next({
      path: '/admin',
    });
  } else {
    next();
  }
};


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
    // beforeEnter,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    // beforeEnter,
  },
  {
    path: '/detail_product/:id',
    name: 'DetailProduct',
    component: DetailProduct,
  },
  {
    path: '/carts',
    name: 'Carts',
    component: Carts,
  },
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: LoginAdmin,
    beforeEnter,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'HomeAdmin',
        component: HomeAdmin,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'product',
        name: 'Product',
        component: AllProduct,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'productadd',
        name: AddProduct,
        component: AddProduct,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'productdetail/:id',
        name: DetailProductAdmin,
        component: DetailProductAdmin,
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: 'editproduct/:id',
        name: EditProductAdmin,
        component: EditProductAdmin,
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Before
// router.beforeEach((to, from, next) => {
//   if (!localStorage.getItem('token')) next('/login');
//   else next();
// });
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token')) {
      next();
    } else {
      next({
        name: 'LoginAdmin',
      });
    }
  } else {
    next();
  }
});
export default router;
