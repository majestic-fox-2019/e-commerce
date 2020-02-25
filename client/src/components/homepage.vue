<template>
<div class='container' v-if="alreadyLogin && !isUpdated">
  <!-- <div> -->
  <!-- ADD PRODUCT -->
    <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn text v-on="on" color='primary' dark>
        <span class="mr-2"></span>
        <v-icon>mdi-pencil</v-icon>
        Add Product
      </v-btn>
      </template>
      <div>
      <v-card>
        <v-card-title>
          <span class="headline">Add Product</span>
        </v-card-title>
        <v-card-text class='rowAdd'>
          <v-container class='container modalAdd' >
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Nama barang" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="image_url" label="image_url" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="price" label="Price" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="stock" label="Stock" required></v-text-field>
              </v-col>
               <v-col cols="12">
                <v-textarea v-model="description" label="Description" required>
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="[0, 0.5, 1, 1.5,
                  2, 2.5, 3, 3.5, 4, 4.5, 5]"
                  label="Rating"
                  v-model="selected"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addProduct">Add</v-btn>
        </v-card-actions>
      </v-card>
      </div>
    </v-dialog>
  </v-row>
<!-- PRODUCT -->
    <v-row justify="center">
  <div class="card" v-for="product in products" :key="product.id">
    <v-col>
  <v-card
    class="mx-auto my-12"
    max-width="374"
  >
  <!--======  url-image =========-->
    <v-img
      height="250"
      :src="product.image_url"
    ></v-img>

    <!-- Nama Product -->
    <v-card-title>{{product.name}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >

      <!-- Rating Barang Bintang -->
        <v-rating
          :value="product.rating"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

      <!-- Rating Barang Angka -->
        <div class="grey--text ml-4">{{product.rating}} </div>
      </v-row>

      <!-- HARGA BARANG  -->
      <div class="my-4 subtitle-1">
        $ • {{product.price}}
      </div>

      <div>{{product.description}}.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
        active-class="deep-purple accent-4 white--text"
        column
      >
      <v-card-title>Current Stock:</v-card-title> <v-chip> {{product.stock}}</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
        @click="deleteProduct(product.id)"
        color="red"
        text
      >
        DELETE
      </v-btn>
      <!-- EDIT  -->
      <v-btn
        @click="dataUpdate(product.id)"
        color="warning"
        text
      >
        EDIT
      </v-btn>
    </v-card-actions>
  </v-card>
    </v-col>
  </div>
    </v-row>
</div>
</template>
<script>
// import edit from './addorupdate.vue';

const superagent = require('superagent');

export default {
  name: 'homepage',
  // components: {
  //   edit,
  // },
  data() {
    return {
      products: [],
      dialog: false,
      name: null,
      image_url: null,
      price: null,
      stock: null,
      description: null,
      selected: null,
    };
  },
  computed: {
    alreadyLogin() {
      return this.$store.state.isLogin;
    },
    isUpdated() {
      return this.$store.state.isUpdate;
    },
  },
  created() {
    return this.loadData();
  },
  methods: {
    loadData() {
      this.products = [];
      superagent
        .get(`${this.$store.state.url_base}/products`)
        .set('token', this.$store.state.isLogin)
        .end((err, res) => {
          // alert('ulalaaaa');
          // console.log(res.body, 'INI BODY LOAD DATA');
          res.body.forEach((element) => {
            this.products.push(element);
          });
        });
    },
    deleteProduct(id) {
      console.log(id, 'uvuvuevue');
      superagent
        .delete(`${this.$store.state.url_base}/products/${id}`)
        .set('token', this.$store.state.isLogin)
        .end(() => {
          console.log('MASUK KE END DELETE DATA');
          // alert('DELETE DATA');
          this.loadData();
        });
    },
    addData() {
      superagent
        .post(`${this.$store.state.url_base}/products`)
        .set('token', this.$store.state.isLogin)
        .end(() => {
          console.log('MASUK KE END ADD DATA');
          this.loadData();
        });
    },
    addProduct() {
      superagent
        .post(`${this.$store.state.url_base}/products`)
        .set('token', this.$store.state.isLogin)
        .send({
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock,
          rating: this.selected,
          description: this.description,
        })
        .end(() => {
          this.name = null;
          this.image_url = null;
          this.price = null;
          this.stock = null;
          this.rating = null;
          this.description = null;

          this.dialog = false;
          this.loadData();
        });
    },
    dataUpdate(id) {
      superagent
        .get(`${this.$store.state.url_base}/products/${id}`)
        .set('token', this.$store.state.isLogin)
        .end((err, res) => {
          const data = res.body;
          // console.log(res.body, 'masukkk??');
          this.$store.commit('dataUpdate', data);
          this.$router.push({ name: 'update' });
          // this.$store.commit('isupdate', true)
        });
    },
  },
};
</script>

<style>
.container {
  margin-top: 5%;
  display: flex;
  justify-content: space-between
}
.card {
  padding: 1%;
}

div.card {
  margin: 0%;
  width: 30%;
}
div.row.justify-center{
  width: 100%
}
</style>
