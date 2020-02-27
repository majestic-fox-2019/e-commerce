<template>
  <div>
    <infobar @filter="filtered" />
    <carousel />
    <catalog :cards="getProducts" />
  </div>
</template>

<script>
import carousel from "@/components/carousel.vue";
import catalog from "@/components/catalog.vue";
import infobar from "@/components/infobar.vue";

export default {
  components: {
    carousel,
    catalog,
    infobar
  },
  data() {
    return {
      filterBy: []
    };
  },
  created() {
    this.products = this.$store.dispatch("allProducts");
  },
  computed: {
    getProducts() {
      if (this.filterBy.length > 0) {
        return this.filterBy;
      } else {
        return this.$store.state.products;
      }
    }
  },
  methods: {
    filtered(value) {
      this.filterBy = [];
      this.getProducts.forEach(product => {
        if (product.Category.name == value) {
          this.filterBy.push(product);
        }
      });
    }
  }
};
</script>

<style>
</style>