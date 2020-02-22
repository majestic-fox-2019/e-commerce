<template>
<div class="container">
    <div v-if="isUpdate">
      <h1>Update Form</h1>
    <v-form >
      <v-text-field v-model="nameUpdate" label="Product Name" required>
      </v-text-field>
      <v-text-field v-model="image_urlUpdate" label="Image_Url" required>
      </v-text-field>
      <v-text-field type="number" v-model="stockUpdate" label="Stock" required>
      </v-text-field>
      <v-text-field type="number" v-model="priceUpdate" label="Price" required>
      </v-text-field>
      <v-btn color="warning" class="mr-4" @click="update">Update</v-btn>
      <v-btn color="red" class="mr-4" @click="cancel">Cancel</v-btn>
      <v-spacer></v-spacer>
    </v-form>
  </div>
</div>
</template>
<script>
export default {
  name: 'update',
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
    cancel() {
      this.$store.commit('cancelupdate', false);
    },
    update() {
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
