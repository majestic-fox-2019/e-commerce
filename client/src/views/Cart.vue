<template>
  <div>
    <b-jumbotron header="Cart Page"></b-jumbotron>
    <b-container>
      <template v-if="carts !== null">
        <template v-if="carts.length !== 0">
          <b-row>
            <b-col cols="9">
              <b-row>
                <b-col cols="12">
                  <b-card
                    no-body
                    class="overflow-hidden"
                    v-for="(cart, index) in carts"
                    :key="index"
                  >
                    <b-row no-gutters>
                      <b-col md="6">
                        <b-card-img
                          :src="cart.Product.image_url"
                          class="rounded-0"
                        ></b-card-img>
                      </b-col>
                      <b-col md="6">
                        <b-card-body :title="cart.Product.name">
                          <b-card-text>
                            <p class="lead">Rp{{ cart.Product.price }}</p>
                            <p>Qty: {{ cart.quantity }}</p>
                          </b-card-text>
                          <b-button @click="removeFromCart(cart.Product.id)"
                            >Remove</b-button
                          >
                        </b-card-body>
                      </b-col>
                    </b-row>
                  </b-card>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="3" class="justify-content-center text-center">
              <b-button variant="success" @click="checkout">Checkout</b-button>
            </b-col>
          </b-row>
        </template>
        <template v-else>
          <div class="d-flex justify-content-center mb-3">
            <h3>Cart is Empty</h3>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="d-flex justify-content-center mb-3">
          <b-spinner
            label="Loading..."
            style="width: 4rem; height: 4rem;"
          ></b-spinner>
        </div>
      </template>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cart",
  data() {
    return {
      carts: null
    };
  },
  methods: {
    getCart() {
      const vm = this;
      axios({
        url: "/carts",
        method: "get",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          vm.carts = data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    removeFromCart(ProductId) {
      const vm = this;
      axios({
        url: `/carts/${ProductId}`,
        method: "delete",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(() => {
          vm.getCart();
        })
        .catch(err => {
          console.error(err);
        });
    },
    checkout() {
      const vm = this;
      const items = [];
      for (let i = 0; i < vm.carts.length; i++) {
        const item = vm.carts[i];
        items.push({
          ProductId: item.ProductId,
          quantity: item.quantity,
          productName: item.Product.name,
          price: item.Product.price
        });
      }
      axios({
        url: "/transactions",
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          items
        }
      })
        .then(({ data }) => {
          console.log(data  );
        })
        .catch(err => {
          console.error(err);
        });
    }
  },
  created() {
    const vm = this;
    vm.getCart();
  }
};
</script>

<style></style>
