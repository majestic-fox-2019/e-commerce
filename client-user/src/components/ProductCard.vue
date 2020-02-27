<template>
  <div>
    <v-card class="d-flex content-card flex-wrap mt-5">
      <v-card
        width="250"
        class="mx-auto mt-2 mb-5 card-products"
        v-for="product in products"
        :key="product.id"
      >
        <v-img :src="product.image_url" height="200"></v-img>
        <v-card-actions class="title">
          <v-card-text class="font-weight-bold text-center mt-2 ml-7 title-text">{{ product.name }}</v-card-text>
          <v-spacer></v-spacer>
          <v-btn icon @click="addToCart(product.id, product.name)">
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-card-actions>
        <v-row class="detail-product mx-4 justify-space-between mt-1">
          <p class="font-weight-bold">Price</p>
          <p>{{ $currencyConverter(product.price) }}</p>
        </v-row>
        <v-row class="detail-product mx-4 justify-space-between">
          <p class="font-weight-bold">Stock</p>
          <p>{{ $qtyConverter(product.stock) }}</p>
        </v-row>
        <v-row class="detail-product mx-4 mb-1 justify-space-between">
          <p class="font-weight-bold">Category</p>
          <p>{{ product.Category.name }}</p>
        </v-row>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import { Swal, Toast } from "@/api/swal.js";

export default {
  methods: {
    getProducts() {
      this.$store.dispatch("getAllProducts");
    },
    addToCart(productId, name) {
      if (!this.isLogin) {
        Swal.fire({
          title: "You are not signed in",
          text: "Please login to add product into cart",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "rgba(34, 250, 10, 0.83)",
          cancelButtonColor: "#FAE20A",
          cancelButtonText: "Back",
          confirmButtonText: "Login"
        }).then(result => {
          if (result.value) {
            this.$router.push({ name: "Login" });
          }
        });
      } else {
        this.$axios
          .post(
            "/carts",
            {
              ProductId: productId
            },
            {
              headers: {
                token: localStorage.token
              }
            }
          )
          .then(res => {
            this.$emit("countCart");

            if (res.status == 200) {
              Toast.fire({
                icon: "success",
                title: `${name} amount added by 1`,
                timer: 1000
              });
            } else {
              Toast.fire({
                icon: "success",
                title: `${name} added to cart`,
                timer: 1000
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    converting(num) {
      let str = String(num);
      let converted = "";
      for (let i = 0; i < str.length; i++) {
        if ((str.length - i) % 3 == 0 && i !== 0) {
          converted += "." + str[i];
        } else {
          converted += str[i];
        }
      }
      return `Rp. ${converted},00`;
    },
    stockcount(num) {
      if (num <= 1) {
        return num + " pc";
      } else {
        return num + " pcs";
      }
    }
  },
  created() {
    if (this.$route.params.category) {
      this.$store.dispatch("filterByCategory", this.$route.params.category);
    } else {
      this.getProducts();
    }
  },
  computed: {
    products() {
      return this.$store.state.listProducts;
    },
    isLogin() {
      return this.$store.state.isLogin;
    }
  },
  watch: {
    $route() {
      if (this.$route.params.category) {
        this.$store.dispatch("filterByCategory", this.$route.params.category);
      } else {
        this.getProducts();
      }
    }
  }
};
</script>

<style>
.title {
  height: 35px;
  font-size: 13px;
}

.content-card {
  background-color: rgba(224, 224, 224, 0.36) !important;
}

.detail-product {
  font-size: 14px;
  margin-bottom: -13px;
}

.card-products:hover {
  background-color: rgba(63, 161, 191, 0.4) !important;
  transition: 2s;
}
</style>