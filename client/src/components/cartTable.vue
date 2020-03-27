<template>
  <div>
    <!-- {{ showCart }} -->
    <div v-if="showCart">
      <div v-if="showCart.length">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Image</th>
              <th scope="col">Product</th>
              <th scope="col">Price</th>
              <th scope="col">Qty</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, idx) in showCart" :key="idx">
              <th scope="row">{{ idx + 1 }}</th>
              <td>
                <i
                  class="far fa-times-circle"
                  style="cursor:pointer;"
                  v-on:click="deleteCart(cart.Cart.ProductId)"
                ></i
                ><img class="image" :src="cart.image_url" />
              </td>
              <td>{{ cart.name }}</td>
              <td>{{ currencyFormatter(cart.price) }}</td>
              <td>
                <form v-on:submit.prevent="updateTotal(cart.id, cart.Cart.total)">
                  <div class="form-group">
                    <input
                      type="number"
                      min="1"
                      class="totalFrom form-control"
                      v-model="cart.Cart.total"
                      v-on:change="checkUpdate(cart.id)"
                    />
                  </div>
                  <div v-if="isUpdate && checkId == cart.id">
                    <button>update</button>
                  </div>
                </form>
              </td>
              <td>{{ currencyFormatter(cart.Cart.total * cart.price) }}</td>
            </tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
            <td></td>
            <td>SubTotal</td>
            <td>{{ currencyFormatter(showSubTotal) }}</td>
          </tbody>
        </table>
        <button class="checkout btn btn-outline-primary" v-if="showCart" v-on:click="checkout">
          checkout
        </button>
      </div>

      <div class="empty" v-if="showCart.length == 0">
        <h1>Cart is empy</h1>
        <router-link to="/"><p>Back To Home</p></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "cartTable",
  components: {},
  data() {
    return {
      total: 0,
      isUpdate: false,
      checkId: null
    };
  },

  created() {
    this.$store.dispatch("showCart");
  },
  computed: {
    showCart() {
      if (localStorage.token) {
        return this.$store.state.dataCarts;
      } else {
        return false;
      }
    },
    showSubTotal() {
      return this.$store.state.subTotal;
    }
  },
  methods: {
    checkUpdate(id) {
      this.isUpdate = true;
      this.checkId = id;
    },
    deleteCart(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios({
            method: "delete",
            headers: { token: localStorage.token },
            url: `/cart/${id}`
          })
            .then(() => {
              Swal.fire("Deleted!", "Your cart has been deleted.", "success");
              this.$store.dispatch("showCart");
            })
            .catch(err => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
            });
        }
      });
    },
    currencyFormatter(input) {
      return this.$currencyFormatter(input);
    },
    updateTotal(id, total) {
      this.$axios({
        method: "put",
        url: "/cart",
        headers: { token: localStorage.token },
        data: { total: total, ProductId: id }
      })
        .then(() => {
          Swal.fire({
            position: "mid",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.isUpdate = false;
          this.$store.dispatch("showCart");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    },
    checkout() {
      this.$axios({
        method: "put",
        url: "/cart/checkout",
        headers: { token: localStorage.token },
        data: { cart: this.showCart }
      })
        .then(data => {
          Swal.fire({
            position: "mid",
            icon: "success",
            title: "Checkout Success",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("showCart");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    }
  }
};
</script>

<style scoped>
.checkout {
  margin-left: 45%;
}
.image {
  width: 100px;
  height: 100px;
}
.form-control {
  width: 50px;
}
.empty {
  margin-left: 40%;
  margin-top: 14%;
}
</style>
