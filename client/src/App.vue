<template>
  <v-app>
    <navbar></navbar>
    <!-- LOGIN AND REGISTER FORM -->
    <loginregister v-if="!alreadyLogin">
    </loginregister>
    <homepage></homepage>
  </v-app>
</template>

<script>
import loginregister from './components/loginregister.vue';
import navbar from './components/navbar.vue';
import homepage from './components/homepage.vue';

export default {
  name: 'App',
  data() {
    return {
    };
  },
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
  },
  components: {
    loginregister,
    navbar,
    homepage,
  },
};
</script>

<style>
.container {
  margin-top: 5%
};
v-app {
  margin: 100%;
}
</style>
