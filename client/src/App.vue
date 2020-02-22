<template>
  <div id="app">
    <div class="pageLoading" v-if="$store.state.loading.wholePageLoading">
      <b-spinner variant="light" style="width: 5rem; height: 5rem;" label="Large Spinner" type="grow"></b-spinner>
    </div>
    <NavBar></NavBar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$store.dispatch('fetchUserData')
    }
    this.$store.dispatch('fetchMainProducts')
  }
}
</script>

<style scoped>
.pageLoading {
  height: 100vh;
  width: 100vw;
  z-index: 5;
  background: #2e2e2e98;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
