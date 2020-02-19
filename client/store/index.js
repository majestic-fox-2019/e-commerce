import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        dataProducts:null,
    },
    mutations:{
        inputProduct(state,payload){
            state.dataProducts = payload
        }
    },
    actions:{
        showData({commit}){
            axios({
                method:'get',
                url:'http://localhost:3000/products',
                headers:{token:localStorage.token}
            })
            .then(data=>{
                console.log(data);
                commit('inputProduct',data.data)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },
    getters:{

    }
});