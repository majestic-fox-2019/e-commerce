<template>
  <div class="row">
    <div class="col-10 offset-md-1 box">
      <div class="card mb-3" style="width: 100% height:300px;">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img
              src="https://cf.geekdo-images.com/imagepagezoom/img/8WnWnWR-u58DCbhxEwcmtsk5UJQ=/fit-in/1200x900/filters:no_upscale()/pic3483909.jpg"
              class="card-img"
              alt
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h1 class="card-title">{{this.name}}</h1>
              <p class="card-text">{{}}</p>
              <h3 class="card-text">{{this.price}}</h3>
              <button type="button" class="btn btn-primary btn-lg">Large button</button>
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
.box {
  margin-top: 100px;
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
