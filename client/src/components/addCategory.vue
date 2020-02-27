<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="addCategory"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addCategoryLabel"
    aria-hidden="true"
  >
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="true"
        :color="'#d47a90'"
        :loader="'dots'"
        :width="100"
      ></loading>
    </div>
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCategoryLabel">Add New Category</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="clearForm()"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form v-on:submit.prevent="addCategory">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" v-model="category.name" />
            </div>
            <button type="submit" class="btn btn-outline-danger btn-sm">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  props: ["product"],
  components: {
    Loading
  },
  data() {
    return {
      category: {
        name: null
      },
      isLoading: false
    };
  },
  methods: {
    clearForm() {
      this.category.name = null;
    },
    addCategory() {
      this.isLoading = true;
      this.$axios({
        method: "post",
        url: `${this.$server}/categories`,
        headers: {
          token: localStorage.token
        },
        data: {
          name: this.category.name
        }
      })
        .then(result => {
          this.isLoading = false;
          window.$("#addCategory").modal("hide");
          this.$swal.fire({
            icon: "success",
            title: `Successfully added ${result.data.name}!`,
            showConfirmButton: false,
            timer: 1500
          });
          this.clearForm();
          this.$store.dispatch("allCategories");
        })
        .catch(err => {
          this.isLoading = false;
          this.$swal.fire({
            icon: "error",
            title: `${err.response.data[0]}`,
            showConfirmButton: false,
            timer: 1500
          });
        });
    }
  }
};
</script>

<style>
</style>
