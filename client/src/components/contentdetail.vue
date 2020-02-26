<template>
  <div class="row">
    <div class="col-10 offset-md-1 box">
      <div class="card mb-3" style="width: 100% height:300px;">
        <div class="row no-gutters" style="height:auto">
          <div class="col-md-4" style="position:relative; top:50%; transform:translateY(-50%);">
            <img :src="this.image_url" class="card-img" alt />
          </div>
          <div class="col-md-8">
            <div class="card-body" style="position:relative; top:50%; transform:translateY(-50%);">
              <h1 class="card-title">{{this.name}}</h1>
              <p class="card-text">{{this.detail}}</p>
              <h3 class="card-text">{{getmoney(this.price)}}</h3>
              <button class="btn btn-primary" @click="addcart()">Add Cart</button>
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
  data() {
    return {
      price: null,
      detail: null,
      name: null,
      id: null,
      image_url: null
    };
  },
  methods: {
    addcart() {
      axios({
        method: "POST",
        url: `http://localhost:3000/carts/${this.$route.params.id}`,
        data: { quantity: 1 },
        headers: {
          token: localStorage.token
        }
      })
        .then(response => {
          this.$Swal.fire({
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
          });
        })
        .catch(error => {
          this.$Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "One Item per Customer"
          });
        });
    },
    getmoney(money) {
      return this.$currencyMaker(money);
    },
    getData() {
      console.log(this.$route.params.id);
      axios({
        method: "GET",
        url: `http://localhost:3000/products/${this.$route.params.id}`,
        headers: { token: localStorage.token }
      })
        .then(res => {
          let result = res.data;
          console.log(result);
          this.price = result.price;
          this.detail = result.detail;
          this.name = result.name;
          this.id = result.id;
          this.image_url = result.image_url;
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
    this.getData();
  }
};
</script>

<style scoped>
.col-md-8 {
  align-content: center;
}
.box {
  padding: 50px;
}
.card-img {
  padding: 50px;
}
.card-body {
  padding: 30px;
}
.card {
  height: 250px;
}
</style>
