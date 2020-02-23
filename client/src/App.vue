<template>
  <div id="app">
    <router-view name="navbar" />
    <router-view />
  </div>
</template>

<script>
// import store from './store';

export default {
  name: "App",
  created() {
    // store.dispatch
  }
}
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
