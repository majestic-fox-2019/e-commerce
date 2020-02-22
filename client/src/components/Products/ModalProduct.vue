<template>
  <b-modal 
    v-model="show" 
    size="lg" 
    :title="name"
    no-close-on-backdrop 
    no-close-on-esc 
    hide-header-close>
    <b-form>
      <b-form-group label="Product Name" label-for="name">
        <b-form-input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Product name"
        ></b-form-input>
      </b-form-group>
      <b-form-group>
        <b-row class="my-1">
          <b-col sm="5">
            <label for="categories">Categories</label>
            <b-form-select 
              id="categories"
              v-model="form.CategoryId">
              <b-form-select-option :value="null" disabled hidden>Please select category</b-form-select-option>
              <b-form-select-option v-for="(cat, idx) in categories" :key="idx" :value="cat.id">{{ cat.name }}</b-form-select-option>
            </b-form-select>
          </b-col>
          <b-col sm="4">
            <label for="price">Price</label>
            <b-form-input
              id="price"
              type="text"
              placeholder="1.000.000"
              v-model="form.price"
              @keypress="onlyNumber"
            ></b-form-input>
          </b-col>
          <b-col sm="3">
            <label for="stock">Stock</label>
            <b-form-input
              id="stock"
              type="text"
              placeholder="10"
              v-model="form.stock"
              @keypress="onlyNumber"
            ></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form>
    <template v-slot:modal-footer>
      <div class="w-100">
        <b-button variant="secondary" size="sm" class="mr-1" @click="setCloseModal(false)">Close</b-button>
        <b-button v-if="status === 'add'" variant="primary" size="sm" @click="goAddProduct">Add Product</b-button>
        <b-button v-if="status === 'edit'" variant="primary" size="sm" @click="goEditProduct">Edit Product</b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {
  props: ['name', 'categories', 'show', 'form', 'status'],
  methods: {
    goAddProduct(){
      this.$parent.addProduct()
    },
    goEditProduct(){
      this.$parent.editProduct()
    },
    setCloseModal(stat){
      this.$emit('setModal', stat)
    },
    onFileSelected(event){
      this.$emit('setFileSelected', event)
    },
    onlyNumber($event) {
      let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
      if ((keyCode < 48 || keyCode > 57)) {
        $event.preventDefault();
      }
    }
  },
}
</script>

<style scoped>

</style>