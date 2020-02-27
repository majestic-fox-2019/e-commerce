<template>
  <div class="text-center" style="font-weight: bold;">
    <h1>RECENTLY ADDED</h1>

    <carousel
      autoplay
      :perPage="3"
      :autoplayTimeout="5000"
      scrollPerPage
      :paginationEnabled="false"
      loop
      :speed="1000"
    >
      <slide class="image-carousel" v-for="banner in banners" :key="banner.id">
        <v-img width="100%" height="100%" :src="banner.image_url"></v-img>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide
  },
  data() {
    return {
      banners: null
    };
  },
  methods: {
    getBanner() {
      this.$axios
        .get("/products/banner")
        .then(res => {
          this.banners = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getBanner();
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Oxanium&display=swap");

.image-carousel {
  width: 100px;
  height: 200px;
}

h1 {
  font-family: "Oxanium";
}
</style>