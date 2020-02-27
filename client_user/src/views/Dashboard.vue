<template>
  <div>
    <Carousel />
    <ProductCarousel />
  </div>  
</template>

<script>
import Carousel from '../components/Carousel'
import ProductCarousel from '../components/ProductCarousel'

export default {
  name: 'Dashboard',
  components : {
    Carousel,
    ProductCarousel
  }
}
</script>

<style scoped>

</style>