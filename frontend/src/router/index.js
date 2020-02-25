import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Category from '../views/Category/Category.vue'
import ContentCategory from '../views/Category/ContentCategory.vue'
import ProductDetail from '../views/Product/ProductDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    component: Category,
    children: [
      {
        path: ':catname',
        name: 'CategoryName',
        component: ContentCategory,
        props: true
      }
    ]
  },
  {
    path: '/product/detail/:id',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
