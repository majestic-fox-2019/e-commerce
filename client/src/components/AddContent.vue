<template>
  <div class="row">
    <div class="card col-6 offset-3">
      <div class="card-header">Add</div>
      <div class="card-body">
        <form method="POST" v-on:submit.prevent="addOne">
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
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "AddData",
  data() {
    return {
      form: {
        category: null,
        stocks: null,
        price: null,
        image_url: null,
        CategoryId: null
      }
    };
  },
  methods: {
    addOne() {
      axios({
        method: "POST",
        url: `http://localhost:3000/products`,
        data: this.form,
        headers: { token: localStorage.token }
      })
        .then(res => {
          this.$store.dispatch("getAllProduct");
          this.$router.push({ name: "Content" });
          this.$Swal.fire("Good job!", 1, "success");
        })
        .catch(err => {
          this.$Swal.fire({
            icon: "error",
            text: `${err}`
          });
        });
    }
  }
};
</script>

<style>
.card-header {
  font-size: 20px;
}
</style>