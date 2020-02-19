<template>
<div class="container d-flex flex-row" v-if="alreadyLogin">
  <div class="card" v-for="product in products" :key="product.id">

  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
  <!--======  url-image =========-->
    <v-img
      height="250"
    >{{product.image_url}}</v-img>

    <!-- Nama Product -->
    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >

      <!-- Rating Barang Bintang -->
        <v-rating
          :value="3"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

      <!-- Rating Barang Angka -->
        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <!-- HARGA BARANG  -->
      <div class="my-4 subtitle-1">
        $ • Italian, Cafe
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <!--             STOCK           -->
    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        @click="deleteData(product.id)"
        color="red"
        text
      >
        Delete
      </v-btn>
      <div>
        <v-btn
        color="warning"
        text
      >
        Edit
      </v-btn>
      </div>
    </v-card-actions>
  </v-card>
  </div>
</div>
</template>
<script>
const superagent = require('superagent');

export default {
  name: 'homepage',
  data() {
    return {
      products: [],
      name: null,
      image_url: null,
      price: 0,
      stock: 0,
    };
  },
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
    reload() {
      return this.loadData();
    },
  },
  created() {
    return this.loadData();
  },
  methods: {
    loadData() {
      // alert('ulalaaaa');
      superagent
        .get(`${this.$store.state.url_base}/products`)
        .set('token', this.$store.state.isLogin)
        .end((err, res) => {
          res.body.forEach((element) => {
            this.products.push(element);
            this.cardId = element.id;
          });
          // console.log(this.products[0].image_url, 'sashhhh');
        });
    },
    deleteData(id) {
      console.log(id, 'uvuvuevue');
      superagent
        .delete(`${this.$store.state.url_base}/products/${id}`)
        .set('token', this.$store.state.isLogin)
        .end(() => {
          this.reload();
        });
    },
    addData() {
      superagent
        .post(`${this.$store.state.url_base}/products`)
        .set('token', this.$store.state.isLogin)
        .end(() => {
        });
    },
  },
};
</script>

<style lang="stylus" scoped></style>
