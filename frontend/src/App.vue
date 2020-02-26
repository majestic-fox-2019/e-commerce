<template>
  <div id="app">
    <Headers />
    <div class="mt-5">
      <router-view/>
    </div>
    <Footers />
  </div>
</template>

<script>
import Headers from '@/components/Layouts/Headers.vue'
import Footers from '@/components/Layouts/Footers.vue'
export default {
  name: 'App',
  components: {
    Headers,
    Footers
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/style.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
