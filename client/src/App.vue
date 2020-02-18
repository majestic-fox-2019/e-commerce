<template>
  <v-app>
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
          <v-icon>mdi-notebook-outline</v-icon>
          <span class="ml-2">Ebooks</span>
        </v-btn>
      </div>

      <div class="d-inline-flex">
        <v-btn
          text
        >
          <v-icon>mdi-library-video</v-icon>
          <span class="ml-2">Tutorials</span>
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

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
