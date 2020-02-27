<template>
  <v-card dark class="d-block ma-2" :elevation="8">
    <v-container>
      <v-row justify="start">
        <v-col cols="auto">
          <v-img height="200" width="200" :src="product.img_url">
            <div class="pa-2">
              <span class="teal white--text pa-2" border>Rp.{{product.price}}</span>
            </div>
          </v-img>
        </v-col>
        <v-col class="px-2">
          <v-row>
            <v-col :cols="6">
              <h2>{{product.name}}</h2>
              <h4>Rp.{{product.price}}</h4>
            </v-col>
            <v-col class="d-flex align-center justify-center">
              <v-btn icon outlined>
                <v-icon
                  @click="qty > 0 && $emit('sub', {item: product, price : product.price}) && qty--"
                >mdi-minus</v-icon>
              </v-btn>
              <h3 class="mx-5">{{qty}}</h3>
              <v-btn icon outlined>
                <v-icon
                  @click=" $emit('add', {item: {id: product.id, qty : 1}, price : product.price}) && qty++"
                >mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col :cols="10">
              <v-card light class="px-2 py-1">
                <p>Description</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </v-card>
            </v-col>
            <v-col class="d-flex justify-end align-end">
              <v-btn icon large>
                <v-icon @click="removeFromCart">mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import api from "../helper/api";
import swal from "sweetalert2";
export default {
  props: ["product"],
  data() {
    return { qty: 0 };
  },
  computed: {
    getCarts() {
      return this.$store.dispatch("getCarts");
    }
  },
  methods: {
    removeFromCart() {
      swal
        .fire("Delete", "Are you sure ?", "warning")
        .then(result => {
          if (result.value) {
            return api.delete(`/carts/${this.product.id}`, {
              headers: { token: localStorage.access_token }
            });
          }
        })
        .then(({ data }) => {
          this.$emit("success-delete");
          swal.fire("Success", data.message, "success");
        })
        .catch(err => console.log(err.response));
    }
  }
};
</script>

<style>
</style>