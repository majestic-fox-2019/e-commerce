<template>
  <b-container>
    <template v-if="product !== null">
      <b-img-lazy :src="product.image_url" fluid-grow alt="Responsive image" />
      <b-card>
        <b-card-text>
          <b-card-title>
            <h3>{{product.name}}</h3>
          </b-card-title>
          <p class="lead">Price: Rp{{ product.price }}</p>
          <p>Stock: {{ product.stock }}</p>
        </b-card-text>
        <b-button @click="addToCart" href="#" variant="info">Add To Cart</b-button>
      </b-card>
    </template>
    <template v-else>
      <div class="text-center">
        <b-spinner variant="primary" label="Text Centered"></b-spinner>
      </div>
    </template>
  </b-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "ProductById",
  data() {
    return {
      product: null
    };
  },
  methods: {
    addToCart() {
      const vm = this;
      Swal.showLoading();
      axios({
        url: "/carts",
        method: "post",
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          ProductId: vm.$route.params.id,
          quantity: 1
        }
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Added to cart"
        })
      }).catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Not added to cart"
        })
      });
    }
  },
  created() {
    const vm = this;
    axios({
      url: `/products/${vm.$route.params.id}`,
      method: "get"
    })
      .then(({ data }) => {
        vm.product = data;
        Swal.close();
      })
      .catch(err => {
        console.error(err);
        Swal.fire({
          title: "Product not found",
          icon: "error"
        }).then(() => {
          vm.$router.push("/products");
        });
      });
  }
};
</script>

<style></style>
