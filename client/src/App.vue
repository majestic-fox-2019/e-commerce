<template>
  <v-app>
    <Header />
    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Home from './components/Home.vue';

export default {
  name: 'App',

  components: {
    Header,
    Home,
  },

  data: () => ({
    //
  }),
};
</script>
