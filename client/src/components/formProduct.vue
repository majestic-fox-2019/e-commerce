<template>
  <div>
    <div
      class="modal fade bd-example-modal-lg"
      id="addProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>add Product</h5>
            <button
              type="button"
              class="close"
              @click="goReset"
              data-dismiss="modal"
              style="outline: none;"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            action="/upload-single"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="createProduct"
          >
            <div class="modal-body">
              <div class="mb-3" id="exampleModalCenterTitle">
                <label for="validationServer03">Name :</label>
                <input v-model="name" type="text" class="form-control" id="add-name" />
                <label for="validationServer03">Description :</label>
                <textarea
                  v-model="description"
                  type="text"
                  class="form-control"
                  id="add-description"
                />
                <label for="validationServer03">Price :</label>
                <input v-model="price" type="number" class="form-control" id="add-price" />
                <label for="validationServer03">Stock :</label>
                <input v-model="stock" type="number" class="form-control" id="add-stock" />
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Category</label>
                  <select v-model="category" class="form-control" id="add-category">
                    <option>Pakaian Pria</option>
                    <option>Pakaian Wanita</option>
                    <option>Sepatu Pria</option>
                    <option>Sepatu Wanita</option>
                    <option>Tas Pria</option>
                    <option>Tas Wanita</option>
                    <option>Aksesoris</option>
                  </select>
                </div>
                <label for="validationServer03">Image Url :</label>
                <input
                  v-on:change="handleFileUpload"
                  type="file"
                  name="image_url"
                  class="form-control"
                  id="add-image"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                @click="createProduct"
                class="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div
      class="modal fade bd-example-modal-lg"
      id="editProduct"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5>Edit Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              style="outline: none;"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form
            action="/upload-single"
            method="post"
            enctype="multipart/form-data"
            @submit.prevent="editProduct"
          >
            <div class="modal-body">
              <div class="mb-3" id="exampleModalCenterTitle">
                <label for="validationServer03">Name :</label>
                <input
                  v-model="$store.state.product.name"
                  type="text"
                  class="form-control"
                  id="add-name"
                />
                <label for="validationServer03">Description :</label>
                <textarea
                  v-model="$store.state.product.description"
                  type="text"
                  class="form-control"
                  id="add-description"
                />
                <label for="validationServer03">Price :</label>
                <input
                  v-model="$store.state.product.price"
                  type="number"
                  class="form-control"
                  id="add-price"
                />
                <label for="validationServer03">Stock :</label>
                <input
                  v-model="$store.state.product.stock"
                  type="number"
                  class="form-control"
                  id="add-stock"
                />
                <div class="form-group">
                  <label for="exampleFormControlSelect1">Category</label>
                  <select
                    v-model="$store.state.product.category"
                    class="form-control"
                    id="add-category"
                  >
                    <option>Pakaian Pria</option>
                    <option>Pakaian Wanita</option>
                    <option>Sepatu Pria</option>
                    <option>Sepatu Wanita</option>
                    <option>Tas Pria</option>
                    <option>Tas Wanita</option>
                    <option>Aksesoris</option>
                  </select>
                </div>
                <label for="validationServer03">Image Url :</label>
                <input
                  v-on:change="handleFileUpload"
                  type="file"
                  name="image_url"
                  class="form-control"
                  id="add-image"
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                @click="editProduct"
                class="btn btn-secondary btn-sm"
                data-dismiss="modal"
              >Edit Product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      description: "",
      price: "",
      stock: "",
      image: null,
      category: ""
    };
  },
  methods: {
    createProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("image_url", this.image);
      formData.append("category", this.category);
      this.$store.dispatch("addProduct", formData);
      this.goReset();
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
    editProduct() {
      if (this.image !== null) {
        let formData = new FormData();
        formData.append("name", this.$store.state.product.name);
        formData.append("description", this.$store.state.product.description);
        formData.append("price", this.$store.state.product.price);
        formData.append("stock", this.$store.state.product.stock);
        formData.append("image_url", this.image);
        formData.append("category", this.$store.state.product.category);
        this.$store.dispatch("updateProduct", formData);
        this.goReset();
      } else {
        this.$store.dispatch("updateProduct");
        this.goReset();
      }
    },
    goReset() {
      this.name = "";
      this.description = "";
      this.price = "";
      this.stock = "";
      this.category = "";
      this.image = null;
    }
  }
};
</script>

<style>
</style>