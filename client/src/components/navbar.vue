<template>
<div>
      <v-app-bar class="grey darken-4" app dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
        <p>
        Kopinang Kau
        </p>
      </div>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <div v-if="alreadyLogin">
       <v-btn text @click="logoutHidden">
        <span class="mr-2"></span>
        <v-icon>mdi-open-in-new</v-icon>
        Logout
      </v-btn>
      </div>
      <!-- <buttonlogout></buttonlogout> -->
    </v-app-bar>
</div>
</template>

<script>

export default {
  name: 'navbar',
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    login() {
      if (this.$router.path !== '/') {
        this.$router.push('/');
      }
    },
    logoutHidden() {
      localStorage.removeItem('token');
      this.$store.commit('loginsetter', false);
      this.login();
    },
  },
};
</script>
