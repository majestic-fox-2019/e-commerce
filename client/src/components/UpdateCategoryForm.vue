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
        <button type="submit" class="btn btn-primary w-50 font-weight-bold mt-4">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    putCategories() {
      const value = {
        name: this.name
      };
      this.$axios
        .post("/categories", value)
        .then(({ data }) => {
          console.log(data);
          this.$router.go(-1);
          this.$emit("success-add-category");
        })
        .catch(({ response }) => console.log(response));
    }
  }
};
</script>
