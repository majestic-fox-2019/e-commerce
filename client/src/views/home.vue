<template>
  <div>
    <navbar />
    <carousel />
    <catalog />
  </div>
</template>

<script>
import navbar from '../components/navbar.vue';
import carousel from '../components/carousel.vue';
import catalog from '../components/catalog.vue';

export default {
  components: {
    navbar,
    carousel,
    catalog,
  },
};
</script>

<style>
</style>
