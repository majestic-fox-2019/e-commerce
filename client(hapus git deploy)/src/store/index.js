import Vue from 'vue';
import Vuex from 'vuex';
import axios from '@/api/axios.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        listGame: [],
        listCategories: [],
    },
    watch: {
        listGame() {
            this.getAllGames()
        },
        listCategories() {
            this.getAllCategories()
        },
    },
    mutations: {
        GETALLGAMES(state, payload) {
            state.listGame = payload
        },
        GETALLCATEGORIES(state, payload) {
            state.listCategories = payload
        }
    },
    actions: {
        getAllGames(context) {
            axios
                .get(`/products`, {
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(res => {
                    context.commit('GETALLGAMES', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getAllCategories(context) {
            axios
                .get('/categories', {
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(res => {
                    context.commit('GETALLCATEGORIES', res.data)
                })
                .catch(error => {
                    console.log(error.response)
                })
        },
        getFilteredList(context, list) {
            axios
                .get(`/products/find/${list}`, {
                    headers: {
                        token: localStorage.token
                    }
                })
                .then(res => {
                    context.commit('GETALLGAMES', res.data)
                })
                .catch(error => {
                    console.log(error.response);
                });
        }
    }
})

export default store