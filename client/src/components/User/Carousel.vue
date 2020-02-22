<template>
  <q-carousel
    class="rounded-borders bg-transparent"
    swipeable
    animated
    autoplay
    arrows
    navigation
    transition-prev="fade"
    transition-next="fade"
    v-model="slide"
    ref="carousel"
    infinite
  >
    <q-carousel-slide name="style" class="column no-wrap flex-center">
      <div
        class="bg-indigo-5"
        style="position:absolute; width: 100%; height: 100%; z-index:-10;"
      ></div>
      <h2 class="text-weight-bold">Selamat Datang di PC-Corner</h2>
    </q-carousel-slide>
    <q-carousel-slide
      class="slide rounded-borders"
      :name="item.name"
      :img-src="item.image"
      :style="`background-image: url('${item.image}')`"
      v-for="item in banners"
      :key="item.id"
    />
  </q-carousel>
</template>

<script>
export default {
  name: 'Carousel',
  created() {
    this.$store.dispatch('GET_ALL_BANNER_LIST')
  },
  data() {
    return {
      slide: 1
    }
  },
  computed: {
    banners() {
      return this.$store.state.bannerList
    }
  }
}
</script>

<style scoped>
.slide {
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
