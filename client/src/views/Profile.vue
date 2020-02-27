<template>
<div>
  <navbar-user/>
  <div  class="container d-flex row justify-content-center mx-auto">
    <img src="../assets/user.gif" alt="" style="margin-top:50px;">
    <div class="card w-75 text-white bg-success mb-3">
        <div class="card-body">
          <h5 class="card-title">{{name}}</h5>
          <p class="card-text">Address: {{address}}</p>
          <p class="card-text">email: {{email}}</p>
          <p class="card-text">phone_number: {{phone_number}}</p><hr>
          <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modalEdit">Edit Profile</button>
        </div>
    </div>
  </div>

<!-- Modal -->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="modalEditLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalEditLabel">Edit Profile</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editProfile()">
            <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" class="form-control"  v-model="name">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Email</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="email">
              </div>
            </div>
            <div class="form-group row">
              <label  class="col-sm-2 col-form-label">Address</label>
              <div class="col-sm-10">
                <input type="text" class="form-control"  v-model="address">
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Phone number</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" v-model="phone_number">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import NavbarUser from '../components/NavbarUser.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
export default {
  name:'Profile',
  components: {
    NavbarUser
  },
  data(){
    return{
      name: localStorage.getItem("name"),
      address: localStorage.getItem("address"),
      phone_number: localStorage.getItem("phone_number"),
      email: localStorage.getItem("email")
    }
  },
  methods: {
    editProfile(){
      axios({
        method:"PATCH",
        url:'http://localhost:3000/user',
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          name: this.name,
          address: this.address,
          phone_number: this.phone_number,
          email: this.email
        }
      })
      .then(res => {
        console.log(res, "berhasil edit")
        window.$('#modalEdit').modal('hide')
         Swal.fire({
            icon: 'success',
            title: 'Profile updated!',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem("name", res.data[1].name) 
          localStorage.setItem("address", res.data[1].address)
          localStorage.setItem("phone_number", res.data[1].phone_number)
          localStorage.setItem("email", res.data[1].email)
      })
      .catch(err => {
        console.log(err.response)
        let errMsg = `<div style="color:red;">`
          err.response.data.forEach(el => {
            errMsg += `${el}<br>`
          })
          errMsg += '</div>'
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          html: errMsg
        })
      })
    }
  }
}
</script>

<style>

</style>