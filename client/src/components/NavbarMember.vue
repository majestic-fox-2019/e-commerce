<template>
  <div class="fixed">
      <div class="d-flex justify-content-between">  
        <div class="d-flex">
          <router-link :to="'/'" class="menu font-weight-bold m-2">K-COM</router-link>
          <router-link :to="'/'" class="menu m-2">Home</router-link>
          <span v-if="loggedin !== null" class="d-flex">
            <router-link :to="'/history'" class="menu m-2">History</router-link>
          </span>
        </div>
        <div class="mr-4 d-flex row">
          <span v-if="loggedin !== null" class="d-flex">
            <router-link :to="'/cart'" class="menu m-2"><img src="@/../public/images/icons/cart.png" class="cart" alt=""><span class="badge badge-danger">{{cart}}</span></router-link>
          </span>
            <div v-show="email" class="m-2">{{email}}</div>
          <div>
            <div v-show="loggedin === null">
              <Button @click="toLogin" class="btn-primary m-2" :buttonname="loginButton"/>
            </div>
            <div v-show="loggedin !== null">
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
  name: 'NavbarMember',
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
  computed: {
    cart() {
      return this.checkData(this.$store.state.cart)
    }
  },
  created() {
    this.$store.dispatch('cart')
  },
  methods: {
    checkData(data) {
      let count = 0
      for(let i = 0; i < data.length; i++) {
        for(let j = 0; j < data[i].Users.length; j++) {
          if(data[i].Users[j].email == localStorage.getItem('email')) {
            count += 1
            break;
          }
        }
      }
      return count
    },
    toLogin() {
      this.$router.push({ name: 'login'})
    },
    toLogout() {
      this.loggedin = null;
      localStorage.clear()
      this.email = null
      this.$swal.success('logged out')
      this.$router.push({ name: 'main'}).catch(err=>{console.log(err)})
      this.$store.dispatch("products")
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
  background-color: #deb887;
  border-radius: 4px;
}
.cart {
  padding: 2px;
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
