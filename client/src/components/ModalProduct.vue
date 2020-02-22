<template>
  <v-row class="pl-5" :class="icon != null ? 'justify-end pr-5' : ''">
    <v-btn
      raised rounded
      @click.stop="dialog = true"
      v-if="icon == null"
    >
      {{type}}
    </v-btn>
    <v-btn
      icon
      @click.stop="dialog = true"
      v-if="icon != null"
    >
      <v-icon>{{icon}}</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="50vw"
    >
      <v-card class="px-5 py-5">
        <v-card-title>{{type}}</v-card-title>
        <v-form
          ref="form"
          @submit.prevent="submit"
          enctype="multipart/form-data">
          <v-text-field
            v-model="name"
            color="success"
            label="Name"
            ></v-text-field>
          <v-text-field
            v-model="price"
            type="number"
            color="success"
            label="Price"
            ></v-text-field>
          <v-text-field
            v-model="stock"
            type="number"
            color="success"
            label="Stock"
            ></v-text-field>
          <v-file-input
            show-size
            counter
            multiple
            label="File input"
            color="success"
            @change="setImage"
            ></v-file-input>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" color="success">Submit</v-btn>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from 'axios';

export default {
  props: ['category', 'type', 'icon', 'id'],
  data() {
    return {
      dialog: false,
      name: '',
      price: null,
      stock: null,
      image: [],
    };
  },
  methods: {
    setImage(file) {
      console.log(file);
      this.image = file;
    },
    submit() {
      if (this.id) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    },
    updateProduct() {
      const temp = this.image[0] ? this.image[0] : {};
      let id = null;
      this.$http({
        url: `product/${this.id}`,
        method: 'put',
        headers: {
          token: localStorage.token,
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          category: this.category,
        },
      })
        .then((res) => res.data)
        // .then((res) => {
        //   if (temp.type) {
        //     id = res.id;
        //     return axios
        //       .delete(`https://storage.googleapis.com/storage/v1/b/storage-example/o/jetly%2F${id}.png?key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`);
        //   }
        //   return res;
        // })
        .then((res) => {
          console.log(res);
          id = res.id;
          if (temp.type) {
            const url = `https://storage.googleapis.com/upload/storage/v1/b/storage-example/o?name=jetly/${id}.png&uploadType=media&key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`;
            return axios
              .post(
                url,
                temp,
                {
                  headers: {
                    'Content-Type': 'image/png',
                    'Cache-Control': 'no-cache',
                  },
                },
              );
          }
          return res;
        })
        .then((res) => {
          console.log(res);
          const url = res.image_url || `https://storage.googleapis.com/storage-example/jetly/${this.id}.png`;

          return this.$http({
            url: `product/${this.id}`,
            method: 'patch',
            headers: {
              token: localStorage.token,
            },
            data: {
              image_url: url,
            },
          });
        })
        .then((res) => {
          this.$socket.client.emit('reload product');
          this.dialog = false;
          this.$swal.fire(
            {
              title: 'Success Update Product',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          console.log(err.response);
          this.$Progress.fail();
          this.$swal.fire(
            {
              title: 'Error!',
              text: JSON.stringify(err.response.data),
              icon: 'error',
              confirmButtonText: 'Cool',
            },
          );
        });
    },
    addProduct() {
      let id = null;
      const temp = this.image[0] ? this.image[0] : {};
      this.$http({
        url: 'product',
        method: 'post',
        headers: {
          token: localStorage.token,
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          category: this.category,
          image_url: temp.type,
        },
      })
        .then((res) => res.data)
        .then((res) => {
          id = res.id;
          const url = `https://storage.googleapis.com/upload/storage/v1/b/storage-example/o?name=jetly/${res.id}.png&uploadType=media&key=AIzaSyDXXhdtF6Ba2Fyd3zE3xgFfv_Hx4hxJKuI`;
          return axios
            .post(
              url,
              temp,
              {
                headers: {
                  'Content-Type': 'image/png',
                  'Cache-Control': 'no-cache',
                },
              },
            );
        })
        .then((res) => {
          console.log(res);
          const url = `https://storage.googleapis.com/storage-example/jetly/${id}.png`;

          return this.$http({
            url: `product/${id}`,
            method: 'patch',
            headers: {
              token: localStorage.token,
            },
            data: {
              image_url: url,
            },
          });
        })
        .then((res) => {
          this.dialog = false;
          this.$swal.fire(
            {
              title: 'Success Add Product',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          this.$swal.fire(
            {
              title: 'Error!',
              text: JSON.stringify(err.response.data),
              icon: 'error',
              confirmButtonText: 'Cool',
            },
          );
        });
    },
    getProductId() {
      this.$http({
        url: `product/${this.id}`,
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.name = res.data.name;
          this.price = res.data.price;
          this.stock = res.data.stock;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  watch: {
    dialog(change) {
      if (change && this.id) {
        this.getProductId();
      }
    },
  },
};
</script>

<style>
</style>
