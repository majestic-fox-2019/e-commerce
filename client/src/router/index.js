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

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    redirect: 'User',
    component: Home,
    children: [
      {
        path: '/user', name: 'User',
        component: User,
        children:
          [
            { path: '/user/add', name: 'AddUser', component: AddUserForm },
            { path: '/user/edit/:id', name: 'UpdateUser', component: UpdateUserForm, props: true },
            { path: '/user/delete/:id', name: 'DeleteUser' }
          ]
      },
      {
        path: '/category', name: 'Category',
        component: Category,
        children:
          [
            { path: '/category/add', name: 'AddCategory', component: AddCategoryForm },
            { path: '/category/edit/:id', name: 'UpdateCategory', component: UpdateCategoryForm, props: true },
            { path: '/category/delete/:id', name: 'DeleteCategory' }
          ]
      },
      {
        path: '/product',
        name: 'Product',
        component: Product,
        children: [
          { path: '/product/add', name: 'AddProduct', component: AddProductForm },
          { path: '/product/edit/:id', name: 'UpdateProduct', component: UpdateProductForm, props:true },
          { path: '/product/delete/:id', name: 'DeleteProduct' }
        ]
      },
    ],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
