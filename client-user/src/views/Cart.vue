<template>
  <v-container>
    <v-simple-table class="mt-12" width="100">
      <template v-slot:default>
        <thead style="background-color: rgba(202, 197, 190, 0.69);">
          <tr>
            <th class="text-center title-table" width="5%">#</th>
            <th class="text-center title-table" width="15%">Poster</th>
            <th class="text-center title-table" width="15%">Game Title</th>
            <th class="text-center title-table" width="25%">Amount</th>
            <th class="text-center title-table" width="20%">Price</th>
            <th class="text-center title-table" width="10%">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cart,i) in carts" :key="i" class="text-center">
            <td style="font-weight: bolder">{{ i + 1 }}</td>
            <td>
              <img :src="cart.image_url" class="p-2" height="100" width="150" />
            </td>
            <td>{{ cart.name }}</td>
            <td>
              {{ $qtyConverter(cart.amount) }}
              <div v-for="(stock, i) in outOfStock" :key="i">
                <p
                  v-if="stock.id == cart.ProductId"
                  style="color:red; font-size: 12px"
                >Insufficient stock, current stock is {{ stock.stock}}</p>
              </div>
            </td>
            <td>{{ $currencyConverter(cart.price) }}</td>
            <td>
              <div class="text-center">
                <v-icon color="blue" @click="changeQty(cart.id, -1, cart.amount)">mdi-minus-box</v-icon>
                <input
                  type="number"
                  class="text-center"
                  style="display: inline; width: 25px; height: 18px; border: 0.5px solid black; font-size: 13px"
                  v-model="cart.amount"
                  @change="changeQty(cart.id, 0, cart.amount)"
                  min="0"
                />
                <v-icon color="green" @click="changeQty(cart.id, 1, cart.amount)">mdi-plus-box</v-icon>
              </div>
              <div>
                <v-btn small color="error" @click="deleteItem(cart.id, cart.name)">
                  Remove
                  <v-icon right>mdi-delete</v-icon>
                </v-btn>
              </div>
            </td>
          </tr>
          <tr class="text-center" style="background-color: rgba(202, 197, 190, 0.69);">
            <td colspan="3" style="font-size: 17px; font-weight: bold;">TOTAL</td>
            <td style="font-size: 17px; font-weight: bold;">{{ $qtyConverter(totalAmount) }}</td>
            <td style="font-size: 17px; font-weight: bold;">{{ $currencyConverter(totalPrice) }}</td>
            <td>
              <v-btn small color="success" @click="proceedPayment">
                Pay
                <v-icon right>mdi-cash-multiple</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { Swal, Toast } from "../api/swal";

export default {
  data() {
    return {
      carts: [],
      totalPrice: null,
      totalAmount: null,
      outOfStock: null
    };
  },
  methods: {
    proceedPayment() {
      Swal.fire({
        title: "Proceed Checkout Producst?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Checkout!"
      }).then(result => {
        if (result.value) {
          this.$axios
            .put(
              `/carts`,
              {
                carts: this.carts
              },
              {
                headers: {
                  token: localStorage.token
                }
              }
            )
            .then(res => {
              this.getUserCart();
              this.$emit("countCart");

              Swal.fire({
                title: "<strong>Yay!</strong>",
                icon: "success",
                html:
                  "<p style='font-size: 16px'>Thank you for purchasing our product</p>",
                showCloseButton: true,
                confirmButtonText:
                  "<v-btn class='ma-2' color='success'> Shop </v-btn>",
                confirmButtonAriaLabel: "Thumbs up, great!"
              });
              this.$router.push({ name: "Products" });
            })
            .catch(error => {
              this.outOfStock = error.response.data.errors;
            });
        }
      });
    },
    getUserCart() {
      this.totalPrice = 0;
      this.totalAmount = 0;
      this.outOfStock = null;

      this.$axios
        .get("/carts", {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          let arr = [];
          let temp = {};
          res.data.Carts.forEach(el => {
            temp.id = el.id;
            temp.ProductId = el.Product.id;
            temp.name = el.Product.name;
            temp.image_url = el.Product.image_url;
            temp.price = el.Product.price;
            temp.stock = el.Product.stock;
            temp.amount = el.amount;

            this.totalPrice += el.Product.price * el.amount;
            this.totalAmount += el.amount;

            arr.push(temp);
            temp = {};
          });
          this.carts = arr;
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeQty(id, num, currentNum) {
      num = Number(currentNum) + Number(num);
      console.log(num);
      if (num < 0) {
        this.getUserCart();
        Toast.fire({
          icon: "error",
          position: "top",
          title: `Product amount can't be less than zero!`,
          timer: 1500
        });
      } else {
        this.$axios
          .patch(
            `/carts/${id}`,
            {
              num
            },
            {
              headers: {
                token: localStorage.token
              }
            }
          )
          .then(res => {
            this.getUserCart();
            this.outOfStock = null;
            this.$emit("countCart");
          })
          .catch(({ response }) => {
            let errorMsg = response.data.errors.amount;
            if (errorMsg == "Amount can't be less than zero") {
              Toast.fire({
                icon: "error",
                position: "top",
                title: `Product amount can't be less than zero!`,
                timer: 1500
              });
            }
          });
      }
    },
    deleteItem(id, name) {
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
          this.$axios
            .delete(`/carts/${id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(data => {
              this.$emit("countCart");

              this.getUserCart();

              Toast.fire({
                icon: "success",
                title: `Product ${name} removed from your cart`,
                timer: 2000
              });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  },
  created() {
    this.getUserCart();
  }
};
</script>

<style>
.title-table {
  font-size: 15px !important;
  font-weight: bold !important;
  color: black !important;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>