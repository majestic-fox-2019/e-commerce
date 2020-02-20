<template>
<div class="back">
  <div class="formadd">
    <h5>Add New Item      <a href="" @click="cancle"> X</a> </h5>
    <form @submit.prevent="postData">
      <div class="form-group">
        <label for="nama">Product Name</label>
        <input type="text" v-model="name" id="name"
        class="form-control" placeholder="Product name" />
      </div>

      <div class="form-group">
        <label for="umur">Stock</label>
        <input type="number" v-model="stock" id="stock" class="form-control" placeholder="Stock" />
      </div>

      <div class="form-group">
        <label for="alamat">Price</label>
        <input type="number" v-model="price" id="price" class="form-control" placeholder="price" />
      </div>

       <div class="form-group">
        <label for="imgurl">Image Url</label>
        <input type="text" id="image" v-model="imgurl"
        class="form-control" placeholder="image url" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'form',
  data() {
    return {
      name: '',
      stock: '',
      price: '',
      imgurl: '',
    };
  },
  methods: {
    postData() {
      const data = {
        name: this.name,
        stock: this.stock,
        price: this.price,
        url: this.imgurl,
      };
      this.$axios({
        method: 'POST',
        url: '/product',
        headers: { token: localStorage.token },
        data,
      })
        .then(() => {
          this.$store.dispatch('loadData');
          this.$emit('close');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancle() {
      this.$emit('cancle');
    },

  },
};
</script>

<style>
</style>
