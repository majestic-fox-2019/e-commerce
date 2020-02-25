import Vue from 'vue';

import Vuex from 'vuex';

import parseJwt from '../helpers/jwtParser';

const superagent = require('superagent');

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: localStorage.getItem('token'),
    // url_backend: 'https://o-ecommerce-backend.herokuapp.com',
    url_backend: 'http://localhost:3000',
    superagent,
    carts_total: 0,
    loves_total: 0,
    bookmarks_total: 0,
  },
  mutations: {
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    setCartTotal(state, cartTotal) {
      state.carts_total = cartTotal;
    },
    setLoveTotal(state, loveTotal) {
      state.loves_total = loveTotal;
    },
    setBookmarkTotal(state, bookmarkTotal) {
      state.bookmarks_total = bookmarkTotal;
    },
  },
  actions: {
    getCartTotal({ state, commit }) {
      const objUser = parseJwt(state.isLogin);
      superagent
        .get(`${state.url_backend}/transactions/${objUser.id}/getTotal`)
        .set('accesstoken', state.isLogin)
        .end((err, res) => {
          if (!err) {
            commit('setCartTotal', res.body);
          } else {
            console.log(err);
          }
        });
    },
    getLoveTotal({ state, commit }) {
      const objUser = parseJwt(state.isLogin);
      superagent
        .get(`${state.url_backend}/loves/${objUser.id}/getTotal`)
        .set('accesstoken', state.isLogin)
        .end((err, res) => {
          if (!err) {
            commit('setLoveTotal', res.body);
          } else {
            console.log(err);
          }
        });
    },
    getBookmarkTotal({ state, commit }) {
      const objUser = parseJwt(state.isLogin);
      superagent
        .get(`${state.url_backend}/bookmarks/${objUser.id}/getTotal`)
        .set('accesstoken', state.isLogin)
        .end((err, res) => {
          if (!err) {
            commit('setBookmarkTotal', res.body);
          } else {
            console.log(err);
          }
        });
    },
  },
});
