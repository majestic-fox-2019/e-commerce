<template>
  <div class="container store">
      <div class="carousel">
          <Carousel/>
      </div>
      <div class="row product-list">
        <ProductCard v-for="(product,i) in products" :key=i :product="product"></ProductCard>
      </div>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard' 
import Carousel from '../components/Carousel' 
export default {
  components : {
      ProductCard,
      Carousel
  },
  computed : {
    products(){
      return this.$store.state.products
    }
  },
  created(){
    if(localStorage.token){
      this.$store.dispatch('getProducts')
    } else {
      this.$router.push('/login')
    }
  },
}
</script>

<style>

</style>