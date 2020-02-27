<template>
<div class="container">
    <div v-if="isUpdate">
      <h1>Update Form</h1>
    <v-form >
      <v-text-field v-model="product.name" label="Product Name" required>
      </v-text-field>
      <v-text-field v-model="product.image_url" label="Image_Url" required>
      </v-text-field>
      <v-text-field type="number" v-model="product.stock" label="Stock" required>
      </v-text-field>
      <v-text-field type="number" v-model="product.price" label="Price" required>
      </v-text-field>
      <v-text-field type="number" v-model="product.rating" label="Rating" required>
      </v-text-field>
      <v-textarea type="number" v-model="product.description" label="description" required>
      </v-textarea>
      <v-btn color="warning" class="mr-4" @click="update">Update</v-btn>
      <v-btn color="red" class="mr-4" @click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
    </v-form>
  </div>
</div>
</template>
<script>
const superagent = require('superagent');

export default {
  name: 'update',
  data() {
    return {
      product: this.$store.state.dataUpdate,
    };
  },
  computed: {
    isUpdate() {
      return this.$store.state.isUpdate;
    },
    nameUpdate() {
      return this.$store.state.nameUpdate;
    },
    image_urlUpdate() {
      return this.$store.state.image_urlUpdate;
    },
    priceUpdate() {
      return this.$store.state.priceUpdate;
    },
    stockUpdate() {
      return this.$store.state.stockUpdate;
    },
    idUpdate() {
      return this.$store.state.idUpdate;
    },
  },
  destroyed() {
    this.$store.dispatch('loadData');
  },
  methods: {
    backtohome() {
      this.$router.push({ name: 'homepage' });
    },
    cancel() {
      this.$store.commit('cancelupdate', false);
    },
    update() {
      console.log(this.product.name, 'updateeeeee?');
      const update = {
        name: this.product.name,
        price: this.product.price,
        image_url: this.product.image_url,
        stock: this.product.stock,
        rating: this.product.rating,
        description: this.product.description,
      };
      console.log(update);
      superagent
        .patch(`${this.$store.state.url_base}/products/${this.product.id}`)
        .set('token', this.$store.state.isLogin)
        .send(update)
        .end(() => {
          this.$store.commit('cancelupdate', false);
          this.backtohome();
        });
    },
  },
};

</script>
<style scoped>
.v-input {
  width: 70em;
  max-width: 500%;
}
</style>
