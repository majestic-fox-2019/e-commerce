<template>
  <div class="container-fluid">
    <div>
      <Toaster :toaster="toaster" />
    </div>
    <Title msg="Form Update Admin"/>
    <div class="col-md-8">
      <div class="modal-body">
        <form @submit.prevent="updateUser">
          <div class="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input type="text" v-model="form.name" :class="`form-control ${error.errorClass.name}`" placeholder="Put the name">
            <span class="invalid-feedback">{{ error.errorMessage.name }}</span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Email</label>
            <input type="text" v-model="form.email" :class="`form-control ${error.errorClass.email}`" placeholder="Put the email">
            <span class="invalid-feedback">{{ error.errorMessage.email }}</span>
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
import Toaster from '../../Toaster'


export default {
  name : 'FormUpdateUser',
  components : {
    Title,
    Toaster
  },
  data(){
    return {
      data : null,
      toaster : null,
      form : {
        name : '',
        email : '',
      },
      name : '',
      error : {
      status : false,
      errorMessage : {
        name : '',
        email : '',
      },
      errorClass : {
        name : '',
        email : '',
      }
      }
    }
  },
  created () {
    this.getUser()
  },
  mounted(){
  },
  computed : {
  },
  methods : {
    getUser(){
      this.$axios({
        headers : {
          token : localStorage.token
        },
        method : 'get',
        url : `/users/detail/${this.$route.params.user_id}`,
      })
      .then(response => {
        this.form.name = response.data.name
        this.form.email = response.data.email
      })
      .catch(err => {
        console.log(err)
      })
    },
    updateUser(){
      const value = {
        name : this.form.name,
        email: this.form.email
      }

      this.$axios({
        headers : {
          token : localStorage.token
        },
        method : 'put',
        url : `/users/admin/${this.$route.params.user_id}`,
        data : value
      })
      .then(response => {
        console.log(response)
        this.clearValidation(this.error.errorClass)
        this.toaster = 'Success update user ' + response.data.name
        this.$toast.fire({
          icon: 'success',
          title: this.toaster
        })

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
  }
}
</script>

<style>

</style>