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
    this.$store.dispatch('getCartTotal');
    this.$store.dispatch('getLoveTotal');
    this.$store.dispatch('getBookmarkTotal');
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    isShowRegister() {
      // console.log(this.$route);
      if (this.$route.name === 'register') {
        return true;
      }
      return false;
    },
  },
};
</script>
<style>
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
