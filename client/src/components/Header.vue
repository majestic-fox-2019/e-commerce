<template>
    <v-app-bar
      app
      color="#007eb8"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <div class="d-inline-flex">
        <router-link :to="{name: 'ebooks'}">
          <v-btn
            text
          >
            <v-icon>mdi-notebook-outline</v-icon>
            <span class="ml-2 menu-text">Ebooks</span>
          </v-btn>
        </router-link>
        <router-link :to="{name: 'tutorials'}">
          <v-btn
            text
          >
            <v-icon>mdi-library-video</v-icon>
            <span class="ml-2 menu-text">Tutorials</span>
          </v-btn>
        </router-link>

      </div>


      <v-btn
        text
        v-if="isLogin"
        @click="logout"
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {
  methods: {
    login() {
      if (this.$route.name !== 'login') {
        this.$router.push({ name: 'login' });
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.$store.commit('setIsLogin', false);
      this.login();
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
};
</script>
<style scoped>
    .menu-text{
        color: white;
        text-decoration: none;
    }
</style>
