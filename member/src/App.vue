<template>
  <v-app>
    <app-bar @show-login="overlay = !overlay" />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import Auth from "./components/Auth";
export default {
  name: "App",
  data() {
    return {
      overlay: false
    };
  },
  components: {
    AppBar
  },
  mounted() {
    if (this.categories === null) this.$store.dispatch("getCategories");
    if (this.products === null) this.$store.dispatch("getProducts");
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    },
    products() {
      return this.$store.state.products;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Odibee+Sans&display=swap');
#app {
  font-family: "Odibee Sans" ;
  letter-spacing: .1em;
}
</style>