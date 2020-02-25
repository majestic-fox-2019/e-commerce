<template>
  <div class="home">
    <carousel 
      :autoplay="true"
      :items="1"
      :nav="false">
      <img src="@/assets/images/banner1.jpg">
      <img src="@/assets/images/banner2.jpg">
      <img src="@/assets/images/banner3.jpg">
    </carousel>
    <div class="container">
      <section>
        <div class="category">
          <h3 class="title-section">KATEGORI</h3>
          <div class="row">
            <div class="col-md-10 offset-md-1">
              <div class="row">
                <div class="col-md-4" v-for="cat in getCategories" :key="cat.id">
                  <b-card class="card-category" @click="getToCategory(cat)">
                    <h4 class="text-category">{{ cat.name }}</h4>
                    <b-card-text>
                      <img v-if="cat.name === 'sneakers'" src="@/assets/icons/1.png">
                      <img v-if="cat.name === 'sports'" src="@/assets/icons/2.png">
                      <img v-if="cat.name === 'shirts'" src="@/assets/icons/3.png">
                    </b-card-text>
                  </b-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="product-home">
          <h3 class="title-section">PRODUCTS</h3>
          <b-row>
            <b-col md="3" class="mb-4" v-for="product in getProducts" :key="product.id">
              <b-card class="card-product-home" @click="goDetailProduct(product.id)" :img-src="product.image_url" img-top>
                <div class="content-bottom">
                  <div class="product-name">
                    <h5>{{ product.name }}</h5>
                  </div>
                  <p class="product-category">{{ product.Category.name }}</p>
                  <h6 class="product-price">{{ toIDRprice(product.price) }}</h6>
                </div>
              </b-card>
            </b-col>
            <b-col md="12" v-if="plusMore < allProducts.length">
              <div class="text-center">
                <b-button @click="showMore" class="btn-beli-outline">Show More</b-button>
              </div>
            </b-col>
          </b-row>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import carousel from 'vue-owl-carousel2'
export default {
  name: 'Home',
  components: {
    carousel
  },
  data(){
    return{
      plusMore: 4,
    }
  },
  created(){
    this.getAllProducts()
    this.getAllCategories()
  },
  computed:{
    allProducts(){
      return this.$store.state.products
    },
    getProducts(){
      let products = this.$store.state.products
      return products.slice(0, this.plusMore)
    },
    getCategories(){
      return this.$store.state.categories
    }
  },
  methods: {
    showMore() {
      var more = this.plusMore
      this.plusMore = more+4
    },
    goDetailProduct(id){
      this.$router.push({ name: `ProductDetail`, params: { id: id }})
    },
    getAllProducts(){
      this.$store.dispatch('getProducts')
    },
    getAllCategories(){
      this.$store.dispatch('getCategories')
    },
    getToCategory(cat){
      this.$router.push({ name: `CategoryName`, params: { catname: cat.name, id: cat.id }}).catch(err => {})
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
