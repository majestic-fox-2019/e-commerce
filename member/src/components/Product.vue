<template>
  <v-hover v-slot:default="{ hover }" open-delay="10">
    <v-card class="d-inline-block ma-2" dark :elevation="hover ? 16 : 2">
      <v-container>
        <v-row justify="space-between">
          <v-col cols="auto">
            <v-img height="200" width="200" :src="product.img_url">
              <div class="pa-2">
                <span class="teal white--text pa-2" border>Rp.{{product.price}}</span>
              </div>
            </v-img>
          </v-col>

          <v-col cols="auto" class="text-center pl-0">
            <v-row class="flex-column ma-0 fill-height" justify="center">
              <v-col class="px-0">
                <v-btn icon @click="selected" :outlined="isSelected">
                  <v-icon>mdi-cart</v-icon>
                </v-btn>
              </v-col>
              <v-col class="px-0">
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>

              <v-col class="px-0">
                <v-btn icon>
                  <v-icon>mdi-share-variant</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <h3>{{product.name}}</h3>
        <p class="sub-title">Stock : {{product.stock}}</p>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import api from "../helper/api";
import swal from "sweetalert2";
export default {
  props: ["product"],
  data() {
    return { qty: 0, isSelected: false };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    getCarts() {
      return this.$store.dispatch("getCarts");
    }
  },
  methods: {
    selected() {
      if (this.isLoggedIn) {
        const value = {
          productId: this.product.id
        };
        api
          .post("/carts", value, {
            headers: { token: localStorage.access_token }
          })
          .then(({ data }) => {
            swal.fire("Success", data.message, "success").then(result => {
              if (result.value) {
                this.getCarts;
                this.isSelected = true;
              }
            });
          })
          .catch(err => {
            swal.fire("Info", err.response.data.message, "info");
          });
      } else {
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
</style>