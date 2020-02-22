<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">Product List</h3>

    <div class="text-left">
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary">All Product</button>
        <button
          v-for="category in categories"
          :key="category.id"
          type="button"
          class="btn btn-secondary"
        >{{category.name}}</button>
      </div>
    </div>

    <div class="text-right mb-4">
      <button @click="gotoAddForm" class="btn btn-light font-weight-bold">
        <i :class="isAddData ?'fa fa-arrow-left mr-2': 'fa fa-plus mr-2'"></i>
        {{isAddData ? 'Cancel' : 'ADD'}}
      </button>
    </div>
    <div v-if="!isAddData">
      <update-product-form
        v-if="isUpdateData"
        :product="product"
        @cancel-update="isUpdateData = !isUpdateData"
        @success-update="successUpdate"
      />
      <div v-if="products && !isUpdateData" class="row">
        <!-- <item v-for="product in products" :key="product.id" :product="product" /> -->
        <table class="table text-white table-dark text-left">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Stock</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, i) in products" :key="product.id">
              <th scope="row">{{i +1}}</th>
              <td>
                <img style="width: 72px; height: auto;" :src="product.img_url" />
              </td>
              <td>
                <p>{{product.name}}</p>
              </td>
              <td>
                <p>{{product.price}}</p>
              </td>
              <td>
                <p>{{product.stock}}</p>
              </td>
              <td>
                <i class="btn btn-info fa mx-2 fa-edit" @click="update(product)"></i>
                <i class="btn btn-warning fa mx-2 fa-trash" @click="deleteProduct(product)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <no-data v-if="isUpdateData === false && isUpdateData === false && msg !== null" :msg="msg" />
    </div>
    <router-view @success-add-product="success"></router-view>
  </div>
</template>

<script>
import NoData from "../components/NoData";
import Item from "../components/Item";
import UpdateProductForm from "../components/UpdateProductForm";
export default {
  components: {
    NoData,
    Item,
    UpdateProductForm
  },
  data() {
    return {
      products: null,
      isAddData: false,
      isUpdateData: false,
      msg: null,
      product: null
    };
  },
  methods: {
    gotoAddForm() {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/product");
      } else {
        this.$router.push({ name: "AddProduct" });
      }
    },
    update(params) {
      this.isUpdateData = !this.isUpdateData;
      this.product = params;
    },
    goToUpdateForm(product) {
      this.isAddData = !this.isAddData;
      if (!this.isAddData) {
        this.$router.push("/product");
      } else {
        this.$router.push({
          name: "UpdateProduct",
          params: { id: product.id },
          query: {
            name: product.name,
            price: product.price,
            stock: product.stock,
            img: product.img_url
          }
        });
      }
    },
    getProducts() {
      this.$axios
        .get("/products")
        .then(({ data }) => {
          if (data.message) {
            this.products = null
            this.msg = data.message;
          } else {
            this.products = data;
          }
        })
        .catch(err => console.log(err));
    },
    deleteProduct(product) {
      this.$axios
        .delete(`/products/${product.id}`)
        .then(res => {
          this.getProducts();
        })
        .catch(err => {
          console.log(err);
        });
    },
    success() {
      this.isAddData = !this.isAddData;
      this.getProducts();
    },
    successUpdate() {
      this.isUpdateData = !this.isUpdateData;
      this.getProducts();
    }
  },
  mounted() {
    this.getProducts();
  },
  computed: {
    categories() {
      return this.$store.state.categories;
    }
  }
};
</script>

<style>
</style>
