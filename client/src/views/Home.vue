<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Banner />
    <CategoryBanner />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Banner from '@/components/HomeBanner.vue'
import CategoryBanner from '@/components/CategoryBanner.vue'
export default {
  name: 'homeView',
  components: {
    Banner,
    CategoryBanner
  }
}
</script>
