<template>
  <div class="container-fluid col-md-10 mx-auto mt-4 my-4">
      <Title msg="Product Detail" />
      <div class="row mt-2">
        <div class="col-md-3">
          <div class="card" style="width: 18rem;">
            <img :src="product.image_url" class="card-img-top" alt="...">
          </div>
        </div>
        <div class="col-md-9">
          <ProductDescription :product="product" />
        </div>
      </div>
  </div>  
</template>

<script>
import Title from '../components/Title'
import ProductDescription from '../components/ProductDescription'

export default {
  name: 'DetailProduct',
  components: {
    Title,
    ProductDescription
  },
  data() {
    return {
      form: {
        qty: 1
      },
    }
  },
  created(){
    this.getSingleProduct()
  },
  computed: {
    product: function() {
      return this.$store.state.singleProducts
    }
  },
  methods: {
    changeQuantity(condition){
        if(condition == 'plus'){
          this.form.qty++
        }else if(condition == 'minus' && this.form.qty > 1){
          this.form.qty--
        }
    },
    getSingleProduct(){
      this.$store.dispatch('getProductById', this.$route.params.product_id)
    }
  }
}
</script>

<style scoped>

</style>