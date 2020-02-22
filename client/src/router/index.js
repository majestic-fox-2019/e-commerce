import Vue from 'vue';
import VueRouter from 'vue-router';
// import axios from 'axios';
// USER
// import Home from '@/views/Home.vue';
// import Login from '@/views/Login.vue';
// import Register from '@/views/Register.vue';
// import DetailProduct from '@/views/DetailProduct.vue';
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

// const beforeEnter = async (to, from, next) => {
//   if (localStorage.getItem('token')) {
//     await api
//       .get('/check', {
//         headers: {
//           token: localStorage.getItem('token'),
//         },
//       })
//       .then(({
//         data,
//       }) => {
//         console.log(data.message);
//         next({
//           path: from.path,
//         });
//       })
//       .catch((err) => console.log(err.response));
//   } else {
//     next();
//   }
// };


const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: Login,
  //   // beforeEnter,
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: Register,
  //   // beforeEnter,
  // },
  // {
  //   path: '/detail_product',
  //   name: 'DetailProduct',
  //   component: DetailProduct,
  // },
  {
    path: '/login',
    name: 'LoginAdmin',
    component: LoginAdmin,
    // beforeEnter,
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '',
        component: HomeAdmin,
        // meta: {
        //   requiresAuth: true,
        // },
      },
      {
        path: 'product',
        name: 'Product',
        component: AllProduct,
      },
      {
        path: 'productadd',
        name: AddProduct,
        component: AddProduct,
      },
      {
        path: 'productdetail/:id',
        name: DetailProductAdmin,
        component: DetailProductAdmin,
      },
      {
        path: 'editproduct/:id',
        name: EditProductAdmin,
        component: EditProductAdmin,
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
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (localStorage.getItem('token')) {
//       api.get('/check', {
//         headers: {
//           token: localStorage.getItem('token'),
//         },
//       })
//         .then(({
//           data,
//         }) => {
//           console.log(data.message);
//           next();
//         })
//         .catch((err) => console.log(err.response));
//     } else {
//       next({
//         name: 'Login',
//       });
//     }
//   } else {
//     next();
//   }
// });
export default router;
