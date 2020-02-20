<template>
  <v-row class="table">
    <v-col class="col" cols="4"
      ><img
        :src="product.image_url"
        alt="image"
        style="padding: 0; width: 160px; height: 160px"
    /></v-col>
    <v-col class="col" cols="6">
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <h3>IDR {{ product.price }}</h3>
      <h4>Stocks: {{ product.stocks }}</h4>
      <span>Shop: {{ product.User.shop_name }}</span>
    </v-col>
    <v-col class="col" cols="2">
      <v-btn
        style="width: 100%;"
        class="btn"
        color="warning"
        @click.prevent="editItem(product)"
        >Edit</v-btn
      >
      <v-btn
        style="width: 100%;"
        class="btn"
        color="red"
        @click.prevent="deleteItem(product.id)"
        >Delete</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'ItemTable',
  props: ['product'],
  methods: {
    deleteItem(id) {
      this.$store.dispatch('DELETE_PRODUCT', id)
    },
    editItem(item) {
      this.$store.commit('GET_EDIT_DATA', item)
      this.$store.commit('DIALOG_CHANGE', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  border: 2px solid black;
  height: 200px;
  margin: 15px 10px;
}
.btn {
  margin-top: 30px !important;
  color: white;
}
</style>
