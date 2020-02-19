<template>
  <v-app>
    <Header />
    <v-content>
      <Login
        v-if="!isLogin && !isShowRegister"
      />
      <Register
        v-if="isShowRegister"
      />

      <router-view v-if="isLogin && !isShowRegister"></router-view>
      <!-- <Home/> -->
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Header,
    Login,
    Register,
  },
  created() {
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isShowRegister() {
      console.log(this.$route);
      if (this.$route.name === 'register') {
        return true;
      }
      return false;
    },
  },
};
</script>
