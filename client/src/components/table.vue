<template>
  <div>
    <div class="judul" style="text-align:center">
      <h1>Product Table</h1>
    </div>
    <div class="button">
      <buttonCategory :categories="showCategory" @getCategory="getCategory"></buttonCategory>
    </div>
    <div class="table">
      <div></div>
      <br />
      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">ImageUrl</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Category</th>
            <th scope="col">Detail</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody v-for="(product, idx) in showData" :key="idx">
          <productContain :product="product" :idx="idx"></productContain>
        </tbody>
      </table>
    </div>
    <!-- Modal ADD -->
    <div
      class="modal fade"
      id="addModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Add Modal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="addProduct">
              <div class="form-group">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  v-model="form.name"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Image Url</label>
                <input
                  type="text"
                  v-model="form.image_url"
                  class="form-control"
                  placeholder="Image Url"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Price</label>
                <input type="text" v-model="form.price" class="form-control" placeholder="Price" />
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">Stock</label>
                <input type="text" v-model="form.stock" class="form-control" placeholder="Stock" />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Category</label>
                <select
                  v-model="form.CategoryId"
                  class="form-control"
                  id="exampleFormControlSelect1"
                >
                  <option v-for="(category, idx) in showCategory" :key="idx" :value="category.id">{{
                    category.name
                  }}</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import productContain from "./productContain.vue";
import buttonCategory from "./buttonCategory.vue";

export default {
  name: "tableProduct",
  data() {
    return {
      form: {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      },
      category: null
    };
  },
  components: {
    productContain,
    buttonCategory
  },
  created() {
    this.$store.dispatch("showData");
    this.$store.dispatch("showCategory");
  },
  computed: {
    showData() {
      // category yg diinginkan
      // arr of obj {cateegory}
      const filterArr = [];
      const products = this.$store.state.dataProducts;
      if (this.category) {
        for (let i = 0; i < products.length; i += 1) {
          if (products[i].Category.name === this.category) {
            filterArr.push(products[i]);
          }
        }
        return filterArr;
      }

      return this.$store.state.dataProducts;

      // mau return array isi obj yg udah di filter category nya
    },
    showCategory() {
      return this.$store.state.dataCategories;
    }
  },
  methods: {
    getCategory(cat) {
      this.category = cat;
    },
    addProduct() {
      this.$axios({
        method: "post",
        url: "/products",
        headers: { token: localStorage.token },
        data: {
          name: this.form.name,
          image_url: this.form.image_url,
          price: this.form.price,
          stock: this.form.stock,
          CategoryId: this.form.CategoryId
        }
      })
        .then(() => {
          window.$("#addModal").modal("hide");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Data has been saved",
            showConfirmButton: false,
            timer: 1500
          });
          this.$store.dispatch("showData");
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        });
    }
  }
};
</script>

<style>
.btn {
  margin-right: 10px;
}
</style>
