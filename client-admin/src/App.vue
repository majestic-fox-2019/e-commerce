<template>
  <div id="app">
    <notifications></notifications>
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line
console.log(process.env);
import store from './store';
export default {
  name: "App",
  data() {
    return {}
  },
  methods: {
  },
  created() {
    store.dispatch("auto-login");
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}
</style>