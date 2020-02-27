<template>
  <b-row>
    <b-col cols="3">
      <span>Category</span>
      <b-card v-for="category in categories" :key="category.id">
        {{ category.name }}
      </b-card>
    </b-col>
    <b-col>
      <span>Products</span>
      <b-card
        no-body
        class="overflow-hidden"
        v-for="product in products"
        :key="product.id"
      >
        <b-row no-gutters>
          <b-col md="6">
            <b-card-img :src="product.image_url" class="rounded-0"></b-card-img>
          </b-col>
          <b-col md="6">
            <b-card-body>
              <b-card-title>
                <router-link :to="`/products/${product.id}`">{{
                  product.name
                }}</router-link>
              </b-card-title>
              <b-card-text>
                <p>Rp{{ convertPrice(product.price) }}</p>
              </b-card-text>
            </b-card-body>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import axios from "axios";
export default {
  name: "ProductHome",
  data() {
    return {
      products: [],
      categories: []
    };
  },
  methods: {
    convertPrice(price) {
      price = String(price);
      let count = 0;
      let newPrice = [];
      for (let i = price.length - 1; i >= 0; i--) {
        newPrice.push(price[i]);
        count++;
        if (count % 3 === 0 && i !== 0) {
          newPrice.push(".");
        }
      }
      newPrice = newPrice.reverse();
      return newPrice.join("");
    }
  },
  created() {
    const vm = this;
    axios({
      url: "/products",
      method: "get"
    })
      .then(({ data }) => {
        vm.products = data;
      })
      .catch(err => {
        console.error(err);
      });
    axios({
      url: "/categories",
      method: "get"
    })
      .then(({ data }) => {
        vm.categories = data;
      })
      .catch(err => {
        console.error(err);
      });
  }
};
</script>

<style></style>
