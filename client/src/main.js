import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';

import loginPage from './components/login.vue';
import registerPage from './components/register.vue';
import storePage from './components/storePage.vue';
import productTable from './components/productTable.vue';
import stock from './components/products.vue';
import homePage from './components/homePage.vue';
import detailProduct from './components/detailProduct.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [{
  path: '/login',
  component: loginPage,
  name: 'loginPage',
  meta: { isAuthenticated: false },
}, {
  path: '/register',
  component: registerPage,
  name: 'registerPage',
  meta: { isAuthenticated: false },
}, {
  path: '/admin',
  component: storePage,
  meta: { isAuthenticated: true, isAdmin: true },
  children: [{
    path: '/',
    component: productTable,
    name: 'productTable',
  }, {
    path: '/detail/:id',
    component: detailProduct,
    name: 'detailProduct',
  }, {
    path: '/stock',
    component: stock,
    name: 'stock',
  }],
}, {
  path: '/',
  component: homePage,
  name: 'home',
  meta: { isAuthenticated: false },
}];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // next();
  const isAuthenticated = to.matched.some((record) => record.meta.isAuthenticated);
  const isAdmin = to.matched.some((record) => record.meta.isAdmin);
  // const isUser = to.matched.some((record) => record.meta.isUser);
  if (!isAuthenticated) {
    if (localStorage.token) {
      if (localStorage.role === 'admin') {
        next({ name: 'productTable' });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (isAuthenticated) {
    if (!localStorage.token) {
      next({ name: 'home' });
    } else if (isAdmin) {
      if (localStorage.role === 'admin') {
        next();
      } else {
        next({ name: 'home' });
      }
    } else {
      next({ name: 'home' });
    }
  }
});

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
