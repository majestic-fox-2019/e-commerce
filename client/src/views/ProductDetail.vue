<template>
  <v-container>
    <v-row id="detail">
      <v-col md="5" lg="5" sm="12" xs="12">
        <img :src="detailProduct.image_url" />
      </v-col>
      <v-col md="7" lg="7" sm="12" xs="12" style="padding: 40px;">
        <h2>{{ detailProduct.name }}</h2>
        <v-divider></v-divider>
        <h1>
          Price : <span style="color: red;">{{ detailProduct.price }}</span>
        </h1>
        <h3>Avalaible Stocks : {{ detailProduct.stocks }}</h3>
        <v-divider></v-divider>
        <h4>Detail Product :</h4>
        <p>{{ detailProduct.description }}</p>
      </v-col>
    </v-row>
    <div id="products">
      <v-col
        md="3"
        lg="3"
        sm="12"
        xs="12"
        v-for="(product, i) in products"
        :key="i"
      >
        <ProductCard :product="product"
      /></v-col>
    </div>
  </v-container>
</template>

<script>
import ProductCard from '@/components/ProductCard'
import Formatter from '../helpers/formatter'

export default {
  name: 'DetailPage',
  data() {
    return {}
  },
  components: {
    ProductCard
  },
  computed: {
    products() {
      return this.$store.state.allProducts
    },
    detailProduct() {
      return this.$store.state.selectedProduct
    },
    productId() {
      return this.$route.params.id
    }
  },
  watch: {
    productId(val, old) {
      this.$store.dispatch('FETCH_DETAILS_PRODUCT', val)
    },
    detailProduct: {
      handler(val, old) {
        const newPrice = Formatter(val.price)
        val.price = newPrice
      }
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_DETAILS_PRODUCT', this.productId)
  }
}
</script>

<style lang="scss" scoped>
#detail {
  height: 50vh;
}
#products {
  display: flex;
  justify-content: space-evenly;
  overflow-x: scroll;
}
img {
  width: 100%;
  height: auto;
}
</style>
