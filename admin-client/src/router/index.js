import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import User from '../components/User.vue'
import Category from '../components/Category.vue'
import Product from '../components/Product.vue'
import AddUserForm from '../components/AddUserForm.vue'
import AddCategoryForm from '../components/AddCategoryForm.vue'
import AddProductForm from '../components/AddProductForm.vue'
import UpdateUserForm from '../components/UpdateUserForm.vue'
import UpdateCategoryForm from '../components/UpdateCategoryForm.vue'
import UpdateProductForm from '../components/UpdateProductForm.vue'
import ListCategory from '../components/ListCategory'
import ListProduct from '../components/ListProduct'
import ListUser from '../components/ListUser'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) {
        next({
          name: 'Home'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'Home',
    redirect: 'User',
    component: Home,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/user',
        name: 'User',
        component: User,
        redirect: '/user/list',
        meta: { requiresAuth: true },
        children:
          [
            { path: '/user/list', name: 'list_user', component: ListUser },
            { path: '/user/add', name: 'add_user', component: AddUserForm },
            { path: '/user/edit/:id', name: 'update_user', component: UpdateUserForm },
            { path: '/user/delete/:id', name: 'delete_user' }
          ]
      },
      {
        path: '/category',
        name: 'Category',
        component: Category,
        redirect: '/category/list',
        children:
          [
            { path: '/category/list', name: 'list_category', component: ListCategory },
            { path: '/category/add', name: 'add_category', component: AddCategoryForm },
            { path: '/category/edit/:id', name: 'update_category', component: UpdateCategoryForm },
            { path: '/category/delete/:id', name: 'delete_category' }
          ]
      },
      {
        path: '/product',
        name: 'Product',
        component: Product,
        redirect: '/product/list',
        children: [
          { path: '/product/list', name: 'list_product', component: ListProduct },
          { path: '/product/add', name: 'add_product', component: AddProductForm },
          { path: '/product/edit/:id', name: 'update_product', component: UpdateProductForm },
          { path: '/product/delete/:id', name: 'delete_product' }
        ]
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
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.access_token) {
      next({
        name: 'Login'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
