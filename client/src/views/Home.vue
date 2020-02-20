<template>
  <div class="home">
    <carouselHome></carouselHome>
  </div>
</template>

<script>
// @ is an alias to /src
import carouselHome from "@/components/carouselHome.vue";

export default {
  name: "Home",
  components: {
    carouselHome
  }
};
</script>
