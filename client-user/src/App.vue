<template>
  <v-app>
    <vue-progress-bar></vue-progress-bar>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-toolbar-title>
        <v-icon>mdi-watch</v-icon>
        Watcher 
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
          text
          to="/"
        >
          <span class="mr-2">Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      <div v-show="!isLogin">
        <v-btn
          text
          @click="login = true"
        >
          <span class="mr-2">Login</span>
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn
          text
          @click="register = true"
        >
          <span class="mr-2">Register</span>
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>
      </div>
      <div v-show="isLogin">
        
        <v-btn
          text
          :to="{name:'History'}"
        >
          <span class="mr-2">Activity</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>
        <v-badge
          color="green"
          :content="totalCarts"
          :dot="totalCarts === 0"
          overlap
        >
          <v-btn
            text
            @click="cart = true"
          >
            <span class="mr-2">Cart</span>
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
        <v-btn
          text
          @click="logout"
        >
          <span class="mr-2">Logout</span>
          <v-icon>mdi-exit-run</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <Modal type="Login" :dialog="login" @close='login = false'></Modal>
    <Modal type="Register" :dialog="register" @close='register = false'></Modal>
    <Modal type="Cart" :dialog="cart" @close='cart = false'></Modal>
    <v-content class="blue lighten-4">
      <router-view @openLogin="login = true"></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Modal from './components/Modal.vue'
export default {
  name: 'App',
  data() {
    return {
      login : false,
      register: false,
      cart: false
    }
  },
  created() {
    this.$store.dispatch('checkLogin')
  },
  methods:{
    logout() {
      localStorage.clear()
      this.$router.push('/').catch(()=>{})
      this.$store.dispatch('checkLogin')
    }
  },
  components: {
    Modal
  },
  computed: {
    isLogin(){
      if(localStorage.token){
        this.$store.dispatch('activeCart')
      }
      return this.$store.state.isLogin
    },
    totalCarts() {
      return this.$store.state.totalCarts
    }
  },
  watch: {
    cart (){
      this.$store.dispatch('activeCart')
    }
  }
};
</script>