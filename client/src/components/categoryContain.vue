<template>
  <tr>
    <th scope="row">{{ idx + 1 }}</th>
    <td>{{ category.name }}</td>
    <td>
      <i
        v-on:click="deleteCategory(category.id)"
        class="far fa-trash-alt"
        style="cursor: pointer; width: 30px;"
      ></i>
    </td>
  </tr>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "categoryContain",
  props: ["category", "idx"],
  methods: {
    deleteCategory(id) {
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
            url: `/category/${id}`,
            headers: { token: localStorage.token }
          })
            .then(() => {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              this.$store.dispatch("showCategory");
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
