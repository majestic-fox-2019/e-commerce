<template>
  <div class="row">
    <div class="col-4" v-for="(product, idx) in products" :key="idx">
      <div class="card" style="width: 20rem;  min-height:450px;">
        <img
          class="card-img-top image"
          :src="product.image_url"
          style="height:325px"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">Price : Rp. {{product.price}}</p>
          <div class="row">
            <div class="col-6">
              <i class="fas fa-trash-alt tipebutton" v-on:click="deleteOne(product.id)"></i>
            </div>
            <div class="col-6">
              <router-link class="far fa-edit" :to="{name:'EditContent', params:{id:product.id}}"></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Category",
  data() {
    return {
      products: null
    };
  },
  methods: {
    getCategory() {
      axios({
        method: "GET",
        url: `https://sleepy-fjord-45887.herokuapp.com/products/category/${this.$route.params.id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(data => {
          this.products = data.data;
        })
        .catch(err => {
          this.$Swal.fire({
            icon: "error",
            text: `${err}`
          });
        });
    }
  },
  mounted() {
    this.getCategory();
  },
  watch: {
    $route() {
      this.getCategory();
    }
  }
};
</script>

<style>
</style>