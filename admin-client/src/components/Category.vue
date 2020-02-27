<template>
  <div class="container mt-5">
    <div class="text-right mb-4">
      <h3 class="font-weight-bold text-left">Category List</h3>
      <button @click="$router.push('/category/add')" class="btn btn-light font-weight-bold">
        <i :class="isAddData ?'fa fa-arrow-left mr-2': 'fa fa-plus mr-2'"></i>
        {{isAddData ? 'Cancel' : 'ADD'}}
      </button>
    </div>
    <router-view @success="$store.dispatch('getCategories')"></router-view>
  </div>
</template>

<script>
import api from "../helper/api";
import swal from "sweetalert2";
export default {
  data() {
    return {
      isAddData: false
    };
  },
  methods: {
    gotoAddForm() {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/category");
      } else {
        this.$router.push({ name: "AddCategory" });
      }
    },
    success() {
      this.isAddData = !this.isAddData;
      this.$store.dispatch("getCategories");
    },
    deleteCategory(id) {
      swal
        .fire(
          "Confirmation",
          "Are you sure you want to delete this category?",
          "question"
        )
        .then(result => {
          if (result.value) {
            api
              .delete(`/categories/${id}`, {
                headers: { token: localStorage.access_token }
              })
              .then(({ data }) => {
                this.$store.dispatch("getCategories");
                swal.fire(
                  "Success",
                  "Successfully deleted category",
                  "success"
                );
              })
              .catch(err => {
                swal.fire("Error", err.response.message);
              });
          }
        });
    }
  },
  mounted() {
    if (this.categories === null) {
      this.$store.dispatch("getCategories");
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>

<style>
</style>
