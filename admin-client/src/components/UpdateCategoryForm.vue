<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Update Category</h2>
    <hr />
    <form @submit.prevent="putCategories">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input v-model="name" type="text" class="form-control" id="name" />
      </div>
      <div class="text-center">
        <button type="button" class="btn btn-primary mx-4 font-weight-bold mt-4" @click="$router.push('/category')">Cancel</button>
        <button type="submit" class="btn btn-primary mx-4 font-weight-bold mt-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../helper/api";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      name: null
    };
  },
  methods: {
    putCategories() {
      const value = {
        name: this.name
      };
      api
        .put(`/categories/${this.$route.params.id}`, value, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          Swal.fire("Success", data.message, "success");
          this.$router.go(-1);
          this.$emit("success");
        })
        .catch(err => console.log(err));
    }
  },
  created() {
    this.name = this.categories.filter(
      item => item.id === this.$route.params.id
    )[0].name;
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>
