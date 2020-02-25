<template>
  <div class="row">
    <div class="home">
      <div class="row" style="margin-right:0 !important;">
        <carouselHome></carouselHome>
      </div>
      <div class="row" style="margin-top:5vh!important; margin-left:3%!important">
        <category></category>
        <cards></cards>
      </div>
      <cardDetail></cardDetail>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import carouselHome from "@/components/carouselHome.vue";
import cards from "@/components/cards.vue";
import category from "@/components/category.vue";
import cardDetail from "@/components/cardDetail.vue";

export default {
  name: "Home",
  components: {
    carouselHome,
    cards,
    category,
    cardDetail
  },
  created() {
    this.$store.dispatch("findAllProduct");
  }
};
</script>

<style scoped>
.row {
  margin-right: 0 !important;
}
</style>
