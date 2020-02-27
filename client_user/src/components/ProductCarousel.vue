<template>
  <div class="container-fluid mt-4 mb-4">
    <br>
    <div class="col-md-10 mx-auto d-flex justify-content-between">
      <h5><i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Recent Product</h5>
      <h6 class="text-primary">
        <!-- <router-link to class="link">See All Product <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></router-link> -->
      </h6>
    </div>
      <div class="col-md-10 mx-auto mt-2">
            <ProductCard :products="products" />
      </div>
      <br>
  </div>
</template>

<script>
import ProductCard from '../components/ProductCard'

export default {
  name: 'ProductCarousel',
  components: {
    ProductCard
  },
  created(){
    this.getProduct()
  },
  computed: {
    products: function() {
      return this.$store.state.products
    },
  },
  methods: {
    getProduct(){
      this.$store.dispatch('getProducts')
    },
  }
}
</script>

<style scoped>
  .link{
    text-decoration: none;
    transition: color 0.3s;
  }
  .link:hover{
    color: black;
  }
</style>