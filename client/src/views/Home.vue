<template>
  <div class="home">
    <Carousel></Carousel>
    <div class="d-flex mx-auto row">
      <CardProducts v-for="one in allProducts" :key="one.id" :product="one"></CardProducts>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Carousel from "@/components/Carousel.vue";
import CardProducts from "@/components/CardProducts.vue";
export default {
  name: "Home",
  components: {
    Carousel,
    CardProducts
  },
  data() {
    return {};
  },
  methods: {
    getProducts() {
      this.$store.dispatch("getProducts");
    }
  },
  computed: {
    allProducts() {
      return this.$store.state.allProducts;
    }
  },
  mounted() {
    this.getProducts();
    let role = localStorage.getItem("role");
    this.$store.commit("changeRole", role);
  }
};
</script>
