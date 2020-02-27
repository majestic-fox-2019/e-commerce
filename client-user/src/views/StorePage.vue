<template>
  <div>
    <v-content class="content">
      <v-container>
        <Carousel></Carousel>
        <CategoryCard class="mt-3"></CategoryCard>
        <ProductCard class="mt-4" @countCart="$emit('countCart')"></ProductCard>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Carousel from "../components/Carousel";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

export default {
  components: {
    Carousel,
    CategoryCard,
    ProductCard
  }
};
</script>

<style>
.content {
  background-color: rgba(224, 224, 224, 0.36);
}
</style>