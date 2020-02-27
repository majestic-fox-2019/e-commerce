<template>
  <div id="body-home">
    <Slide></Slide>
    <!-- <Login></Login> -->
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import Slide from "../components/customer/Slide";
import Login from "../components/customer/Login";
export default {
  components: {
    Slide: Slide
  }
};
</script>
<style>
/* #body-home {
  display: flex;
  flex-direction: column;
} */
</style>
