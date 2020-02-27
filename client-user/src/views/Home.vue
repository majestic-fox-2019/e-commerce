<template>
  <div>
    <v-app>
      <Navbar :processcart="countCart" @doneCount="countCart = null"></Navbar>
      <router-view class="mt-2" @countCart="countCart = true"></router-view>
    </v-app>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      countCart: null
    };
  }
};
</script>

<style>
</style>