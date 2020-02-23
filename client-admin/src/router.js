import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import store from './store';

Vue.use(Router)

const router = new Router({
  mode: "history",
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      // redirect: 'dashboard', // to /dashboard
      redirect: { name: 'board' }, // to /dashboar by name
      component: DashboardLayout,
      beforeEnter(to, from, next) {
        if (!store.state.isLogin) {
          router.replace("/login")
        }
        else {
          next();
        }
      },
      children: [
        {
          path: '/dashboard',
          name: 'board',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/products',
          name: "my-dashboard",
          component: () => import(/* webpackChunkName: "demo" */ './views/MyDashboard.vue')
        },
        {
          path: '/products-add',
          name: "my-product-add",
          component: () => import(/* webpackChunkName: "demo" */ './views/MyProductAdd.vue')
        },
        {
          path: '/category',
          name: "category",
          component: () => import(/* webpackChunkName: "demo" */ './views/MyCategory.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          beforeEnter(to, from, next) {
            if (store.state.isLogin) {
              next("/dashboard")
            }
            else {
              next();
            }
          },
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
});

export default router;