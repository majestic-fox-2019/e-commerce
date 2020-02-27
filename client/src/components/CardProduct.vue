<template>
  <v-row v-if="products.length > 0" class="justify-center"
    style="height:80vh;overflow-x:hidden;white-space:nowrap;">
    <v-col v-for="product in products"  :key=product.id class="d-flex justify-start">
    <v-card
      class="mx-1 my-1"
      shaped raised>
      <v-img
        :src="product.image_url ? `${product.image_url}?${Date.now()}` :`https://dummyimage.com/600x400/`+ randColor(product.id)"
        class="white--text align-end mx-auto"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        width="20vw"
        height="35vh"
      >
        <v-card-title v-text="product.name"></v-card-title>
      </v-img>
      <v-list-item>
        <v-list-item-icon>
          <v-icon v-text="`mdi-cash`" small></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Price : {{converting(product.price)}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon v-text="`mdi-package-variant-closed`" small></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Stock : {{product.stock}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon v-text="`mdi-shape`" small></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Category : {{product.Category.name}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-spacer></v-spacer>

        <Modal :category="category" type="Edit Product" icon='mdi-pencil' :id="product.id">
        </Modal>
        <v-btn icon @click="deleteProduct(product.id)" small>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
  </v-row>
  <v-row v-else>
    <div>
      <v-icon x-large>mdi-skull</v-icon>
      <h1>Nothing!!</h1>
      <h1>Your product list is empty</h1>
    </div>
  </v-row>
</template>
<script>
import Modal from './ModalProduct.vue';

export default {
  components: {
    Modal,
  },
  props: ['category'],
  data() {
    return {
      products: [],
    };
  },
  sockets: {
    connect() {
      console.log('socket connected');
    },
    products() {
      this.getProduct();
    },
  },
  created() {
    console.log(this.category);
    this.getProduct();
  },
  methods: {
    converting(num) {
      const str = String(num);
      let converted = '';
      for (let i = 0; i < str.length; i += 1) {
        if ((str.length - i) % 3 === 0 && i !== 0) {
          converted += `.${str[i]}`;
        } else {
          converted += str[i];
        }
      }
      return `Rp. ${converted}`;
    },
    getProduct() {
      this.$http({
        url: `product/category/${this.category}`,
        method: 'get',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.products = res.data;
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    deleteProduct(id) {
      this.$http({
        url: `product/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token,
        },
      })
        .then((res) => {
          this.$swal.fire(
            {
              title: 'Success Delete',
              text: JSON.stringify(res.data),
              icon: 'success',
              confirmButtonText: 'Cool',
            },
          );
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
    randColor() {
      const color = (Math.random() * 0xFFFFFF).toString(16);
      return `${color}/${color}`;
    },
  },
  computed: {
  },
};
</script>

<style scoped>

</style>
