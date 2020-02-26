<template>
  <v-container>
    <v-row id="detail">
      <v-col md="5" lg="5" sm="12" xs="12">
        <img
          :src="detailProduct.image_url"
          style="max-height: 350px; max-width: 450px;"
        />
      </v-col>
      <v-col md="7" lg="7" sm="12" xs="12" style="padding: 40px;">
        <h2 class="mb-3">{{ detailProduct.name }}</h2>
        <h4>Seller : {{ detailProduct.User.shop_name }}</h4>
        <h4 class="mb-3">Location : {{ detailProduct.User.userLocation }}</h4>
        <v-divider></v-divider>
        <h1 class="mb-3">
          <span style="color: red;">{{
            changeFormat(detailProduct.price)
          }}</span>
        </h1>
        <h3 class="mb-3">Avalaible Stocks : {{ detailProduct.stocks }}</h3>
        <v-divider></v-divider>
        <h4 class="mb-3">Detail Product :</h4>
        <p>{{ detailProduct.description }}</p>

        <div v-if="detailProduct.UserId !== this.$store.state.userProfile.id">
          <v-slider
            label="How many?"
            v-model="qty"
            min="1"
            :max="detailProduct.stocks"
            thumb-label="true"
            ticks
          ></v-slider>
          <h5>Items to buy: {{ qty }}</h5>
          <h4>Total Price {{ changeFormat(totalPrice) }}</h4>
          <v-btn
            class="mt-4"
            style="color: white;"
            color="green"
            @click.prevent="addToCart(detailProduct.id)"
            >Add to cart</v-btn
          >
        </div>
        <h4 v-else>
          Edit item?
          <span
            style="color: blue; cursor: pointer;"
            @click.prevent="$router.push('/panel')"
            >Click here</span
          >
        </h4>
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
    return {
      qty: 0
    }
  },
  components: {
    ProductCard
  },
  methods: {
    changeFormat(val) {
      const newPrice = Formatter(val)
      return newPrice
    },
    addToCart(id) {
      const data = {
        ProductId: id,
        qty: this.qty,
        price: this.totalPrice
      }
      this.$store.dispatch('ADD_TO_CART', data)
    }
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
    },
    totalPrice() {
      return this.detailProduct.price * this.qty
    }
  },
  watch: {
    productId(val, old) {
      this.$store.dispatch('FETCH_DETAILS_PRODUCT', val)
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_DETAILS_PRODUCT', this.productId)
  }
}
</script>

<style lang="scss" scoped>
#detail {
  height: 57vh;
}
#products {
  display: flex;
  overflow-x: scroll;
}
img {
  width: 100%;
  height: auto;
}
</style>
