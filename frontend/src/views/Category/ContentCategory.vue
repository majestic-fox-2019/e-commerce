<template>
  <b-row>
    <b-col md="3" class="mb-4" v-for="product in getProducts" :key="product.id">
      <b-card class="card-product" @click="goDetailProduct(product.id)" :img-src="product.image_url" img-top>
        <div class="content-bottom">
          <div class="product-name">
            <h5>{{ product.name }}</h5>
          </div>
          <p class="product-category">{{ product.Category.name }}</p>
          <h6 class="product-price">{{ toIDRprice(product.price) }}</h6>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['catname', 'id'],
  data(){
    return {}
  },
  created(){
    this.getAllProducts()
  },
  computed: {
    getProducts(){
      let productsByCategory = this.$store.state.products.filter(el => {
        return el.CategoryId === this.id
      })
      return productsByCategory
    }
  },
  watch: {
    id(){
      this.getAllProducts()
    }
  },
  methods: {
    getAllProducts(){
      this.$store.dispatch('getProducts')
    },
    goDetailProduct(id){
      this.$router.push({ name: `ProductDetail`, params: { id: id }})
    },
    toIDRprice(price){
      let resultPrice = ''
      let strPrice = String(price)
      for(let j = 0; j < strPrice.length; j++){
        if((strPrice.length - j) % 3 === 0 && j !== 0){
          resultPrice += '.' + strPrice[j]
        }else{
          resultPrice += strPrice[j]
        }
      }
      return `Rp. ${resultPrice}`
    }
  }
}
</script>

<style>

</style>