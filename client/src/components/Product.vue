<template>
  <div class="container mt-5">
    <h3 class="font-weight-bold text-left">Product List</h3>

    <div class="text-left">
      <div class="btn-group" role="group" v-if="Array.isArray(stores.categories)">
        <button type="button" class="btn btn-secondary">All Product</button>
        <button
          v-for="category in stores.categories"
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
      <!-- <div v-if="products && !isUpdateData" class="row"> -->
      <div v-if="Array.isArray(stores.products)" class="row">
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
            <tr v-for="(product, i) in stores.products" :key="product.id">
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
      <!-- <no-data v-if="isUpdateData === false && isUpdateData === false && msg !== null" :msg="msg" /> -->
      <no-data v-else-if="!Array.isArray(stores.products)" :msg="stores.products.message" />
    </div>
    <router-view @success-add-product="success"></router-view>
  </div>
</template>

<script>
import NoData from '../components/NoData'
import UpdateProductForm from '../components/UpdateProductForm'
import api from '../helper/api'
export default {
  components: {
    NoData,
    UpdateProductForm
  },
  data () {
    return {
      isAddData: false,
      isUpdateData: false,
      product: null
    }
  },
  methods: {
    gotoAddForm () {
      this.isAddData = !this.isAddData
      if (!this.isAddData) {
        this.$router.push('/product')
      } else {
        this.$router.push({ name: 'AddProduct' })
      }
    },
    update (params) {
      this.isUpdateData = !this.isUpdateData
      this.product = params
    },
    goToUpdateForm (product) {
      this.isAddData = !this.isAddData
      if (!this.isAddData) {
        this.$router.push('/product')
      } else {
        this.$router.push({
          name: 'UpdateProduct',
          params: { id: product.id },
          query: {
            name: product.name,
            price: product.price,
            stock: product.stock,
            img: product.img_url
          }
        })
      }
    },
    deleteProduct (product) {
      api
        .delete(`/products/${product.id}`, { headers: { token: localStorage.access_token } })
        .then(res => {
          this.$store.dispatch('getProducts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    success () {
      this.isAddData = !this.isAddData
      this.$store.dispatch('getProducts')
    },
    successUpdate () {
      this.isUpdateData = !this.isUpdateData
      this.getProducts()
    }
  },
  created () {
    if (this.stores.products === null) this.$store.dispatch('getProducts')
    if (this.stores.categories === null) this.$store.dispatch('getCategories')
  },
  mounted () {},
  computed: {
    stores () {
      return {
        categories: this.$store.state.categories,
        products: this.$store.state.products
      }
    }
  }
}
</script>

<style>
</style>
