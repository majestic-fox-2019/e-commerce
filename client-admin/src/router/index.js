import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
import Navbar from "../views/components/Navbar.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      navbar: Navbar
    },
    beforeEnter(to, from, next) {
      if (!store.state.isLogin || store.state.user.role !== "admin") {
        store.dispatch("logout");
      }
      else {
        next();
      }
    }
  },
  {
    path: "/product-detail",
    name: "ProductDetail",
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/ProductDetail'),
      navbar: Navbar
    },
    beforeEnter(to, from, next) {
      if (!store.state.isLogin || store.state.user.role !== "admin") {
        store.dispatch("logout");
      }
      else {
        next();
      }
    },
    children: [
      {
        path: "",
        redirect: "/"
      },
      {
        path: ":id",
        name: "ProductDetailId",
        component: () => import(/* webpackChunkName: "about" */ '../views/ProductDetail/ProductById.vue')
      }
    ]
  },
  {
    path: "/product-add",
    name: "ProductAdd",
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/ProductAdd.vue'),
      navbar: Navbar
    }
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // components: {
    //   default: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    //   navbar: () =>
    // }
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
      navbar: Navbar
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
      navbar: Navbar
    }
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
      navbar: ""
    }
  },
  {
    path: "/register",
    name: "Register",
    components: {
      default: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
      navbar: ""
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if(!store.state.isLogin) {
    store.dispatch("autoLogin");
  }
  next();
})

export default router;
