<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Add Category</h2>
    <hr />
    <form @submit.prevent="postCategories">
      <div class="form-group">
        <label for="name">Category Name</label>
        <input v-model="name" type="text" class="form-control" id="name" />
      </div>
      <div class="text-center">
        <button
          type="submit"
          class="btn btn-primary w-50 font-weight-bold mt-4"
          :disabled="addProcess"
        >
          <span v-if="addProcess" class="spinner-border spinner-border-sm mr-2"></span>
          <span>Submit</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from "../helper/api";
import swal from "sweetalert2";
export default {
  data() {
    return {
      name: "",
      addProcess: false
    };
  },
  methods: {
    postCategories() {
      this.addProcess = !this.addProcess;
      const value = {
        name: this.name
      };
      api
        .post("/categories", value, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          console.log(data)
          swal.fire('Success', data.message, 'success')
          this.$router.go(-1);
          this.$emit("success-add-category");
          this.addProcess = !this.addProcess;
        })
        .catch(err => {
          this.addProcess = !this.addProcess;
          if (Array.isArray(err.response.data.message)) {
            swal.fire("Error", err.response.data.message.join('\n'), "error");
          }
        });
    }
  }
};
</script>
