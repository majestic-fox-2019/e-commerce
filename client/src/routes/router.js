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
import Store from '../components/Store.vue'
import MainStore from '../components/MainStore.vue'
import Cart from '../components/Cart.vue'
import History from '../components/History.vue'
import AllHistory from '../components/AllHistory.vue'

const jwt = require('jsonwebtoken')
Vue.use(Router);

const router =  new Router({
  mode: 'history',
  routes: [
    {
      name: "login",
      path: "/loginorregis",
      component: Login,
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
      name: "member",
      path: "/",
      component: Store,
      children: [
        {
          name: 'main',
          path: '/',
          component: MainStore,
        },
        {
          name: 'adminfilter',
          path: '/category/:category',
          component: MainStore,
        },
        {
          name: 'cart',
          path: '/cart',
          component: Cart,
        },
        {
          name: 'history',
          path: '/history',
          component: History,
        },
      ]
    },
    {
      path: '/admin',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          name: 'home',
          path: '/',
          component: MainHome,
        },
        {
          name: 'filter',
          path: '/category/:category',
          component: MainHome,
        },
        {
          name: 'favorite',
          path: '/categories',
          component: Categories,
        },
        {
          name: 'userList',
          path: '/users',
          component: UserList,
        },
        {
          name: 'addProduct',
          path: '/addproduct',
          component: Product,
        },
        {
          name: 'allhistory',
          path: '/membershistory',
          component: AllHistory,
        },
      ]
    },
    { path: "*",
      component: PageNotFound ,
    },
  ]
});

router.beforeEach((to, from, next) => {
  if(localStorage.token) {
    try {
      jwt.verify(localStorage.token, 'week3')
    } catch(err) {
      localStorage.clear()
      next({
        path: '/'
      })
    }
  }
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!localStorage.token) {
        next({
          path: '/',
        })
      } else {
        let data = jwt.verify(localStorage.token, 'week3')
        if(data.role !== 'admin') {
          next({
            path: '/',
          })
        }else{
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
