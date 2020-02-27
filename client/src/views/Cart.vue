<template>
  <b-container class="mt-4 cartContainer">
      <h1>Your Cart</h1>
      <b-row class="active-cart">
        <div class="itemList">
          <div class="itemCard" v-for="(item, i) in $store.state.cart" :key="i">
            <div class="checkBox">
              <input type="checkbox" v-model="selected" class="checkedItems" :name="item.Product.name" :value="item">
            </div>
            <CartItems :itemData="item" :activeItem="true"></CartItems>
          </div>
        </div>
        <div class="cartSummary">
          <div class="totalPrice">
            <h3>Cart Summary</h3>
            <div class="cartTotal mt-5 mb-3">
              <p>Total price</p>
              <p>{{totalCart}}</p>
            </div>
            <b-button @click.prevent="checkOut" block class="my-2" :disabled="selected.length < 1">Checkout ({{selected.length}} items)</b-button>
          </div>
        </div>
      </b-row>
  </b-container>
</template>

<script>
import CartItems from '../components/CartItems'
import rpConvert from '../helpers/rpConverter.js'
import Swal from 'sweetalert2'
export default {
  name: 'Cart',
  components: {
    CartItems
  },
  methods: {
    checkOut () {
      Swal.fire({
        title: `Proceed to checkout these (${this.selected.length}) items?`,
        text: 'Please make sure you have checked the correct items',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Proceed to checkout'
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('checkout', this.selected)
          this.selected = []
        }
      })
    }
  },
  created () {
    this.$store.dispatch('fetchUserCart')
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    totalCart () {
      let total = 0
      this.selected.forEach(element => {
        total += (Number(element.Product.price) * Number(element.qty))
      })
      return rpConvert(total)
    }
  }
}
</script>

<style scoped>
.checkedItems {
    height: 2.5vh;
    width: 2.5vw;
}
.checkBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  height: 100%;
}
.itemCard {
  height: 20%;
  width: 100%;
  border-top: 1px solid rgb(165, 165, 165);
  border-bottom: 1px solid rgb(165, 165, 165);
  display: flex;
}
.cartTotal {
  display: flex;
  justify-content: space-between;
}
.cartContainer {
  height:90vh;
}
.active-cart {
    height: 90vh;
    padding: 2%;
}
.itemList {
  height: 100%;
  padding: 2%;
  width: 75%;
  overflow: scroll;
}
.cartSummary {
  height: 100%;
  padding: 2%;
  width: 25%;
  border-radius: 10px;
  border: 1px solid rgb(197, 197, 197);
  display: flex;
  flex-direction: column;
}
.delivery-confirmation {
    height: 43%;
    overflow: scroll;
}
</style>
