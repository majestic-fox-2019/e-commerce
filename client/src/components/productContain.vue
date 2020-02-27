<template>
  <tr>
    <th scope="row">{{ idx + 1 }}</th>
    <td>{{ product.name }}</td>
    <td>{{ product.image_url }}</td>
    <td>{{ product.price }}</td>
    <td>{{ product.stock }}</td>
    <td>{{ product.Category.name }}</td>
    <td>
      <router-link class="nav-link" :to="{ name: 'detailProduct', params: { id: product.id } }"
        >Detail</router-link
      >
    </td>
    <td>
      <i
        v-on:click="deleteProduct(product.id)"
        class="far fa-trash-alt"
        style="cursor: pointer; width: 30px;"
      ></i>
    </td>
  </tr>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "productContain",
  created() {},
  props: ["product", "idx"],
  methods: {
    deleteProduct(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          this.$axios({
            method: "delete",
            url: `/products/${id}`,
            headers: { token: localStorage.token }
          })
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
      });
    }
  }
};
</script>

<style></style>
