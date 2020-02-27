<template>
  <div class="container mt-4">
    <div class="form-add-category text-center mx-auto">
      <FormCategory></FormCategory>
    </div>
    <table class="table table-hover table-striped text-center mt-4">
      <thead class="thead-dark">
        <tr>
          <th class="row-number" scope="col">No.</th>
          <th class="name-head" scope="col">Name</th>
          <th class="image-head" scope="col">Image URL</th>
          <th class="action-head" scope="col">Action</th>
        </tr>
      </thead>
      <tbody class="content-table">
        <tr v-for="(category, i) in categories" :key="category.id">
          <th class="row-number" scope="row">{{ i + 1 }}</th>
          <td class="name-head">{{ category.name }}</td>
          <td class="image-head">{{ category.image }}</td>
          <td class="action-head" scope="col">
            <button type="button" @click="deleteCategory(category.id)" class="btn btn-danger">
              <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FormCategory from "@/components/FormCategory";
import { Swal, Toast } from "@/api/swal.js";
export default {
  components: {
    FormCategory
  },
  computed: {
    categories() {
      return this.$store.state.listCategories;
    }
  },
  mounted() {
    this.$store.dispatch("getAllCategories");
  },
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
          this.$axios
            .delete(`/categories/${id}`, {
              headers: {
                token: localStorage.token
              }
            })
            .then(({ data }) => {
              Toast.fire({
                icon: "success",
                title: `Category ${data.name} successfully deleted`,
                timer: 2000
              });
              this.$store.dispatch("getAllCategories");
            })
            .catch(({ response }) => {
              Toast.fire({
                icon: "error",
                title: response.data.errors,
                timer: 2000
              });
            });
        }
      });
    }
  }
};
</script>

<style>
.container {
  width: 80vw;
  max-height: 80vh;
}

table {
  display: block;
}

tbody {
  display: block;
  height: 800px;
  overflow: auto;
}

.row-number {
  width: 100px;
}

.name-head {
  width: 300px;
}

.image-head {
  width: 400px;
}

.form-add-category {
  width: 400px;
}

.action-head {
  width: 250px;
}

.content-table {
  font-size: 15px;
  font-weight: 600;
  height: 42vh !important;
}
</style>