<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <Banner />
    <CategoryBanner />
    <div class="mt-5" style="text-align:center">
      <h1 style="text-align:center">
        Mall Product
      </h1>
      <Mall class="mt-5" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Banner from '@/components/HomeBanner.vue'
import CategoryBanner from '@/components/CategoryBanner.vue'
import Mall from '@/views/Mall.vue'
export default {
  name: 'homeView',
  components: {
    Banner,
    CategoryBanner,
    Mall
  }
}
</script>
