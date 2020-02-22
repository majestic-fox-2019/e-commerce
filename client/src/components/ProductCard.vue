<template>
  <v-card
    class="mx-auto"
    max-width="400"
    style="box-shadow: 0px -1px 3px 3px rgba(0, 0, 0, 0.3);"
    @click.prevent="getDetails(product.id)"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="product.image_url"
    >
      <v-card-title style="background: rgba(0, 0, 0, 0.8);"
        ><a href="#">{{ product.name }}</a></v-card-title
      >
    </v-img>

    <v-chip
      v-if="product.status == 'new'"
      class="ma-2"
      color="green"
      text-color="white"
    >
      {{ product.status.toUpperCase() }}
    </v-chip>

    <v-chip v-else class="ma-2" color="secondary" text-color="white">
      {{ product.status.toUpperCase() }}
    </v-chip>

    <v-card-subtitle class="pb-0"
      >Seller : {{ product.User.shop_name }}</v-card-subtitle
    >

    <v-card-text class="text--primary">
      <div>Price : {{ changeFormat(product.price) }}</div>
      <div>Stocks : {{ product.stocks }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
import Formatter from '../helpers/formatter'

export default {
  name: 'ProductCard',
  data() {
    return {}
  },
  props: ['product'],
  methods: {
    getDetails(id) {
      this.$router.push('/details/' + id)
    },
    changeFormat(val) {
      const newPrice = Formatter(val)
      return newPrice
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: white !important;
}
a:hover {
  font-size: 24px;
}
</style>
