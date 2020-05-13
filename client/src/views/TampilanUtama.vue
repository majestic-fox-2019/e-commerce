<template>
  <div>
    <div class="row" style="margin-right:0 !important;">
      <carouselHome></carouselHome>
    </div>
    <div class="row" style="margin-top:5vh!important; margin-left:3%!important">
      <category></category>
      <cards></cards>
    </div>
  </div>
</template>

<script>
import carouselHome from "@/components/carouselHome.vue";
import cards from "@/components/cards.vue";
import category from "@/components/category.vue";
export default {
  components: {
    carouselHome,
    cards,
    category
  }
};
</script>

<style scoped>
.row {
  margin-right: 0 !important;
}
</style>
