<template>
  <div>
    <h1>create product:</h1>
      <b-alert variant="success" v-if="successMsg" show>{{successMsg}}</b-alert>
      <b-alert variant="danger" v-if="errorsMsg" show>{{errorsMsg}}</b-alert>
    <b-form @submit.prevent="createProduct" @reset.prevent="reset" class="mt-10">
      <b-form-group id="input-group-1" label="Product Name: " label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Picture:" label-for="input-2">
        <b-form-file
          id="input-2"
          required=""
          accept=".jpg, .jpeg, .png"
          v-model="form.file"
          :state="Boolean(form.file)"
          placeholder="Choose the picture"
          drop-placeholder="Drop a file here"
        ></b-form-file>
        <div>Selected item: {{ form.file ? form.file.name: '' }}</div>
      </b-form-group>
      <b-form-group id="input-group-3" label="Price:" label-for="input-3" >
        <b-form-input
          id="input-3"
          required
          type="number"
          v-model="form.price"
          placeholder="Enter Price"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Stock:" label-for="input-4">
        <b-form-input
          id="input-4"
          required
          type="number"
          v-model="form.stock"
          placeholder="Enter Stock"
        ></b-form-input>
      </b-form-group>
      <b-button class="mr-3" type="submit" variant="primary">Create</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { config } from "../config"
export default {
    data(){
      return {
        form: {
          name: null,
          file: null,
          price: null,
          stock: null,
          category: null
        },
        errorsMsg: null,
        successMsg: null,
        loading: true
      }
    },
    methods: {
      createProduct(){
        this.$store.dispatch('loading')
        const fd = new FormData()
        fd.append('name', this.form.name)
        fd.append('image_url', this.form.file)
        fd.append('price', this.form.price)
        fd.append('stock', this.form.stock)

        config({
          method: 'post',
          url: '/products/',
          headers: {
            'Content-Type':'multipart/form-data',
            Authorization: "bearer " + localStorage.getItem("token")
          },
          data: fd
        })
        .then( ({ data }) => {
          this.$store.dispatch('loading')
          this.errorsMsg = null
          this.form.name= null
          this.form.file= null
          this.form.price= null
          this.form.stock= null
          this.successMsg = "create product success"
        })
        .catch(err => {
          this.$store.dispatch('loading')
          this.errorsMsg = err.response.data.message
          this.errorsMsg = null
          this.form.name= null
          this.form.file= null
          this.form.price= null
          this.form.stock= null
        })
      },
      reset(){
          this.form.name= null
          this.form.file= null
          this.form.price= null
          this.form.stock= null
      }
    },
    created(){

    }
}
</script>

<style scoped>

</style>