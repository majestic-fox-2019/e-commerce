import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import HomeCategory from "@/components/HomeCategory.vue"
import CategoryList from "@/components/CategoryList.vue"
import TableCategory from "@/components/TableCategory.vue"
import Page404 from "@/views/404.vue"
import UnderConstruction from '@/views/UnderConstruction'
import TableUsers from '@/components/TableUsers'

import axios from '@/api/axios.js'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    meta: { requiresAuth: true },
    children: [
      { path: "/", name: "HomeCategory", component: HomeCategory },
      {
        path: "/category",
        name: "Category",
        component: TableCategory,
      },
      {
        path: "/product/category/:categoryname",
        name: "ProductByCategory",
        component: CategoryList,
        props: true
      },
      {
        path: "/list/users",
        name: "UserList",
        component: TableUsers,
      }
    ]
  },
  {
    path: "/store",
    name: "Store",
    component: UnderConstruction
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "*",
    name: "Page404",
    component: Page404
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({ name: "Login" })
    } else {
      axios
        .get('/users/verify', {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          if (data.user.role == "Member") {
            next({ name: "Store" })
          } else {
            next()
          }
        })
        .catch(() => {
          next({ name: "Login" })
        })
    }
  } else {
    if (to.name == 'Login' && localStorage.token) {
      axios
        .get('/users/verify', {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          if (data.user.role == "Member") {
            localStorage.clear()
            next({ name: "Store" })
          } {
            next({ name: "HomeCategory" })
          }
        })
        .catch(() => {
          next({ name: "Login" })
        })
    } else {
      next()
    }
  }
})

export default router;
