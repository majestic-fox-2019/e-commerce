<template>
<div class="container">
    <div v-if="isUpdate">
      <h1>Update Form</h1>
    <v-form >
      <v-text-field v-model="name" label="Product Name" required>
      </v-text-field>
      <v-text-field v-model="image_url" label="Image_Url" required>
      </v-text-field>
      <v-text-field type="number" v-model="stock" label="Stock" required>
      </v-text-field>
      <v-text-field type="number" v-model="price" label="Price" required>
      </v-text-field>
      <v-text-field type="number" v-model="rating" label="Rating" required>
      </v-text-field>
      <v-textarea type="number" v-model="description" label="description" required>
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
      name: this.$store.state.nameUpdate,
      price: this.$store.state.priceUpdate,
      image_url: this.$store.state.image_urlUpdate,
      stock: this.$store.state.stockUpdate,
      description: this.$store.state.descriptionUpdate,
      rating: this.$store.state.ratingUpdate,
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
  methods: {
    backtohome() {
      this.$router.push({ name: 'homepage' });
    },
    cancel() {
      this.$store.commit('cancelupdate', false);
    },
    update() {
      console.log(this.name, 'apakah masuk?');
      superagent
        .put(`${this.$store.state.url_base}/products/${this.idUpdate}`)
        .set('token', this.$store.state.isLogin)
        .send({
          name: this.name,
          price: this.price,
          image_url: this.image_url,
          stock: this.stock,
          rating: this.rating,
          description: this.description,
        })
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
