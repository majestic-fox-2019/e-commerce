<template>
  <div class="col-md-8 text-left shadow-lg text-white rounded p-5 mb-5">
    <h2 class="font-weight-bold mb-4">Update Product</h2>
    <hr />
    <form @submit.prevent="putProduct">
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
            :selected="categoryId === category.id && true"
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
        <button
          type="button"
          @click="$emit('cancel-update')"
          class="btn btn-primary mx-2 font-weight-bold mt-4"
        >Cancel</button>
        <button type="submit" class="btn btn-primary mx-2 font-weight-bold mt-4">Update</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ["product"],
  data() {
    return {
      name: this.product.name,
      price: this.product.price,
      img_url: this.product.img_url,
      stock: this.product.stock,
      categoryId: this.product.CategoryId
    };
  },
  methods: {
    putProduct() {
      const value = {
        name: this.name,
        price: this.price,
        img_url: this.img_url,
        stock: this.stock,
        categoryId: this.categoryId
      };
      console.log(value)
      this.$axios
        .put(`/products/${this.product.id}`, value)
        .then(res => {
          this.$emit("success-update");
        })
        .catch(err => console.log(err));
    },
    onChange(e) {
      this.product.categoryId = e.target.value;
    },
    cancel() {
      this.$emit("cancel");
      this.$router.go(-1);
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  },
  created() {
    this.categories;
  }
};
</script>
