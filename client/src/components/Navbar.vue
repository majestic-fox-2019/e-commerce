<template>
  <div class="fixed">
      <div class="d-flex justify-content-between">  
        <div class="d-flex">
          <router-link :to="{name: 'home'}" class="menu font-weight-bold m-2">K-COM</router-link>
          <router-link :to="{name: 'home'}" class="menu m-2">Home</router-link>
          <router-link :to="{name: 'userList'}" class="menu m-2">User</router-link>
          <router-link :to="{name: 'addProduct'}" class="menu m-2">Add Product</router-link>
          <router-link :to="{name: 'favorite'}" class=" menu m-2">Categories</router-link>
          <router-link :to="{name: 'allhistory'}" class=" menu m-2">Trades History</router-link>
        </div>
        <div class="mr-4 d-flex row">
            <div v-if="email" class="m-2">{{email}}</div>
          <div>
            <div v-if="loggedin === null">
              <Button @click="toLogin" class="btn-primary m-2" :buttonname="loginButton"/>
            </div>
            <div v-else-if="loggedin !== null">
              <Button @click="toLogout" class="btn-danger m-2" :buttonname="logoutButton"/>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Button from './Button.vue';

export default {
  name: 'Navbar',
  components:{
    Button,
  },
  data() {
    return {
      loginButton: 'Login',
      logoutButton: 'Logout',
      loggedin: localStorage.getItem('email') || null,
      email: localStorage.getItem('email') || null
    };
  },
  methods: {
    toLogin() {
      this.$router.push({ name: 'login'})
    },
    toLogout() {
      this.loggedin = false;
      localStorage.clear()
      this.$swal.success('logged out')
      this.$router.push({ name: 'main'})
    },
  },
};
</script>

<style scoped>
.nav-item {
  display: block;
  margin-left: 5px;
}
.fixed {
  background-color: bisque;
  position: relative;
  top: 0px;
}
.menu:hover {
  background-color: burlywood;
  border-radius: 4px;
}
</style>
