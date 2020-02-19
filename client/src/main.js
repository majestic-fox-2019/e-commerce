import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import loginPage from './components/login.vue';
import storePage from './components/storePage.vue';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [{
  path: '/login',
  component: loginPage,
  name: 'loginPage',
  meta: { isAuthenticated: false },
}, {
  path: '/products',
  component: storePage,
  name: 'storePage',
  meta: { isAuthenticated: true },
}];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  // next();
  const isAuthenticated = to.matched.some((record) => record.meta.isAuthenticated);
  if (!isAuthenticated) {
    if (localStorage.token) {
      next({ name: 'storePage' });
    } else {
      next();
    }
  } else if (isAuthenticated) {
    if (localStorage.token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next('/login');
  }
});

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app');
