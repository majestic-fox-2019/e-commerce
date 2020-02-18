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

      <v-spacer></v-spacer>

      <v-btn
        text
      >
        <span class="mr-2">Login</span>
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-app-bar>
</template>
<script>
export default {

};
</script>
<style scoped>
    .menu-text{
        color: white;
        text-decoration: none;
    }
</style>
