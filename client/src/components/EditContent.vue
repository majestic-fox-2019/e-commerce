<template>
  <div class="row">
    <div class="card col-6 offset-3">
      <div class="card-header">Edit</div>
      <div class="card-body">
        <form method="POST" v-on:submit.prevent="editOne">
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" class="form-control" v-model="form.name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Price</label>
            <input type="number" class="form-control" v-model="form.price" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Stocks</label>
            <input type="number" class="form-control" v-model="form.stock" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Image URL</label>
            <input type="text" class="form-control" v-model="form.image_url" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Example select</label>
            <select class="form-control" id="exampleFormControlSelect1" v-model="form.CategoryId">
              <option value="1">Party Game</option>
              <option value="2">Negotiation</option>
              <option value="3">Strategy</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              v-model="form.detail"
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "editData",
  data() {
    return {
      form: {
        name: null,
        stock: null,
        price: null,
        image_url: null,
        CategoryId: null,
        detail: null
      }
    };
  },
  methods: {
    editOne() {
      axios({
        method: "PUT",
        url: `https://sleepy-fjord-45887.herokuapp.com/products/${this.$route.params.id}`,
        data: {
          name: this.form.name,
          stock: this.form.stock,
          price: this.form.price,
          image_url: this.form.image_url,
          CategoryId: this.form.CategoryId
        },
        headers: { token: localStorage.token }
      })
        .then(res => {
          this.$store.dispatch("getAllProduct");
          this.$router.push({ name: "Content" });
        })
        .catch(err => {
          this.$Swal.fire({
            icon: "error",
            text: `${err}`
          });
        });
    },
    getData() {
      axios({
        method: "GET",
        url: `https://sleepy-fjord-45887.herokuapp.com/products/${this.$route.params.id}`,
        headers: { token: localStorage.token }
      })
        .then(res => {
          let result = res.data;
          this.form.name = result.name;
          this.form.stock = result.stock;
          this.form.price = result.price;
          this.form.image_url = result.image_url;
          this.form.CategoryId = result.CategoryId;
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

<style>
.card-header {
  font-size: 20px;
}
</style>