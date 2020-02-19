<template>
  <div class="home">
    <BannerCar></BannerCar>
    <b-row class="content mt-4">
      <b-col cols="3" class="catergories-section">
        <CategoryCard></CategoryCard>
      </b-col>
      <b-col class="product-section">
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import BannerCar from '../components/BannerCar'
import CategoryCard from '../components/CategoryCard'
export default {
  name: 'Home',
  components: {
    BannerCar,
    CategoryCard
  },
  beforeCreate () {
    this.$router.push('/home')
  }
}
</script>

<style scoped>
.home {
  padding-left: 5%;
  padding-right: 5%;
  overflow-y: scroll;
  height: 94vh;
}
.content {
  width: 100%;
  height: 80vh;
}
.catergories-section {
  height: 100%;
}
.product-section {
  height: 100%;
}
</style>
