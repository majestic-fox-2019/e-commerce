import Vue from "vue";
import VueRouter from "vue-router";
// import store from '../store';
import Navbar from "../views/components/Navbar.vue";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from '../views/Register.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
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
      default: About,
      navbar: Navbar
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    components: {
      default: Dashboard,
      navbar: Navbar
    }
  },
  {
    path: "/login",
    name: "Login",
    components: {
      default: Login,
      navbar: ""
    }
  },
  {
    path: "/register",
    name: "Register",
    components: {
      default: Register,
      navbar: ""
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
