<template>
  <div class="container mt-5 mb-5">
    <div class="product-detail">
      <b-row>
        <b-col md="4">
          <div class="image-detail-product" v-if="detailProduct !== null">
            <img :src="detailProduct.image_url">
          </div>
        </b-col>
        <b-col md="8">
          <div class="content-detail-product" v-if="detailProduct !== null">
            <h1 class="title-detail-product">{{ detailProduct.name }}</h1>
            <h1 class="price-detail-product">{{ toIDRprice }}</h1>
            <div class="cat-detail mb-3">
              <span>Category : </span>
              <span class="cat-detail-product">{{ categoryUppercase }}</span>
            </div>
            <b-button class="btn-beli mt-3 mr-2" size="lg"><i class="fa fa-shopping-cart"></i>&nbsp;Masukan Keranjang</b-button>
            <b-button class="mt-3" variant="dark" size="lg" @click="backHome"><i class="fa fa-chevron-circle-left"></i>&nbsp;Kembali Belanja</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { url } from '@/mixins/mixins'

export default {
  props: ['id'],
  mixins: [url],
  data(){
    return {
      detailProduct: null
    }
  },
  created() {
    this.getDetailProduct()
  },
  computed: {
    categoryUppercase(){
      if(this.detailProduct !== null){
        return this.detailProduct.Category.name.toUpperCase()
      }
    },
    toIDRprice(){
      if(this.detailProduct !== null){
        let resultPrice = ''
        let strPrice = String(this.detailProduct.price)
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
  },
  methods: {
    backHome(){
      this.$router.push({ name: 'Home' })
    },
    getDetailProduct(){
      axios.get(`${this.url}/product/${this.id}`)
      .then(res => {
        this.detailProduct = res.data.payload
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}
</script>

<style scoped>

</style>