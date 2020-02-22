<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Add Product</h2>
    <hr />
    <form @submit.prevent="postProduct">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Name</span>
        </div>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Stock</span>
        </div>
        <input v-model="stock" type="number" class="form-control" id="stock" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Price</span>
        </div>
        <input type="number" v-model="price" class="form-control" />
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text" for="inputGroupSelect01">Options</label>
        </div>
        <select class="custom-select" @change="onChange">
          <option selected>Choose...</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >{{category.name}}</option>
        </select>
      </div>
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <span class="input-group-text">Image Url</span>
        </div>
        <input v-model="img_url" type="text" class="form-control" id="img" />
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
      name: "",
      img_url: "",
      price: "",
      stock: "",
      categoryId: null
    };
  },
  methods: {
    postProduct() {
      const value = {
        name: this.name,
        price: this.price,
        img_url: this.img_url,
        stock: this.stock,
        categoryId: this.categoryId
      };
      this.$axios
        .post("/products", value, {
          headers: { token: localStorage.access_token }
        })
        .then(({ data }) => {
          this.$router.go(-1);
          this.$emit("success-add-product");
        })
        .catch(err => console.log(err));
    },
    onChange(e) {
      this.categoryId = e.target.value;
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  mounted() {
    // this.categories
  }
};
</script>
