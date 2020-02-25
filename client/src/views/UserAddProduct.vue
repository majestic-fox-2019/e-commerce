<template>
  <div class="content-container">
      <form @submit.prevent="addProduct" class="addProductForm">
          <div class="formGroup">
              <input type="text" id="productName" v-model="form.name" required class="nameInput mx-1 inputBox" placeholder="Product Name">
                <select id="categoryInput" name="category" class="mx-1 inputBox" v-model="form.category">
                    <option v-for="(category, i) in categories" :key="i" :value="category.value">{{category.text}}</option>
                </select>
          </div>
          <div class="formGroup2">
              <div class="left1 mx-1">
                  <textarea id="productDesc" class="inputBox" placeholder="Product Description" rows="4" cols="50" v-model="form.desc">
                  </textarea>
              </div>
              <div class="right1 mx-1">
                  <input type="number" class="rightInput1 my-2 inputBox" placeholder="Stock" v-model="form.stock">
                  <input type="number" class="rightInput1 my-2 inputBox" placeholder="Price" v-model="form.price">
              </div>
          </div>
          <div class="formGroup3">
            <b-form-file
              v-model="form.img_url"
              :state="Boolean(form.img_url)"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
              class="my-2 imgInput"
              @change="onFileChange"
            ></b-form-file>
          </div>
          <div>
            <b-button type="submit" class="mt-3">Add Product</b-button>
          </div>
      </form>
  </div>
</template>

<script>
export default {
  name: 'UserAddProduct',
  data () {
    return {
      form: {
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
    onFileChange () {
      this.form.img_url = event.target.files[0]
    },
    addProduct () {
      this.$store.dispatch('addProduct', {
        name: this.form.name,
        img_url: this.form.img_url,
        description: this.form.desc,
        price: this.form.price,
        stock: this.form.stock,
        category: this.form.category,
        user: true
      })
      this.form.name = ''
      this.form.img_url = ''
      this.form.desc = ''
      this.form.price = ''
      this.form.stock = ''
      this.form.category = ''
    }
  }
}
</script>

<style scoped>
.inputBox {
  background-color: #cfcfcf;
}
.imgInput {
  border: none!important;
}
.rightInput1 {
    border: none;
    border-radius: 7px;
    padding: 1%;
    width: 100%;
    height: 50%;
}
#productDesc {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    border: none;
    padding: 1%;
}
#categoryInput {
  width: 50%;
  border-radius: 7px;
  border: none;
  padding:1%;
}
.nameInput {
  width: 80%;
  border-radius: 7px;
  border: none;
  padding:1%;
}
.formGroup {
    display: flex;
    justify-content: space-around;
    height: 10%;
    padding: 1%;
    width: 100%;
}
.formGroup2 {
    display: flex;
    justify-content: space-around;
    height: 20%;
    padding: 1%;
    width: 100%;
}
.left1 {
    width: 60%;
}
.right1 {
   width: 40%;
   display: flex;
   flex-direction: column;
   justify-content: space-evenly;
}
.addProductForm {
    height: 100%;
    width: 100%;
}
.content-container {
    padding: 1%;
    background-color: #ffffff;
    height: 100%;
    width: 100%;
    border-radius: 15px;
    overflow: scroll;
}
</style>
