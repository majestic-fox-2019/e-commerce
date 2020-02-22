import Vue from "vue";
import Router from "vue-router";
import MainHome from '../components/MainHome.vue';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Categories from '../components/Categories.vue';
import UserList from '../components/UserList.vue';
import Product from '../components/Product.vue';
import PageNotFound from '../components/404.vue';
import DataFail from '../components/408.vue';
import Construction from '../components/Construction.vue'
const jwt = require('jsonwebtoken')
Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      name: "login",
      path: "/login",
      component: Login,
    },
    { path: "*",
     component: PageNotFound ,
    },
    {
      name: "408",
      path: "/cantgetdata",
      component: DataFail,
    },
    {
      name: "construction",
      path: "/underconstruction",
      component: Construction,
    },
    {
      path: '/',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'home',
          path: '',
          component: MainHome,
        },
        {
          name: 'favorite',
          path: 'categories',
          component: Categories,
        },
        {
          name: 'userList',
          path: 'users',
          component: UserList,
        },
        {
          name: 'addProduct',
          path: 'addproduct',
          component: Product,
        },

      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!localStorage.token) {
        next({
          path: '/login',
        })
      } else {
        let data = jwt.verify(localStorage.token, 'week3')
        if(data.role !== 'admin') {
          next({
            path: '/underconstruction',
          })
        }else {
          next()
        }
      }
    } else {
      if(localStorage.token && to.name == 'login') {
        next({
          path: '/',
        })
      }else {
        next()
      }
    }
 
})

export default router
