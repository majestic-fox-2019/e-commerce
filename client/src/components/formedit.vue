<template>
<div class="back">
  <div class="formadd">
      <div class="d-flex justify-content-between">
      <h5>Add New Item</h5>
    <a @click="cancle"><i class="fa fa-remove p-4" style="font-size:36px;color:grey"></i>
    </a>
    </div>    <form @submit.prevent="putData">
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
        <input type="text" id="image" v-model="imageurl"
        class="form-control" placeholder="image url" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'formedit',
  props: ['dataedit'],
  data() {
    return {
      id: this.dataedit.id,
      name: this.dataedit.name,
      stock: this.dataedit.stock,
      price: this.dataedit.price,
      imageurl: this.dataedit.imageurl,
    };
  },
  methods: {
    putData() {
      const data = {
        name: this.name,
        stock: this.stock,
        price: this.price,
        imageurl: this.imageurl,
      };
      this.$axios({
        method: 'PUT',
        url: `/product/${this.dataedit.id}`,
        headers: { token: localStorage.token },
        data,
      })
        .then(() => {
          this.$store.dispatch('loadData');
          this.$emit('close-form');
          this.$emit('empty-selected');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    cancle() {
      this.$emit('cancle-edit');
    },

  },
};
</script>

<style>
</style>
