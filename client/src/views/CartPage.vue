<template>
  <v-container>
    <h1>Cart Details</h1>
    <v-row>
      <v-col md="8" sm="12" style="max-height: 82vh; overflow-y: scroll">
        <v-row>
          <div v-if="carts.length == 0">
            <h2>You dont have any product in carts</h2>
          </div>
          <v-col v-for="(item, i) in carts" :key="i" cols="12">
            <v-card color="white">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="headline"
                    v-text="item.Product.name"
                  ></v-card-title>
                  <v-card-subtitle
                    v-text="changeFormat(item.price)"
                  ></v-card-subtitle>
                  <v-card-text>Quantity: {{ item.qty }}</v-card-text>
                  <v-card-text
                    v-if="item.Product.stocks < 1"
                    style="color: red;"
                  >
                    Item out of stocks!</v-card-text
                  >
                  <v-card-actions>
                    <v-checkbox
                      v-model="selected"
                      :value="item"
                      :disabled="item.Product.stocks < 1"
                    ></v-checkbox>
                    <v-btn
                      icon
                      color="red"
                      @click.prevent="removeItem(item.id)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="150" tile>
                  <img :src="item.Product.image_url" />
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="4" sm="12">
        <v-card>
          <v-card-title>Cart Summary</v-card-title>
          <v-card-text style="color: red;">
            <h3 style="color: blue;">Total Price :</h3>
            <h2>{{ changeFormat(totalPrice) }}</h2>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="green darken-2"
              style="color: white;"
              class="ml-1"
              :disabled="selected.length < 1"
              @click.prevent="checkoutAll"
            >
              Checkout ({{ selected.length }})
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Formatter from '@/helpers/formatter'
import Swal from 'sweetalert2'

export default {
  name: 'CartPage',
  data() {
    return {
      selected: []
    }
  },
  methods: {
    changeFormat(val) {
      return Formatter(val)
    },
    removeItem(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      }).then(result => {
        if (result.value) {
          this.selected = []
          this.$store.dispatch('REMOVE_ITEM', id)
        }
      })
    },
    checkoutAll() {
      this.$store.dispatch('CHECKOUT_ALL', this.selected)
      this.selected = []
    }
  },
  computed: {
    carts() {
      return this.$store.state.userCarts
    },
    totalPrice() {
      let total = 0
      this.selected.forEach(item => (total += Number(item.price)))
      return total
    }
  }
}
</script>

<style lang="scss" scoped></style>
