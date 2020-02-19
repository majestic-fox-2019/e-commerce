<template>
  <carousel
    :autoplay="true"
    :center="true"
    :loop="true"
    :autowidth="false"
    :nav="false"
    :margin=50
    class="mb-3 mt-4"
  >
    <div class="img-carousel">
        <img src="../assets/banner1.jpg">
    </div>
    <div class="img-carousel">
        <img src="../assets/banner2.jpg">
    </div>
    <div class="img-carousel">
        <img src="../assets/banner3.jpg">
    </div>
    <div class="img-carousel">
        <img src="../assets/banner4.jpg">
    </div>
</carousel>
</template>

<script>
import carousel from 'vue-owl-carousel'
export default {
  name: 'BannerCar',
  components: { carousel }
}
</script>

<style scoped>
.img-carousel {
    width: 105%;
    height: 280px;
    border-radius: 20px;
    overflow: hidden;
}

.img-carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

</style>
