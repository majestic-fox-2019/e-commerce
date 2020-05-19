<template>
  <div>
  <navbar-user></navbar-user>
  <div>
     <carousel></carousel>
     <category-user/>
     <list-user/>
  </div>
</div>
</template>

<script>
import Carousel from '../components/Carousel.vue'
import CategoryUser from '../components/CategoryUser.vue'
import ListUser from '../components/ListUser.vue'
import NavbarUser from '../components/NavbarUser.vue'
export default {
  name: 'CustMain',
  components: {
    Carousel, CategoryUser, ListUser, NavbarUser
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