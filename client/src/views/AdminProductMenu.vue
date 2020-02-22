<template>
  <div class="mt-5 productView px-5">
      <div class="ProductList">
          <div class="adminProductOptions py-3 px-3">
              <div id="SearchAndFilter">
                <form>
                    <input type="text" id="searchProdAdmin" placeholder="Search Products Here. . ." class="px-3">
                </form>
                <h3 class="my-3" style="text-align:left;">Filter Shop:</h3>
                <b-button-group>
                    <b-button variant="primary">Official Store</b-button>
                    <b-button variant="success">All</b-button>
                    <b-button variant="primary">User's Store</b-button>
                </b-button-group>
              </div>
              <b-button @click="openAdd" class="my-3" variant="primary" id="addButton"><i class="fas fa-plus"></i> Add Product</b-button>
          </div>
          <div class="AdminProductContent" v-if="$store.state.loading.productTable">
              <b-spinner variant="primary" label="Spinning" style="margin-top:10%;width: 3rem; height: 3rem;" type="grow"></b-spinner>
          </div>
          <div class="AdminProductContent pt-3" v-if="!$store.state.loading.productTable">
            <div v-for="(product, i) in $store.state.displayProducts" :key="i" style="width:100%;height:20vh;border-radius:5px;">
                <AdminProductCard :productDetails="product" @editData='openEdit($event)'></AdminProductCard>
            </div>
          </div>
      </div>
      <b-modal id="product-form" v-model="productForm" centered hide-header hide-footer>
        <h1 class="mb-3" style="text-align:center;">{{modal}}</h1>
        <form>
            <input class="productFormInput m-2" v-model="form.name" type="text" placeholder="ProductName">
            <input class="productFormInput m-2" v-model="form.description" type="textarea" placeholder="Description">
            <input class="productFormInput m-2" v-model="form.stock" type="number" placeholder="Stock">
            <input class="productFormInput m-2" v-model="form.price" type="number" placeholder="Price">
            <b-form-select
                v-model="form.category"
                :options="categories"
                required
                class="m-2"
            ></b-form-select>
            <b-form-file
                class="m-2"
                v-model="form.img_url"
                :state="Boolean(form.img_url)"
                @change="onFileChange"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                ></b-form-file>
                <b-button v-if="modal=='Add Product'" @click="addProduct" class="mt-3" variant="primary">Add Product</b-button>
                <b-button v-if="modal=='Edit Product'" @click="editProduct" class="mt-3" variant="primary">Edit Product</b-button>
        </form>
    </b-modal>
  </div>
</template>

<script>
import AdminProductCard from '../components/AdminProductCard'
export default {
  name: 'AdminProductMenu',
  components: {
    AdminProductCard
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        stock: '',
        price: '',
        img_url: null,
        category: null,
        id: ''
      },
      productForm: false,
      modal: '',
      categories: [
        { value: null, text: 'Please select a category' },
        { value: 'Smartphones', text: 'Smartphones' },
        { value: 'Headphones', text: 'Headphones' },
        { value: 'Smartwatches', text: 'Smartwatches' },
        { value: 'Drones', text: 'Drones' },
        { value: 'Laptops', text: 'Laptops' }
      ]
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('fetchUserData', true)
    })
  },
  methods: {
    onFileChange () {
      this.form.img_url = event.target.files[0]
    },
    addProduct () {
      this.$store.dispatch('addProduct', {
        name: this.form.name,
        description: this.form.description,
        stock: this.form.stock,
        price: this.form.price,
        img_url: this.form.img_url,
        category: this.form.category
      })
      this.$bvModal.hide('product-form')
    },
    editProduct () {
      this.$store.dispatch('editProduct', {
        name: this.form.name,
        description: this.form.description,
        stock: this.form.stock,
        price: this.form.price,
        img_url: this.form.img_url,
        category: this.form.category,
        id: this.form.id
      })
      this.$bvModal.hide('product-form')
    },
    openEdit (data) {
      let priceNum = data.price.split('')
      for (let i = 0; i < priceNum.length; i++) {
        if (priceNum[i] === 'R' || priceNum[i] === 'p' || priceNum[i] === '.' || priceNum[i] === ',' || priceNum[i] === '-') {
          priceNum[i] = ''
        }
      }
      priceNum = Number(priceNum.join(''))
      this.modal = 'Edit Product'
      this.form.name = data.name
      this.form.description = data.desc
      this.form.stock = data.stock
      this.form.price = priceNum
      this.form.category = data.category
      this.productForm = !this.productForm
      this.form.id = data.id
    },
    openAdd () {
      this.modal = 'Add Product'
      this.form.name = ''
      this.form.description = ''
      this.form.stock = ''
      this.form.price = ''
      this.form.category = ''
      this.productForm = !this.productForm
    }
  },
  created () {
    this.$store.dispatch('fetchMainProducts')
  }
}
</script>

<style scoped>
.productFormInput {
    width: 45%;
    border: none;
    border: 1px solid #c1c1c1;
    border-radius: 7px;
    padding: 8px 6px;
}
#SearchAndFilter {
    border-bottom: 1px black solid;
    padding-bottom: 2%;
}
#addButton {
    width: 75%;
    height: 5vh;
}
#searchProdAdmin {
    border: none;
    border-radius: 15px;
    width: 75%;
    height: 5vh;
}
.adminProductOptions {
    width: 24%;
    height: 100%;
    overflow: scroll;
    border-radius: 15px 0 0 15px;
    background: rgb(255, 206, 115);
}
.AdminProductContent {
    width: 75%;
    height: 100%;
    overflow: scroll;
}
.ProductList {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
}
.productView {
    width: 100vw;
    height: 60vh;
}
.productTableLoader {
    height: 100%;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
</style>
