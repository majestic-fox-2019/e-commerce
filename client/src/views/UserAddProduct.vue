<template>
  <div class="content-container">
      <form class="addProductForm">
          <div class="formGroup">
              <input type="text" id="productName" v-model="form.name" required class="nameInput mx-1" placeholder="Product Name">
                <select id="categoryInput" name="category" class="mx-1">
                    <option v-for="(category, i) in categories" :key="i" :value="category.value">{{category.text}}</option>
                </select>
          </div>
          <div class="formGroup2">
              <div class="left1 mx-1">
                  <textarea id="productDesc" placeholder="Product Description" rows="4" cols="50">
                  </textarea>
              </div>
              <div class="right1 mx-1">
                  <input type="number" class="rightInput1 my-2" placeholder="Stock">
                  <input type="number" class="rightInput1 my-2" placeholder="Price">
              </div>
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
        category: ''
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
  }
}
</script>

<style scoped>
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
    background-color: red;
    width: 100%;
}
.formGroup2 {
    display: flex;
    justify-content: space-around;
    height: 20%;
    padding: 1%;
    background-color: red;
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
