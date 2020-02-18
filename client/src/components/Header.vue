<template>
    <v-app-bar
      app
      color="primary"
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
        <v-btn
          text
        >
          <router-link to="/ebooks">
            <v-icon>mdi-notebook-outline</v-icon>
            <span class="ml-2 menu-text">Ebooks</span>
        </router-link>
        </v-btn>
        <v-btn
          text
        >
          <router-link to="/tutorials">
             <v-icon>mdi-library-video</v-icon>
             <span class="ml-2 menu-text">Tutorials</span>
          </router-link>
        </v-btn>
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
