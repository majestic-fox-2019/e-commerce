<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(product, i) in products" :key="i">
      <v-expansion-panel-header>
        <h4>
          {{ product.name }}
          <v-chip
            v-if="product.status == 'new'"
            class="ma-2"
            color="green"
            text-color="white"
          >
            {{ product.status }}
          </v-chip>
          <v-chip v-else class="ma-2" color="grey" text-color="white">
            {{ product.status }}
          </v-chip>
        </h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <p>{{ product.description }}</p>
        <h5>Avalaible Stocks : {{ product.stocks }}</h5>
        <h5>Price : {{ changeFormat(product.price) }}</h5>
        <v-row>
          <v-col md="6" sm="6" lg="6">
            <v-btn
              style="width: 100%;"
              class="btn"
              color="warning"
              @click.prevent="editItem(product)"
              >Edit</v-btn
            >
          </v-col>
          <v-col md="6" sm="6" lg="6">
            <v-btn
              style="width: 100%;"
              class="btn"
              color="red"
              @click.prevent="deleteItem(product.id)"
              >Delete</v-btn
            >
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import Formatter from '../helpers/formatter'

export default {
  name: 'ItemTable',
  props: ['products'],
  methods: {
    deleteItem(id) {
      this.$store.dispatch('DELETE_PRODUCT', id)
    },
    editItem(item) {
      this.$store.commit('GET_EDIT_DATA', item)
      this.$store.commit('DIALOG_CHANGE', true)
    },
    changeFormat(val) {
      const newPrice = Formatter(val)
      return newPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  border: 2px solid black;
  height: 250px;
  margin: 15px 10px;
}
.btn {
  margin-top: 30px !important;
  color: white;
}
</style>
