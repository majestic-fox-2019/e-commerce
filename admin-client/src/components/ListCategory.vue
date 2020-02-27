<template>
  <div>
    <div v-if="Array.isArray(categories)">
      <table class="table text-white table-dark text-left">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, i) in categories" :key="category.id">
            <th scope="row">{{i +1}}</th>
            <td>{{category.name}}</td>
            <td>
              <router-link :to="{name: 'update_category', params: {id: category.id}}">
                <i class="btn btn-info fa mx-2 fa-edit"></i>
              </router-link>

              <i
                @click.prevent="deleteCategory(category.id)"
                class="btn btn-warning fa mx-2 fa-trash"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <no-data v-else :msg="categories && categories.message" />
  </div>
</template>

<script>
import NoData from "../components/NoData";
import api from "../helper/api";
import Swal from "sweetalert2";
export default {
  components: {
    NoData
  },
  methods: {
    deleteCategory(id) {
      Swal.fire(
        "Confirmation",
        "Are you sure want to delete this category?",
        "question"
      ).then(res => {
        if (res.value) {
          api
            .delete(`/categories/${id}`, {
              headers: { token: localStorage.access_token }
            })
            .then(({ data }) => {
              Swal.fire("Success", data.message, "success");
              this.$store.dispatch("getCategories");
            });
        }
      });
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