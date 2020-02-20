<template>
  <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner" style="height:468px;">
      <router-link to="/cart" class="carousel-item active">
        <img src="../assets/carousel1.png" class="d-block w-100" alt="..." />
      </router-link>
      <router-link to="/cart" class="carousel-item">
        <img src="../assets/carousel2.png" class="d-block w-100" alt="..." />
      </router-link>
      <router-link to="/cart" class="carousel-item">
        <img src="../assets/carousel3.png" class="d-block w-100" alt="..." />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.carousel {
  z-index: -99;
  margin-top: 5rem !important;
}
</style>