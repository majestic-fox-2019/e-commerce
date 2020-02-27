<template>
  <v-container>
    <v-row>
      <v-col :cols="8">
        <v-card class="pa-2" tile outlined>
          <h2 class="pa-3">Shopping Cart</h2>
          <div v-if="Array.isArray(carts)">
            <cart-product
              @add="add"
              @sub="sub"
              @success-delete="deleted"
              v-for="product in carts"
              :key="product.id"
              :product="product"
              :amount="amount"
            />
          </div>
          <div v-else>
            <v-container class="text-center">
              <v-img class="mx-auto" height="480" width="480" contain src="@/assets/no_data.svg"></v-img>
              <p type="font-weight-bold">{{carts && carts.message}}</p>
            </v-container>
          </div>
        </v-card>
      </v-col>
      <v-col :cols="4">
        <v-card class="pa-5" tile outlined>
          <h2>Summarize</h2>
          <div class="my-5">
            <h3 class="d-flex justify-space-between">
              <span class="pr-5">Amount</span>
              {{amount}}
            </h3>
            <h3 class="d-flex justify-space-between">
              <span class="pr-5">Price</span>
              Rp{{price}}
            </h3>
          </div>
          <v-btn color="teal" :elevation="4" @click="checkStock" filled>Checkout</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartProduct from "../components/CartProduct";
import api from "../helper/api";
import Swal from "sweetalert2";
export default {
  components: {
    CartProduct
  },
  data() {
    return {
      qty: 0,
      amount: 0,
      price: 0,
      temp: []
    };
  },
  mounted() {
    this.$store.dispatch("getCarts");
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    }
  },
  methods: {
    deleted() {
      this.$store.dispatch("getCarts");
    },
    add(value) {
      this.amount++;
      this.price += value.price;
      if (this.temp.length === 0) {
        this.temp.push(value.item);
      } else {
        let flag = false;
        let index = null;
        this.temp.forEach((el, i) => {
          if (value.item.id === el.id) {
            flag = true;
            index = i;
          }
        });
        if (flag) {
          this.temp[index].qty += 1;
        } else {
          this.temp.push(value.item);
        }
      }
    },
    sub(value) {
      this.amount > 0 && this.amount--;
      this.price -= value.price;

      let flag = false;
      let index = null;
      this.temp.forEach((el, i) => {
        if (value.item.id === el.id) {
          el.qty -= 1;
          if (el.qty === 0) {
            this.temp.splice(i, 1);
          }
        }
      });
    },
    checkStock() {
      api
        .get("/products")
        .then(({ data }) => {
          let message = [];
          data.forEach(el => {
            this.temp.forEach(temp => {
              if (el.id === temp.id) {
                if (el.stock < temp.qty) {
                  message.push(`Stock "${el.name}" sisa ${el.stock}`);
                }
              }
            });
          });
          if (message.length > 0) {
            Swal.fire("Failed", message.join(", "), "warning");
          } else {
            if (this.temp.length === 0) {
              Swal.fire(
                "Failed",
                "At least one product must be selected",
                "warning"
              );
            } else {
              api
                .put(
                  "/carts/checkout",
                  { value: this.temp },
                  {
                    headers: { token: localStorage.access_token }
                  }
                )
                .then(({ data }) => {
                  console.log(data);
                  this.$store.dispatch("getProducts");
                  this.$router.push("/payment");
                })
                .catch(err => console.log(err));
            }
          }
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style>
</style>