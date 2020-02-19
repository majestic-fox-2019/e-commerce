<template>
<div>
  <navbar></navbar>
  <div>
     <carousel></carousel>
     <category></category>
     <list></list>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import Carousel from '../components/Carousel.vue'
import Category from '../components/Category.vue'
import List from '../components/List.vue'
import Navbar from '../components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    Carousel, Category, List, Navbar
  }
}
</script>

<style scoped>
.carousel-item{
  height: 200px;
}
.carousel-item img{
  height: 200px;
}
</style>
