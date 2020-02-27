<template>
  <div>
    <div v-if="Array.isArray(products)" class="row">
      <table class="table text-white table-dark text-left">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, i) in products" :key="product.id">
            <th scope="row">{{i +1}}</th>
            <td>
              <img style="width: 72px; height: auto;" :src="product.img_url" />
            </td>
            <td>
              <p>{{product.name}}</p>
            </td>
            <td>
              <p>{{product.price}}</p>
            </td>
            <td>
              <p>{{product.stock}}</p>
            </td>
            <td>
              <i
                class="btn btn-info fa mx-2 fa-edit"
                @click="$router.push({name: 'update_product', params: {id: product.id}})"
              ></i>
              <i class="btn btn-warning fa mx-2 fa-trash" @click="deleteProduct(product.id)"></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-else-if="!Array.isArray(products)" :msg="products && products.message" />
  </div>
</template>

<script>
import NoData from "../components/NoData";
import Swal from "sweetalert2";
import api from "../helper/api";
export default {
  components: {
    NoData
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    deleteProduct(id) {
      Swal.fire(
        "Confirmation",
        "Are you sure want to delete this producr?",
        "question"
      ).then(res => {
        if (res.value) {
          api
            .delete(`/products/${id}`, {
              headers: { token: localStorage.access_token }
            })
            .then(({ data }) => {
              this.$store.dispatch("getProducts");
              Swal.fire("Success", data.message, "success");
            })
            .catch(err => {
              Swal.fire("Error", err.response.data.message, "warning");
            });
        }
      });
    }
  }
};
</script>

<style>
</style>