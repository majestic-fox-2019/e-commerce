<template>
<div class="container">
    <div v-if="isUpdated">
      <h1>Register</h1>
    <v-form >
      <v-text-field v-model="usernameReg"
:counter="10" label="Username" required>
      </v-text-field>
      <v-text-field v-model="emailReg" label="E-mail" required>

      </v-text-field>
      <v-text-field type="password" v-model="passwordReg"
 label="Password" required>
      </v-text-field>

      <v-btn color="warning" class="mr-4" @click="register">Register</v-btn>
      <v-spacer></v-spacer>
      <span>
         click here for
         <a @click="showothers"> Login </a>.
         <!-- <router-link to='/login'>login</router-link> -->
      </span>
    </v-form>
  </div>
</div>
</template>
<script>
export default {
  name: 'update',
  data() {
    return {
      id: this.idUpdate(),
      name: this.nameUpdate(),
      image_url: this.image_urlUpdate(),
      price: this.priceUpdate(),
      stock: this.stockUpdate(),
    };
  },
  computed: {
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
};

</script>
<style scoped>

</style>
