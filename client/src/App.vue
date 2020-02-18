<template>
  <v-app>
    <Header />
    <v-content>
      <router-view></router-view>
      <!-- <Home/> -->
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
// import Home from './components/Home.vue';

export default {
  name: 'App',

  components: {
    Header,
    // Home,
  },

  data: () => ({
    //
  }),
};
</script>
