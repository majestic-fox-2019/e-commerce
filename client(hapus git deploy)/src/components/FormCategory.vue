<template>
  <div>
    <form @submit.prevent="addCategory" enctype="multipart/form-data">
      <div class="form-group">
        <label for="exampleInputEmail1">Category Name</label>
        <input
          type="text"
          class="form-control form-control-name"
          placeholder="Name..."
          v-model="inputCategory.name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Upload Image</label>
        <input class="border" type="file" @change="getImage($event)" />
      </div>
      <button type="submit" class="btn btn-primary">Add Category</button>
    </form>
  </div>
</template>

<script>
import { Toast, Swal } from "@/api/swal.js";
import axios from "axios";

export default {
  data() {
    return {
      inputCategory: {
        name: null,
        image: null
      }
    };
  },
  methods: {
    addCategory() {
      let data = {
        name: this.inputCategory.name,
        image: this.inputCategory.image
      };
      this.$axios
        .post("/categories", data, {
          headers: {
            token: localStorage.token
          }
        })
        .then(res => {
          this.$store.dispatch("getAllCategories");

          Toast.fire({
            icon: "success",
            title: `Game ${res.data.name} added to list`,
            timer: 2000
          });
        })
        .catch(error => {
          console.log(error.response)
          let errorMsg = error.response.data.errors;
          let template = `<ul class="text-left" style='list-style: none; font-size:16px; font-weight: 700'>`;

          Object.keys(errorMsg).forEach(el => {
            template += `<li> ${errorMsg[el]} </li>`;
          });

          template += `</ul>`;

          Swal.fire({
            title: "Error!",
            html: template,
            icon: "error",
            confirmButtonText: "Try again"
          });
        });
    },
    getImage(event) {
      const file = event.target.files[0];
      const url = `https://storage.googleapis.com/upload/storage/v1/b/storage-example/o?name=hafizul/${file.name}.png&uploadType=media&key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`;
      axios
        .post(url, file, {
          headers: {
            "Content-Type": "image/png"
          }
        })
        .then(res => {
          this.inputCategory.image = `https://storage.googleapis.com/storage-example/${res.data.name}`;
        })
        .catch(error => {
          console.log(error.response);
        });
    }
  }
};
</script>

<style>
.form-control-name {
  width: 300px;
  margin: auto;
}
</style>