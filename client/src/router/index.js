import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store';
import Navbar from "../views/components/Navbar.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      components: {
        default: Home,
        navbar: Navbar
      }
    },
    {
      path: "/products",
      name: "Products",
      components: {
        default: () => import(/* webpackChunkName: "about" */ '../views/Products'),
        navbar: Navbar
      },
      children: [
        {
          path: "",
          name: "ProductsHome",
          component: () => import(/* webpackChunkName: "about" */ '../views/Products/ProductsHome.vue')
        },
        {
          path: ":id",
          name: "ProductDetail",
          component: () => import(/* webpackChunkName: "about" */ '../views/Products/ProductById.vue')
        }
      ]
    },
    {
      path: "/cart",
      name: "cart",
      components: {
        default: () => import(/* webpackChunkName: "about" */ '../views/Cart.vue'),
        navbar: Navbar
      },
      beforeEnter(to, from, next) {
        if (!store.state.isLogin || store.state.user.role !== "customer") {
          localStorage.clear();
          next("/");
        }
        else {
          next();
        }
      }
    },
    {
      path: "/transaction",
      name: "transaction",
      components: {
        default: () => import(/* webpackChunkName: "about" */ '../views/Transaction.vue'),
        navbar: Navbar
      },
      beforeEnter(to, from, next) {
        if (!store.state.isLogin || store.state.user.role !== "customer") {
          localStorage.clear();
          next("/");
        }
        else {
          next();
        }
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
      default: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
      components: {
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
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.state.isLogin) {
    store.dispatch("autoLogin");
  }
  next();
})

export default router;
