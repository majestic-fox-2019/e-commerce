import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../components/Admin.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Content from '../components/Content.vue'
import AddContent from "../components/AddContent.vue"
import EditContent from "../components/EditContent.vue"
import Category from "../components/CategoryContent.vue"
Vue.use(VueRouter)


const beforeEnter = ((to, from, next) => {
  if (localStorage.getItem('token')) {
    next({ path: "/admin" })
  }
  else {
    next()
  }
})
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
    beforeEnter,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { Authentication: true },
    children: [{
      path: '',
      name: 'Content',
      component: Content,
    },
    {
      path: 'addcontent',
      name: 'AddContent',
      component: AddContent,
    },
    {
      path: 'editcontent/:id',
      name: 'EditContent',
      component: EditContent,
    },
    {
      path: 'category/:id',
      name: 'Category',
      component: Category,
    }]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.Authentication)) {
    if (localStorage.getItem('token')) {
      next()
    }
    else {
      next({ name: 'Login' })
    }
  }
  else {
    next()
  }

})

export default router
