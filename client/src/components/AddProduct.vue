<template>
  <div class="add mb-3 mt-3">
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Name</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Image Url</label>
        <input type="file" name="file" @change="uploadImage" />
        <!-- <input type="text" class="form-control" v-model="image_url" id="exampleInputPassword1" /> -->
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Price</label>
        <input type="number" v-model="price" class="form-control" id="exampleInputPassword1" />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Stock</label>
        <input type="number" v-model="stock" class="form-control" id="exampleInputPassword1" />
      </div>
      <button type="submit" @click.prevent="addProduct()" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      image_url: "",
      price: 0,
      stock: 0
    };
  },
  methods: {
    uploadImage() {
      this.image_url = event.target.files[0];
    },
    addProduct() {
      let formData = new FormData();
      formData.append("name", this.name);
      formData.append("price", this.price);
      formData.append("stock", this.stock);
      formData.append("image_url", this.image_url);
      this.$store.dispatch("addProduct", formData);
    }
  }
};
</script>

<style>
.add {
  width: 60%;
  margin-left: 20%;
  margin-top: 2%;
  text-align: left;
}
</style>