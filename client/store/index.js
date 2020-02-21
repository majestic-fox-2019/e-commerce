import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      dataProducts:null,
      dataCategories:null,
    },
    mutations:{
      inputProduct(state,payload){
        state.dataProducts = payload;
      },
      inputCategory(state,payload){
        state.dataCategories = payload;
      }
    },
    actions:{
      showData( { commit } ){
          axios({
            method:'get',
            url:'http://localhost:3000/products',
            headers:{token:localStorage.token}
          })
          .then(data => {
            console.log(data);
            commit('inputProduct', data.data)
          })
          .catch(err => {
            console.log(err)
          })
        },
        showCategory( { commit } ){
          axios({
            methd:'get',
            url:'http://localhost:3000/category',
            headers:{token:localStorage.token}
          })
          .then(data => {
            commit('inputCategory',data.data);
          })
          .catch(err => {
            console.log(err);
          })
        }
    },
});