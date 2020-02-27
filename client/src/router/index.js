import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Store from '../views/Store.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import AdminPage from '../views/AdminPage/AdminPage.vue'
import NewProduct from '../views/AdminPage/child-views/NewProduct.vue'
import ProductList from '../views/AdminPage/child-views/ProductList.vue'
import Transactions from '../views/AdminPage/child-views/Transactions.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    children : [
      {
        path : '',
        name : 'store',
        component : Store
      },
      {
        path : 'cart',
        component : Cart
      },
      {
        path : 'login',
        component : Login
      },
      {
        path : 'admin',
        component : AdminPage,
        children : [
          {
            path : '',
            component : ProductList
          },
          {
            path : 'add',
            component : NewProduct
          },
          {
            path : 'transactions',
            component : Transactions
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

function isAuthenticated(){
  if(localStorage.token){
    return true
  } else {
    return false
  }
}

router.beforeEach((to, from, next)=>{
  if( to.name !== 'Login' && !isAuthenticated) next({next : 'Login'})
  else next()
})

export default router
