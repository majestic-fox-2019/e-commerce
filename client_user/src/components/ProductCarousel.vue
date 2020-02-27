<template>
  <div class="container-fluid mt-4 mb-4">
    <br>
    <div class="col-md-10 mx-auto d-flex justify-content-between">
      <h5><i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Recent Product</h5>
      <h6 class="text-primary">
        <router-link :to="{ name: 'ProductList', params: { category: 'allproduct' } }" class="link">See All Product <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></router-link>
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
    isLoggedIn:function() {
      return this.$store.state.isLoggedIn
    },
    userEmail: function() {
      return this.$store.state.userEmail
    },
    userId: function() {
      return this.$store.state.userId
    },
  },
  methods: {
    getProduct(){
      this.$store.dispatch('getProducts')
    },
    getTransaction(){
      this.$store.dispatch('getTransaction', { userId: this.userId, token: this.isLoggedIn })
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