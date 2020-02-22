import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../views/LoginPage'
import AdminPage from '../views/AdminPage'
import UserPage from '../views/content/ContentUser'
import ProductPage from '../views/content/ContentProduct'
import CategoryPage from '../views/content/ContentCategory'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
    meta : {
      requiresAuth : false
    }
  },
  {
    path : '/admin',
    name : 'Admin',
    component : AdminPage,
    meta : {
      requiresAuth : true
    },
    children : [
      {
        path : 'manage/user',
        component : UserPage,
        name : 'ContentUser',
      },
      {
        path : 'manage/product',
        component : ProductPage,
        name : 'ContentProduct'
      },
      {
        path : 'manage/category',
        component : CategoryPage,
        name : 'ContentCategory'
      },
      {
        path : 'user/update/:user_id',
        name : 'UpdateUser',
        component : () => import('../components/Main/Form/FormUpdateAdmin')
      },
      {
        path : 'product/update/:product_id',
        name : 'UpdateProduct',
        component : () => import('../components/Main/Form/FormUpdateProduct')
      },
      {
        path : 'product/add',
        name : 'AddProduct',
        component : () => import('../components/Main/Form/FormAddProduct')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.matched.some(record => record.meta.requiresAuth )){
    if(localStorage.token){
      next({
        name : 'ContentUser',
      })
    }else{
      next()
    }
  }else{
    if(!localStorage.token){
      next({
        name : 'Login'
      })
    }else{
      next()
    }
  }
})

export default router
