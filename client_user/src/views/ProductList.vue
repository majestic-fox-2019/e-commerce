<template>
  <div class="container-fluid mt-4 mb-4">
    <br>
    <div class="col-md-10 mx-auto d-flex justify-content-between">
      <h5><i class="fa fa-check-circle text-primary" aria-hidden="true"></i> Product</h5>
      <h6 class="text-primary">
        <ButtonFilter customStyle="text-primary" :categories="categories" />
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
import ButtonFilter from '../components/ButtonFilter'

export default {
  name: 'ProductCarousel',
  components: {
    ProductCard,
    ButtonFilter
  },
  created(){
    this.getProduct()
    this.getCategory()
  },
  computed: {
    products: function() {
      let data = this.$store.state.products

      if(this.$route.params.category == 'allproduct'){
        return data
      }else{
        return data.filter(product => product.CategoryId == this.$route.params.category)
      }

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
    categories: function(){
      return this.$store.state.categories
    }
  },
  methods: {
    getProduct(){
      this.$store.dispatch('getProducts')
    },
    getTransaction(){
      this.$store.dispatch('getTransaction', { userId: this.userId, token: this.isLoggedIn })
    },
    getCategory(){
      this.$store.dispatch('getCategory')
    }
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