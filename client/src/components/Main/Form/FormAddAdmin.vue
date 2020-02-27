<template>
  <!-- Modal -->
<div class="modal fade" id="addUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><i class="fa fa-plus" aria-hidden="true"></i> Form Add Admin</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="addAdmin">
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
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input type="password" v-model="form.password" :class="`form-control ${error.errorClass.password}`" placeholder="Put the password">
            <span class="invalid-feedback">{{ error.errorMessage.password }}</span>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name : 'FormAddAdmin',
  data(){
    return {
      form : {
        name : '',
        email : '',
        password : ''
      },
      error : {
      status : false,
      errorMessage : {
        name : '',
        email : '',
        password : ''
      },
      errorClass : {
        name : '',
        email : '',
        password : ''
      }
      }
    }
  },
  props : ['toaster'],
  methods : {
    addAdmin(){
      const value = {
        name : this.form.name,
        email : this.form.email,
        password : this.form.password
      }

      this.$axios({
        headers : {
          token : localStorage.token,
        },
        method: 'POST',
        url : '/users/admin',
        data : value
      })
      .then(response => {
        console.log(response)
        this.clearValidation(this.error.errorClass)
        this.clearField(this.form)
        this.$store.dispatch('getAdmin')
        this.$toast.fire({
          icon: 'success',
          title: `Success added new admin`
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