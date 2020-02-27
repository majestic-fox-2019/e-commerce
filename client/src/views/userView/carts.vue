<template>
  <div v-if="getCarts">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :color="'#d47a90'"
        :loader="'dots'"
        :width="100"
      ></loading>
    </div>
    <div class="mycart" v-if="getCarts.length > 0">
      <h5 clas="titlecart">MY SHOPPING CARTS</h5>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">PRODUCT</th>
            <th scope="col"></th>
            <th class="center" scope="col">PRICE</th>
            <th class="center" scope="col">QTY</th>
            <th class="center" scope="col">TOTAL</th>
            <th class="center" scope="col"></th>
          </tr>
        </thead>
        <tbody v-for="cart in getCarts" :key="cart.id">
          <tr>
            <td>
              <img :src="cart.image" class="mr-3" />
            </td>
            <td>{{cart.name}}</td>
            <td class="center">{{$formatRupiah(cart.price)}}</td>
            <td class="center sum">
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                @click="updateAmount(cart.UserProduct.ProductId, cart.UserProduct.amount, cart.stock, 'subtract')"
              >-</button>
              <button type="button" class="btn btn-light btn-sm">{{cart.UserProduct.amount}}</button>
              <button
                type="button"
                class="btn btn-secondary btn-sm"
                @click="updateAmount(cart.UserProduct.ProductId, cart.UserProduct.amount, cart.stock, 'add')"
              >+</button>
              <br />
              <br />
            </td>
            <td class="center">{{$formatRupiah(count(cart.price, cart.UserProduct.amount))}}</td>
            <td class="close">
              <i class="fas fa-times" @click="deleteItem(cart.UserProduct.ProductId)"></i>
            </td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="center">SUBTOTAL</td>
            <td class="center">{{$formatRupiah(getTotal)}}</td>
          </tr>
        </tbody>
      </table>

      <button type="button" class="btn btn-outline-secondary btn-sm float-right" @click="checkout">
        <i class="fas fa-luggage-cart"></i>PROCEED TO CHECKOUT
      </button>
    </div>
    <div v-else>
      <h1 class="emptycart">
        <img class="mr-3" src="https://image.flaticon.com/icons/svg/2599/2599188.svg" />
        Your cart is empty
        <router-link to="/" class="btn btn-outline-secondary">START SHOPPING</router-link>
      </h1>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  components: {
    Loading
  },
  data() {
    return {
      mycarts: null,
      total: null,
      subtotal: 0,
      isLoading: false
    };
  },
  created() {
    this.$store.dispatch("userCarts");
  },
  computed: {
    getCarts() {
      return this.$store.state.carts;
    },
    getTotal() {
      return this.countTotal();
    }
  },
  methods: {
    deleteItem(ProductId) {
      this.isLoading = true;
      this.$axios({
        method: "delete",
        url: `${this.$server}/carts/${ProductId}`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.isLoading = false;
          this.$store.dispatch("userCarts");
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: "question",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    countTotal() {
      let carts = this.$store.state.carts;
      let subtotal = 0;
      if (carts) {
        carts.forEach(cart => {
          subtotal += cart.price * cart.UserProduct.amount;
        });
        this.subtotal = subtotal;
      }
      return this.subtotal;
    },
    count(price, amount) {
      let count = amount * price;
      this.total = count;
      return count;
    },
    checkout() {
      this.isLoading = true;
      this.$axios({
        method: "put",
        url: `${this.$server}/carts`,
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.isLoading = false;
          this.$swal.fire({
            icon: "success",
            title: `Thank you for shopping!`,
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("userCarts");
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            title: "We're sorry",
            text: err.response.data,
            icon: "question",
            showConfirmButton: false,
            timer: 1500
          });
        });
    },
    updateAmount(ProductId, amount, stock, type) {
      if (type == "add") {
        amount = amount + 1;
      } else {
        amount = amount - 1;
      }
      if (amount == 0) {
        this.$swal
          .fire({
            title: "Delete this item?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#e79796",
            cancelButtonColor: "#ffc988",
            confirmButtonText: "Delete"
          })
          .then(result => {
            if (result.value) {
              this.deleteItem(ProductId);
            } else {
              amount = 1;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
      this.$axios({
        method: "put",
        url: `${this.$server}/carts/${ProductId}`,
        data: {
          amount: Number(amount),
          stock: stock
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(result => {
          this.$store.dispatch("userCarts");
        })
        .catch(err => {
          this.$swal.fire({
            title: err.response.data,
            icon: "error",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
};
</script>

<style scoped>
.sum {
  width: 50px;
}
.center {
  text-align: center;
}
.mycart {
  margin: 10%;
  color: black;
}
.mr-3 {
  width: 100px;
}
.form-check-input {
  width: 30px;
  margin-left: 0;
}
.emptycart {
  margin: 20%;
  color: #e79796;
}
.titlecart {
  color: #e79796;
}
.close {
  cursor: pointer;
}
</style>
