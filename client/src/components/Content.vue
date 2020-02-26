<template>
  <div class="row">
    <div class="col-4" v-for="(product, idx) in getAllData()" :key="idx">
      <div class="card mb-5" style="width: 20rem; min-height:450px;">
        <img
          class="card-img-top image img-fluid"
          style="height:325px"
          :src="product.image_url"
          alt="Responsive image"
        />
        <div class="card-body">
          <h5 class="card-title">{{product.name}}</h5>
          <p class="card-text">Price : Rp. {{product.price}}</p>
          <div class="row">
            <div class="col-6">
              <i class="fas fa-trash-alt tipebutton" v-on:click="deleteOne(product.id)"></i>
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
  name: "Content",
  data() {
    return {
      deleteIdx: null
    };
  },
  methods: {
    getAllData() {
      return this.$store.state.products;
    },
    deleteOne(id) {
      this.$Swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            axios({
              method: "DELETE",
              url: `http://localhost:3000/products/${id}`,
              headers: { token: localStorage.token }
            }).then(res => {
              this.$store.dispatch("getAllProduct");
              this.$router.push({ name: "Content" });
            });
            this.$Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            );
          }
        });
    }
  }
};
</script>
<style>
.tipebutton {
  cursor: pointer;
}
</style>