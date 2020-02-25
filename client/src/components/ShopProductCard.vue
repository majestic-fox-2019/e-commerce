<template>
  <div class="productCard pt-2">
    <div class="ProdBasic">
      <div class="prodImg">
        <img class="ProdPic" :src="product.img_url" alt="">
      </div>
      <div class="prodBInfo ml-3">
        <p class="prodBInfo-text" style="font-weight: bold;">{{product.name}}</p>
        <p class="prodBInfo-text mt-1" style="font-size: 0.9em;">{{product.category}}</p>
        <p class="prodBInfo-text mt-3">{{product.price}}</p>
      </div>
    </div>
    <div class="ProdDesc">
      {{product.desc}}
    </div>
    <div class="ProdStock">
      {{product.stock}}
    </div>
    <div class="ProdAction">
      <b-button variant="warning" @click="toggleEdit(product)" v-b-modal.editProduct><i class="far fa-edit"></i></b-button>
      <b-button @click="deleteShopProduct(product.id)" variant="danger"><i class="far fa-trash-alt"></i></b-button>
    </div>
    <div>
      <b-modal id="editProduct" hide-header hide-footer centered>
        <h2>Edit Product</h2>
        <form @submit.prevent="editProduct">
          <div class="editFormGroup1">
            <input type="text" v-model="form.name" class="firstInput">
            <select id="categoryInput" name="category" class="mx-1 firstInput" v-model="form.category">
                <option v-for="(category, i) in categories" :key="i" :value="category.value">{{category.text}}</option>
            </select>
          </div>
          <div class="editFormGroup2 my-3">
            <textarea id="productDesc" class="inputBox" placeholder="Product Description" rows="4" cols="50" v-model="form.desc">
            </textarea>
            <div class="input2-2 ml-3">
              <input type="number" class="my-2" v-model="form.stock">
              <input type="number" class="my-2" v-model="form.price">
            </div>
          </div>
          <div class="editFormGroup3">
            <b-form-file
              v-model="form.img_url"
              :state="Boolean(form.img_url)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              class="my-2 imgInput"
              @change="onFileChange"
            ></b-form-file>
          </div>
          <b-button class="my-3" type="submit">Edit Product</b-button>
        </form>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
  name: 'ShopProductCard',
  props: {
    product: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        id: '',
        name: '',
        category: '',
        desc: '',
        stock: '',
        price: '',
        img_url: ''
      },
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
  methods: {
    editProduct () {
      this.$store.dispatch('editProduct', {
        name: this.form.name,
        description: this.form.desc,
        stock: this.form.stock,
        price: this.form.price,
        img_url: this.form.img_url,
        category: this.form.category,
        id: this.form.id,
        user: true
      })
      this.$bvModal.hide('editProduct')
    },
    toggleEdit (product) {
      let priceNum = product.price.split('')
      for (let i = 0; i < priceNum.length; i++) {
        if (priceNum[i] === 'R' || priceNum[i] === 'p' || priceNum[i] === '.' || priceNum[i] === ',' || priceNum[i] === '-') {
          priceNum[i] = ''
        }
      }
      priceNum = Number(priceNum.join(''))
      this.form.id = product.id
      this.form.name = product.name
      this.form.desc = product.desc
      this.form.stock = product.stock
      this.form.price = priceNum
      this.form.category = product.category
      this.form.img_url = product.img_url
    },
    onFileChange () {
      this.form.img_url = event.target.files[0]
    },
    deleteShopProduct (id) {
      Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes I'm sure"
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProduct', {
            id: id,
            user: true
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.editFormGroup2 {
  display: flex;
}
.firstInput {
  width: 50%;
}
.editFormGroup1 {
  display: flex;
}
.ProdAction {
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.ProdStock {
  width: 18%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 2em;
  justify-content: center;
}
.ProdDesc {
  width: 37%;
  height: 100%;
  text-align: left;
  font-size: 1em;
}
.prodBInfo-text {
  font-size: 1em;
  padding: 0;
  margin: 0;
  text-align: left;
}
.prodBInfo {
  display: flex;
  flex-direction: column;
}
.productCard {
    width: 100%;
    height: 20%;
    display: flex;
    border-bottom: 1px solid rgb(138, 138, 138);
}
.prodImg {
  width: 30%;
  height: 100%;
}
.ProdPic {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.ProdBasic {
  width: 35%;
  height: 100%;
  display: flex;
}
</style>
