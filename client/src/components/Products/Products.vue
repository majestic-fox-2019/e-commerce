<template>
  <main class="page-content">
    <div class="container-fluid">
      <h2>Products</h2>
      <hr>
      <b-button size="sm" style="position:absolute" variant="primary" @click="modals = true; statusModal = 'add'"><i class="fa fa-plus"></i>&nbsp;Add Product</b-button>
      <table-component
        name="product"
        :items="getProducts" 
        :fields="fieldProducts" 
        :per_page="perPageProducts"
        :filterIncludedFields="filterOnProducts"
        :busy="isBusyProducts"
        @setEditData="getEdit"
        @setDeleteData="deleteProduct"
      ></table-component>
    </div>
    <modal-product 
      name="Add Product"
      :show="modals"
      :form="formProduct"
      :categories="getCategories"
      @setModal="setActiveModal"
      @setFileSelected="setFileImage"
      :status="statusModal"
    ></modal-product>
  </main>
</template>

<script>
import axios from 'axios'
import TableComponent from '@/components/Tables/Tables'
import ModalProduct from '@/components/Products/ModalProduct'
import { url } from '@/mixins/mixins'

export default {
  name: 'Product',
  mixins: [url],
  components: {
    'table-component' : TableComponent,
    'modal-product' : ModalProduct
  },
  data(){
    return {
      modals: false,
      statusModal: null,
      formProduct: {
        name: null,
        image_url: null,
        price: null,
        stock: null,
        CategoryId: null
      },
      getIdProduct:{
        id_product: null
      },
      isBusyProducts: false,
      totalRowsProducts: 1,
      perPageProducts: 5,
      filterOnProducts: [],
      fieldProducts: [
        'no',
        {key: 'name', label: 'Name', sortable: true, filterByFormatted: true},
        {key: 'Category.name', label: 'Category', sortable: true, filterByFormatted: true},
        {key: 'price', label: 'Price', sortable: true, filterByFormatted: true},
        {key: 'stock', label: 'Stock', sortable: true, filterByFormatted: true},
        {key: 'createdAt', label:'Created Date', sortable: true, filterByFormatted: true},
        {key: 'updatedAt', label:'Updated Date', sortable: true, filterByFormatted: true},
        {key: 'action', label:'Action'}
      ],
    }
  },
  created(){
    this.getDataProducts()
    this.getDataCategories()
  },
  computed: {
    getProducts(){
      return this.$store.state.products_dashboard
    },
    getCategories(){
      return this.$store.state.categories_dashboard
    }
  },
  methods: {
    setActiveModal(status){
      this.modals = status
      this.clearForm(this.formProduct)
      this.clearForm(this.getIdProduct)
    },
    setFileImage(event){
      this.formProduct.image_url = event.target.files[0]
    },
    getDataProducts(){
      this.$store.dispatch('getProductsDashboard')
    },
    getDataCategories(){
      this.$store.dispatch('getCategoriesDashboard')
    },
    getEdit(data){
      this.modals = true
      this.statusModal = 'edit'
      this.formProduct.name = data.name
      this.formProduct.price = data.price
      this.formProduct.stock = data.stock
      this.formProduct.CategoryId = data.CategoryId
      this.getIdProduct.id_product = data.id
    },
    addProduct(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formProduct.name === null || self.formProduct.price === null || self.formProduct.stock === null){
        self.$vToastify.notifError('Form must be filled', "Failed!")
      }else{
        let dataAddProduct = {
          name: self.formProduct.name,
          image_url: null,
          price: self.formProduct.price,
          stock: self.formProduct.stock,
          CategoryId: self.formProduct.CategoryId
        }
        axios.post(`${self.url}/admin/product`, dataAddProduct, {
          headers: { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Add Product Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formProduct)
          self.getDataProducts()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    editProduct(){
      let self = this
      const token = localStorage.getItem('token')
      if(self.formProduct.name === null || self.formProduct.price === null || self.formProduct.stock === null){
        self.$vToastify.notifError('Form must be filled', "Failed!")  
      }else{
        let dataEditProduct = {
          name: self.formProduct.name,
          image_url: null,
          price: self.formProduct.price,
          stock: self.formProduct.stock,
          CategoryId: self.formProduct.CategoryId,
          updatedAt: Date.now()
        }
        const id_product = self.getIdProduct.id_product
        axios.put(`${self.url}/admin/product/${id_product}`, dataEditProduct, {
          headers : { Bearer : token }
        })
        .then(res => {
          self.$vToastify.notifSuccess('Edit Product Success!', "Yeah!")
          self.modals = false
          self.clearForm(self.formProduct)
          self.getDataProducts()
        })
        .catch(err => {
          self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
        })
      }
    },
    deleteProduct(data){
      let self = this
      const token = localStorage.getItem('token')
      self.$vToastify.prompt({
        title: "Delete Data",
        body: "Are you sure delete this data?",
        answers: { Yes: true, No: false }
      })
      .then(value => {
        if(value){
          axios.delete(`${self.url}/admin/product/${data.id}`, {
            headers: { Bearer : token }
          })
          .then(res => {
            self.$vToastify.notifSuccess('Delete Product Success!', "Yeah!")
            self.getDataProducts()
          })
          .catch(err => {
            self.$vToastify.notifError(`${err.response.data.message}`, "Failed!")
          })
        }
      })
    },
    clearForm(form){
      for(let key in form){
        form[key] = null
      }
    }
  },
}
</script>

<style scoped>

</style>