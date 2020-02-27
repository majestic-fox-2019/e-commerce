<template>
  <div class="container-fluid">
    <Title msg="Form Add Product"/>
    <div class="col-md-4">
      <div class="modal-body">
        <form @submit.prevent="addCategory">
          <div class="form-group">
            <label for="exampleInputEmail1">Category Name</label>
            <input type="text" v-model="form.category_name" :class="`form-control ${error.errorClass.category_name}`" placeholder="Put the category name">
            <span class="invalid-feedback">{{ error.errorMessage.category_name }}</span>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>&nbsp;
          <button @click="$router.go(-1)" type="button" class="btn btn-danger">Cancel</button>
        </form>
      </div>
    </div>
  </div> 
</template>

<script>
import Title from '../../Title'

export default {
  name : 'FormAddCategory',
  components: {
    Title
  },
  data(){
    return {
      form : {
        category_name : '',
      },
      error : {
      status : false,
      errorMessage : {
        category_name : '',
      },
      errorClass : {
        category_name : '',
      }
      }
    }
  },
  methods : {
    addCategory(){
      const value = { category_name : this.form.category_name }

      this.$axios({
        headers : {
          token: localStorage.token
        },
        method: 'post',
        url: '/categories/admin',
        data: value
      })
      .then(response => {
        this.$toast.fire({
          icon: 'success',
          title: 'Successfully add category ' + response.data.category_name
        })
        this.$router.push({ name: 'ContentCategory' })
      })
      .catch(err => {
        this.error.status = true
        this.error.errorMessage = err.response.data
        this.showError(this.form, this.error)
      })
    },
    showError : function(errorObject, state){
      for(let key in errorObject){
        if(errorObject[key] === ''){
          state.errorClass[key] = 'is-invalid'
        }
      }
    },
    clearValidation : function(objectValidation){
      for(let key in objectValidation){
        objectValidation[key] = ''
      }
    },
    clearField: function(field){
      for(let key in field){
        field[key] = ''
      }
    }
  }
}
</script>

<style>

</style>