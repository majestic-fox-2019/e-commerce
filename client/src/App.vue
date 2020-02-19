<template>
  <v-app>
    <Header />
    <Login
      v-if="isLogin == null"
    />
    <v-content v-if="isLogin != null">
      <router-view></router-view>
      <!-- <Home/> -->
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  components: {
    Header,
    Login,
  },
  created() {
    console.log(this);
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>
