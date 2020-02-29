<template>
  <div v-loading="loading">
    <form class="center p-5">
      <div class="form-group">
        <div class="d-flex">
          <label for="name" class="mr-3">
            <h4>Name</h4>
          </label>
          <input
            type="text"
            class="form-control"
            id="name"
            placeholder="Enter product's name"
            v-model="name"
          />
        </div>
      </div>
      <b-form inline>
        <label for="inline-form-input-name">
          <h4 class="mr-4">Stock</h4>
        </label>
        <b-input
          id="inline-form-input-name"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="stock"
          v-model="stock"
          type="number"
        ></b-input>

        <label for="inline-form-input-username">
          <h4 class="mx-4">Price</h4>
        </label>
        <b-input-group prepend="Rp" class="mb-2 mr-sm-2 mb-sm-0">
          <b-input
            id="inline-form-input-username"
            type="number"
            v-model="price"
            placeholder="Price"
          ></b-input>
        </b-input-group>
        <label for="categoryinput">
          <h4 class="mx-4">Category</h4>
        </label>
        <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select id="categoryinput" v-model="category" :options="categories" required></b-form-select>
        </b-input-group>
      </b-form>

      <div class="d-flex my-3 form-group">
        <label for="desc" class="mr-3">
          <h4>Descr</h4>
        </label>
        <textarea id="desc" cols="100" rows="10" v-model="description"></textarea>
      </div>
      <label for="file" class="mt-3">
        <h4>Picture</h4>
      </label>
      <b-form-file
        id="image_url"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        name="image_url"
        v-on:change="uploadGambar"
      ></b-form-file>
      <div class="row justify-content-end mt-3">
        <b-button variant="primary" v-on:click="sell">Sell</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "formProduct",
  data() {
    return {
      name: "",
      price: "",
      description: "",
      image_url: "",
      stock: "",
      categories: ["Clothing", "Shoes", "Accessories"],
      category: "",
      loading: false
    };
  },
  methods: {
    uploadGambar(e) {
      this.image_url = e.target.files[0];
    },
    sell() {
      this.loading = true;
      let name = this.name;
      let description = this.description;
      let stock = this.stock;
      let price = this.price;
      let image_url = this.image_url;
      let category = this.category;

      let objForm = {
        price,
        image_url,
        category,
        name,
        description,
        stock
      };
      this.$store.dispatch("sellProduct", objForm).then(() => {
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.center {
  left: 40%;
}
</style>