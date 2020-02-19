<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Navbar/>
    <Content/>
    <!-- <DetailContent/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
import Navbar from '@/components/Navbar.vue';
import Content from '@/components/Content.vue';
// import DetailContent from '@/components/DetailProduct.vue';

export default {
  name: 'Home',
  components: {
    Content,
    Navbar,
    // DetailContent,
  },
};
</script>
