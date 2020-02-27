<template>
  <div class="home">
    <Card/>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/ProductCard.vue';

export default {
  name: 'Home',
  components: {
    Card,
  },
};
</script>
