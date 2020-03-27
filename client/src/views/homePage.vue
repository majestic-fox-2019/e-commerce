<template>
  <div>
    <navBar></navBar>
    <carrousel></carrousel>
    <router-view></router-view>
    <h1 class="title">CHOOSE YOUR FAVOURITE TEA</h1>
    <filterMenu @getCategory="getCategory"></filterMenu>
    <cardProduct :category="category"></cardProduct>
  </div>
</template>

<script>
import navBar from "../components/navBar.vue";
import cardProduct from "../components/cardProduct.vue";
import filterMenu from "../components/filterMenu.vue";
import carrousel from "../components/carrousel.vue";

export default {
  name: "homePage",
  data() {
    return {
      category: null
    };
  },
  components: {
    navBar,
    cardProduct,
    filterMenu,
    carrousel
  },
  methods: {
    getCategory(cat) {
      this.category = cat;
    }
  }
};
</script>

<style>
body {
  font-family: "Indie Flower";
}
.title {
  text-align: center;
}
</style>
